import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/pro-regular-svg-icons";
import {
  Document,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
} from "docx";
import { api } from "~/trpc/react";

interface ExportProperties {
  className?: string;
}

export default function Export({ className }: ExportProperties) {
  const importedPlayfield = api.bingo.getPlayfield.useQuery();
  const playfield = importedPlayfield.data;
  const playfieldLength = playfield?.length ?? 0;
  const numberOfColumns = Math.sqrt(playfieldLength);
  const playfieldId = playfield?.[0]?.playfield.id;

  async function exportToWord() {
    if (!playfield) {
      return;
    }

    const title = new Paragraph({
      alignment: "center",
      children: [
        new ImageRun({
          data: await fetch("/fulllogo.png").then((res) => res.arrayBuffer()),
          transformation: { width: 100, height: 100 },
          type: "png",
        }),
      ],
    });

    function createCell(text: string) {
      return new TableCell({
        children: [
          new Paragraph({
            children: [new TextRun(text)],
          }),
        ],
      });
    }

    function createRow(cells: TableCell[]) {
      return new TableRow({ children: cells });
    }

    const table = new Table({
      rows: Array.from({ length: numberOfColumns }, (_, i) =>
        createRow(
          Array.from({ length: numberOfColumns }, (_, j) =>
            createCell(
              playfield[i * numberOfColumns + j]?.playfieldentry?.text ?? "",
            ),
          ),
        ),
      ),
    });

    const description = new Paragraph({
      children: [new TextRun(`Bullshit Bingo Playfield: ${playfieldId}`)],
    });

    const doc = new Document({
      sections: [
        {
          children: [title, description, table],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `BullshitBingo Playfield: ${playfieldId}.docx`;
    link.click();
  }
  return (
    <FontAwesomeIcon
      icon={faArrowUpFromBracket}
      className={`text-2xl hover:cursor-pointer ${className}`}
      onClick={() => exportToWord()}
    />
  );
}

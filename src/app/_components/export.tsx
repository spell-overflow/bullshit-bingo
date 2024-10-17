import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/pro-regular-svg-icons";
import {
  Document,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  WidthType,
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

    const headerLogos = new Paragraph({
      alignment: "center",
      spacing: {
        after: 500,
      },
      children: [
        new ImageRun({
          data: await fetch("/bothlogos.png").then((res) => res.arrayBuffer()),
          transformation: { width: 320, height: 100 },
          type: "png",
        }),
      ],
    });

    const description = new Paragraph({
      spacing: {
        after: 200,
      },
      children: [
        new TextRun({
          text: `Bullshit Bingo Playfield: `,
          font: "Calibri",
          bold: true,
        }),
        new TextRun({
          text: `${playfieldId}`,
          font: "Calibri",
        }),
      ],
    });

    function createCell(text: string) {
      return new TableCell({
        children: [
          new Paragraph({
            alignment: "center",
            children: [
              new TextRun({
                text,
                font: "Calibri",
              }),
            ],
          }),
        ],
        verticalAlign: "center",
        width: {
          size: 150,
          type: WidthType.AUTO,
        },
      });
    }

    function createRow(cells: TableCell[]) {
      return new TableRow({
        children: cells,
        height: { value: 1700, rule: "exact" },
      });
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
      width: {
        size: 9000,
        type: WidthType.DXA,
      },
      layout: TableLayoutType.FIXED,
    });

    const doc = new Document({
      sections: [
        {
          children: [
            headerLogos,
            description,
            new Paragraph({ text: "" }),
            table,
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${new Date().toLocaleTimeString()}-BullshitBingo Playfield: ${playfieldId}.docx`;
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

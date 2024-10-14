import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/pro-regular-svg-icons";
import {
  Document,
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

  async function exportToWord() {
    if (!playfield) {
      return;
    }

    const table = new Table({
      rows: Array.from(
        { length: numberOfColumns },
        (_, i) =>
          new TableRow({
            children: Array.from(
              { length: numberOfColumns },
              (_, j) =>
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun(
                          String(
                            playfield[i * numberOfColumns + j]?.playfieldentry
                              ?.text ?? "",
                          ),
                        ),
                      ],
                    }),
                  ],
                }),
            ),
          }),
      ),
    });

    const doc = new Document({
      sections: [
        {
          children: [table],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "my.docx";
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

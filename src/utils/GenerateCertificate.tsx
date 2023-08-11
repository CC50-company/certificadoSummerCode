import download from "downloadjs";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb } from "pdf-lib";
import robotoPath from "../assets/Roboto-Regular.ttf";
import certificatePath from "../assets/certificate_template.pdf";

const NAME_FONT_SIZE = 36;
const CPF_FONT_SIZE = 18;
const DATE_FONT_SIZE = 15;
const TEXT_MAX_WIDTH = 700;
const TEXT_COLOR = rgb(0, 0.647, 0.169);

export const generateCertificate = async (person: Person) => {
  const certificateTemplate = await fetch(certificatePath).then((res) =>
    res.arrayBuffer()
  );
  const roboto = await fetch(robotoPath).then((res) => res.arrayBuffer());

  const { cpf, name } = person;

  const dataEmissao = person?.dataEmissao?.toLocaleDateString("pt-BR", {
    day: "2-digit",
    year: "numeric",
    month: "long",
  });

  const pdf = await PDFDocument.load(certificateTemplate);

  pdf.registerFontkit(fontkit);
  const font = await pdf.embedFont(roboto);

  const pdfPage = pdf.getPages()?.[0];
  const { width: pdfWidth } = pdfPage.getSize();

  let studentFontSize = NAME_FONT_SIZE + 1;
  let studentBoxWidth: number;
  do {
    studentFontSize -= 1;
    studentBoxWidth = font.widthOfTextAtSize(name, studentFontSize);
  } while (studentBoxWidth > TEXT_MAX_WIDTH);

  const studentBoxHeight = font.heightAtSize(studentFontSize);
  pdfPage.drawText(name, {
    y: 339 - studentBoxHeight / 2,
    size: studentFontSize,
    font,
    x: pdfWidth / 2 - studentBoxWidth / 2,
    color: TEXT_COLOR,
  });
  const cpfText = cpf ? `CPF: ${cpf}` : '';
  const titleLineHeight = font.heightAtSize(CPF_FONT_SIZE);
  const titleLineWidth = font.widthOfTextAtSize(cpf, CPF_FONT_SIZE);

  pdfPage.drawText(cpfText, {
    y: 303 - titleLineHeight / 2,
    size: CPF_FONT_SIZE,
    font,
    x: pdfWidth / 2 - titleLineWidth / 2 - 9,
    color: TEXT_COLOR,
  });

  const dateLineHeight = font.heightAtSize(CPF_FONT_SIZE);
  const dateLineWidth = font.widthOfTextAtSize(dataEmissao, DATE_FONT_SIZE);

  pdfPage.drawText(dataEmissao, {
    y: -110.5 - dateLineHeight / 2,
    size: DATE_FONT_SIZE,
    font,
    x: pdfWidth - dateLineWidth - 350,
  });

  const pdfTitle = ["Certificado", name].join(" - ");
  pdf.setTitle(pdfTitle);
  pdf.setLanguage("pt-br");
  pdf.setAuthor("Fundação Estudar");
  pdf.setCreator("Summer Code 2023.2");
  pdf.setProducer("FE");
  pdf.setKeywords(["Ciência", "Tecnologia", "Certificado", "Prêmio"]);
  pdf.setSubject("Certificado");

  const pdfBytes = await pdf.save();
  download(pdfBytes, `${pdfTitle}.pdf`, "application/pdf");
};

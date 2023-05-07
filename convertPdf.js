import pdf2image from "pdf-img-convert";
import fs from "fs";

export async function converPdf(filePath, dirPath) {
  console.log("procesando : ", dirPath);
  if (!fs.existsSync(dirPath)) {
    await fs.mkdirSync(dirPath);
  }
  try {
    const pdfArray = await pdf2image.convert(filePath);
    for (let i = 0; i < pdfArray.length; i++) {
      await fs.writeFileSync(`${dirPath}/${i}.jpg`, pdfArray[i]);
    }
    console.log("finalizado : ", dirPath);
  } catch (error) {
    console.log(error);
  }
}

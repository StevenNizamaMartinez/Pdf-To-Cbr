import fs from "fs";
import { join } from "path";
import pdf2image from "pdf-img-convert";
import { generateRar } from "./rar.js";
import { convertToCbz } from "./convert.js";

const pdfPath = "C:/Users/nizam/Escritorio/Manga/";

const files = fs.readdirSync(pdfPath);

files.forEach(async (file) => {
  if (file.endsWith(".pdf") || file.endsWith(".PDF")) {
    const fileName = file.split(".")[0].replace("(", "").replace(")", "");
    const filePath = join(pdfPath, file);
    const dirPath = join(pdfPath, fileName.replace(/\s/g, "_"));
    await converPdf(filePath, dirPath);
    console.log("finish convert to image: ", fileName);
    console.log("Converting to zip: ", fileName);
    await generateRar(pdfPath);
  } else {
    console.error("Not a pdf file");
  }
});

convertToCbz(pdfPath);
console.log("Archivos convertidos exitosamente");

async function converPdf(filePath, dirPath) {
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

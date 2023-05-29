import fs from "fs";
import { join } from "path";
import { generateRar } from "./rar.js";
import { convertToCbz } from "./convertToCbz.js";
import { converPdf } from "./convertPdf.js";
import AdmZip from "adm-zip";

const pdfPath = "C:/Users/nizam/Escritorio/manga/";

async function convertFiles() {
  const files = fs.readdirSync(pdfPath);

  for (const file of files) {
    if (file.endsWith(".pdf") || file.endsWith(".PDF")) {
      const fileName = file.split(".")[0].replace("(", "").replace(")", "");
      const filePath = join(pdfPath, file);
      const dirPath = join(pdfPath, fileName.replace(/\s/g, "_"));
      await converPdf(filePath, dirPath);
      console.log("finish convert to image: ", fileName);
      console.log("Converting to zip: ", fileName);
      const zip = new AdmZip(); // Crear una nueva instancia de AdmZip en cada iteración
      zip.addLocalFolder(dirPath);
      zip.writeZip(`${pdfPath}/${fileName}.zip`);
      // Delete folder
      fs.rmSync(dirPath, { recursive: true });
    } else {
      console.error("Not a pdf file");
    }
  }

  await convertToCbz(pdfPath);
  console.log("Archivos convertidos exitosamente");
}

convertFiles();

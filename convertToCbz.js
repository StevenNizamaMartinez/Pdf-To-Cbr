import fs from "fs";

export async function convertToCbz(pdfPath) {
  console.log("procesando cbz");
  const files = fs.readdirSync(pdfPath);
  files.forEach(async (file) => {
    try {
      if (!file.endsWith(".zip")) return;
      const filePath = pdfPath + file;
      const newFile = pdfPath + file.split(".")[0] + ".cbz";
      const fileExist = fs.existsSync(filePath);
      if (fileExist) {
        return fs.renameSync(filePath, newFile);
      } else {
        console.log(`El archivo ${file} no existe`);
      }
    } catch (error) {
      console.log(`Error al renombrar ${file}: ${error}`);
    }
  });
}

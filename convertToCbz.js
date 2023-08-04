import fs from "fs";

export async function convertToCbz(pdfPath) {
  console.log("procesando cbz");
  const files = fs.readdirSync(pdfPath);
  for (const file of files) {
    try {
      if (!file.endsWith(".zip")) continue;
      const filePath = `${pdfPath}/${file}`;
      const newFile = `${pdfPath}/${file.split(".")[0]}.cbz`;
      const fileExist = fs.existsSync(filePath);
      if (fileExist) {
        await fs.promises.rename(filePath, newFile);
      } else {
        console.log(`El archivo ${file} no existe`);
      }
    } catch (error) {
      console.log(`Error al renombrar ${file}: ${error}`);
    }
  }
}

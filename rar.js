import AdmZip from "adm-zip";
import fs from "fs";

export async function generateRar(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const zip = new AdmZip();
    const value = file.includes(".");
    if (value) continue;
    const folderPath = `${dirPath}/${file}`;
    zip.addLocalFolder(folderPath);
    zip.writeZip(`${dirPath}/${file}.zip`);
  }
}

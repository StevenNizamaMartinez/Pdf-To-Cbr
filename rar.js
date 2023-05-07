import AdmZip from "adm-zip";
import fs from "fs";

const zip = new AdmZip();

export async function generateRar(dirPath) {
  const files = fs.readdirSync(dirPath);
  files.forEach(async (file) => {
    const value = file.includes(".");
    if (value) return;
    const folderPath = `${dirPath}/${file}`;
    zip.addLocalFolder(folderPath);
    zip.writeZip(`${dirPath}/${file}.zip`);
  });
}

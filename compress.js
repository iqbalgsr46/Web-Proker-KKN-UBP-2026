const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images');
const files = fs.readdirSync(dir).filter(f => f.startsWith('lembar_mewarnai_') && f.endsWith('.png'));

async function compress() {
  for (const file of files) {
    const filePath = path.join(dir, file);
    const tempPath = path.join(dir, 'temp_' + file);
    console.log(`Compressing ${file}...`);
    await sharp(filePath)
      .resize({ width: 800, withoutEnlargement: true }) // Resize to max 800px width
      .png({ quality: 70, compressionLevel: 8 })
      .toFile(tempPath);
    fs.unlinkSync(filePath);
    fs.renameSync(tempPath, filePath);
  }
  console.log('Done!');
}

compress();

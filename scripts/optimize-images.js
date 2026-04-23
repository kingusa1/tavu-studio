const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const targets = [
  { file: 'post-4.jpg', maxWidth: 1200, quality: 78 },
  { file: 'about-reach.png', maxWidth: 1600, quality: 80 },
  { file: 'service-mat-stretch.png', maxWidth: 1600, quality: 80 },
  { file: 'background.jpg', maxWidth: 1920, quality: 75 },
  { file: 'service-singing-bowl.png', maxWidth: 1600, quality: 80 },
  { file: 'service-ice-bath.png', maxWidth: 1600, quality: 80 },
  { file: 'tavu-sign.png', maxWidth: 1600, quality: 80 },
  { file: 'service-yoga-mat.png', maxWidth: 1600, quality: 80 },
  { file: 'about-studio.png', maxWidth: 1600, quality: 80 },
  { file: 'service-pilates-stretch.png', maxWidth: 1600, quality: 80 },
  { file: 'service-ice-hands.png', maxWidth: 1600, quality: 80 },
  { file: 'hero-water-float.png', maxWidth: 1600, quality: 80 },
  { file: 'hero-yoga-pose.png', maxWidth: 1600, quality: 80 },
];

async function optimize() {
  for (const t of targets) {
    const srcPath = path.join(PUBLIC_DIR, t.file);
    if (!fs.existsSync(srcPath)) {
      console.log(`SKIP: ${t.file} (not found)`);
      continue;
    }
    const baseName = t.file.replace(/\.(png|jpg|jpeg)$/i, '');
    const webpPath = path.join(PUBLIC_DIR, `${baseName}.webp`);

    const origSize = fs.statSync(srcPath).size;

    await sharp(srcPath)
      .resize({ width: t.maxWidth, withoutEnlargement: true })
      .webp({ quality: t.quality, effort: 5 })
      .toFile(webpPath);

    const newSize = fs.statSync(webpPath).size;
    const reduction = (((origSize - newSize) / origSize) * 100).toFixed(1);
    console.log(
      `${t.file}: ${(origSize / 1024).toFixed(0)}KB -> ${baseName}.webp ${(newSize / 1024).toFixed(0)}KB (${reduction}% smaller)`
    );
  }
}

optimize().catch((err) => {
  console.error(err);
  process.exit(1);
});

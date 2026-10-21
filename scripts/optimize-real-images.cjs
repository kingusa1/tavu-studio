const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC_DIR = 'C:/Users/kingu/Downloads/drive-download-20260423T163814Z-3-001';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Map of source UUIDs -> semantic output names + content hints
const mapping = [
  // HERO CAROUSEL (priority — largest format)
  { src: '9e78d544-fb3a-40ce-99b1-b47a6711ea55.jpg', out: 'hero-entrance-sign.webp', w: 1920, q: 82 },
  { src: 'aaf34545-de71-4da0-9421-7e3cdb3e50ec.jpg', out: 'hero-reformer-studio.webp', w: 1920, q: 82 },
  { src: 'c8e3ed77-b7ab-412b-ae18-3773eaa99b7d.jpg', out: 'hero-ice-baths.webp', w: 1920, q: 82 },

  // REFORMER PILATES
  { src: '3af11993-b6d3-4044-9d42-4131cd0b01e8.jpg', out: 'service-reformer-mirror.webp', w: 1600, q: 80 },
  { src: 'db714039-13ef-43d4-875f-66bbee00eee7.jpg', out: 'service-reformer-logo.webp', w: 1600, q: 80 },

  // BREATHING ROOM (mat, props, mobility)
  { src: 'f2c6a112-8e40-4509-9bb4-b6cfc8fd1025.jpg', out: 'service-breathing-props.webp', w: 1600, q: 80 },
  { src: '8b384ec0-c35b-466c-8eeb-0d7d64cb5a6e.jpg', out: 'service-breathing-shelf.webp', w: 1600, q: 80 },

  // CONTRAST THERAPY (sauna + ice bath)
  { src: 'b5f39018-45e2-4963-8d2a-0cdccd11b773.jpg', out: 'service-sauna.webp', w: 1600, q: 80 },
  { src: 'c8e3ed77-b7ab-412b-ae18-3773eaa99b7d.jpg', out: 'service-ice-baths.webp', w: 1600, q: 80 },

  // COMPRESSION / RECOVERY
  { src: 'a056e408-1491-46d5-9ef3-c2f2aed28bb4.jpg', out: 'service-recovery-equipment.webp', w: 1600, q: 80 },

  // MASSAGE
  { src: 'fbe67404-3999-47c1-8582-3550dfba0e67.jpg', out: 'service-massage-towels.webp', w: 1600, q: 80 },

  // ABOUT / SPACE
  { src: 'e7a4efba-3632-4978-b021-0a262ca4174d.jpg', out: 'about-reception.webp', w: 1600, q: 80 },
  { src: 'cea000ec-7ee5-4450-9b1b-0575c64445df.jpg', out: 'about-lounge.webp', w: 1600, q: 80 },
  { src: '9b9ebad8-99ff-4f2d-81d3-b8a8e14a54e7.jpg', out: 'about-exterior.webp', w: 1600, q: 80 },
  { src: '0655eaac-2c3d-455b-a2d5-bfe6a4d6bb73.jpg', out: 'about-brand.webp', w: 1600, q: 80 },
  { src: '3e4676f7-8fb2-4f0a-9fb6-35eb82539bd9.jpg', out: 'about-entrance.webp', w: 1600, q: 80 },

  // AMENITIES / MOOD
  { src: 'b8d534cc-2de2-48c0-91bf-2f5b6dbbdd15.jpg', out: 'amenity-cafe.webp', w: 1600, q: 80 },
  { src: 'be2f9f6f-44cd-41be-be01-982a2049a689.jpg', out: 'amenity-coffee.webp', w: 1200, q: 78 },
  { src: 'ffbcc02b-950d-43d7-ba39-a01761cd73d9.jpg', out: 'amenity-bathroom.webp', w: 1600, q: 80 },

  // BACKGROUND (full-viewport)
  { src: 'cea000ec-7ee5-4450-9b1b-0575c64445df.jpg', out: 'background.webp', w: 1920, q: 72 },
];

async function run() {
  let totalOrig = 0;
  let totalNew = 0;
  for (const m of mapping) {
    const srcPath = path.join(SRC_DIR, m.src);
    if (!fs.existsSync(srcPath)) {
      console.log(`SKIP missing: ${m.src}`);
      continue;
    }
    const outPath = path.join(PUBLIC_DIR, m.out);
    const origSize = fs.statSync(srcPath).size;
    totalOrig += origSize;

    await sharp(srcPath)
      .rotate() // honor EXIF orientation
      .resize({ width: m.w, withoutEnlargement: true })
      .webp({ quality: m.q, effort: 5 })
      .toFile(outPath);

    const newSize = fs.statSync(outPath).size;
    totalNew += newSize;
    const reduction = (((origSize - newSize) / origSize) * 100).toFixed(1);
    console.log(
      `${m.out.padEnd(35)} ${(origSize / 1024).toFixed(0).padStart(5)}KB -> ${(newSize / 1024).toFixed(0).padStart(4)}KB (${reduction}% smaller)`
    );
  }
  console.log(`\nTotal: ${(totalOrig / 1024 / 1024).toFixed(1)}MB -> ${(totalNew / 1024 / 1024).toFixed(2)}MB`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

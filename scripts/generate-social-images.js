const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

async function run() {
  const tavuSignExists = fs.existsSync(path.join(PUBLIC_DIR, 'tavu-sign.webp'));
  const bgExists = fs.existsSync(path.join(PUBLIC_DIR, 'background.webp'));
  const source = bgExists
    ? path.join(PUBLIC_DIR, 'background.webp')
    : path.join(PUBLIC_DIR, 'tavu-sign.webp');

  if (!fs.existsSync(source)) {
    console.error('No source image available');
    return;
  }

  const ogOverlay = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(10,10,10,0.45)"/>
          <stop offset="100%" stop-color="rgba(10,10,10,0.8)"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#g)"/>
      <text x="600" y="280" font-family="Georgia, serif" font-size="88" font-weight="300" fill="#F8F4EC" text-anchor="middle" letter-spacing="6">TAVÚ</text>
      <text x="600" y="340" font-family="Arial, sans-serif" font-size="22" font-weight="300" fill="#C9A876" text-anchor="middle" letter-spacing="8">WELLNESS &#8226; ABU DHABI</text>
      <text x="600" y="420" font-family="Arial, sans-serif" font-size="26" font-weight="400" fill="#F8F4EC" text-anchor="middle">Reformer Pilates &#183; Contrast Therapy</text>
      <text x="600" y="455" font-family="Arial, sans-serif" font-size="22" font-weight="300" fill="rgba(248,244,236,0.8)" text-anchor="middle">Breathwork &#183; Recovery &#183; Massage</text>
    </svg>
  `);

  // 1200x630 OG image
  await sharp(source)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .composite([{ input: ogOverlay }])
    .webp({ quality: 85 })
    .toFile(path.join(PUBLIC_DIR, 'opengraph-image.webp'));

  // Also save as PNG (metadata references .png)
  await sharp(source)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .composite([{ input: ogOverlay }])
    .png({ quality: 85, compressionLevel: 9 })
    .toFile(path.join(PUBLIC_DIR, 'opengraph-image.png'));

  // Twitter card (same 1200x630)
  await sharp(source)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .composite([{ input: ogOverlay }])
    .png({ quality: 85, compressionLevel: 9 })
    .toFile(path.join(PUBLIC_DIR, 'twitter-image.png'));

  // Slim favicon: 32x32
  const faviconSrc = path.join(PUBLIC_DIR, 'favicon.png');
  if (fs.existsSync(faviconSrc)) {
    await sharp(faviconSrc)
      .resize(32, 32, { fit: 'cover' })
      .png({ compressionLevel: 9 })
      .toFile(path.join(PUBLIC_DIR, 'favicon-32.png'));

    // Replace favicon.png with 32x32 version
    fs.renameSync(
      path.join(PUBLIC_DIR, 'favicon-32.png'),
      path.join(PUBLIC_DIR, 'favicon.png')
    );
  }

  // Log results
  for (const f of ['opengraph-image.png', 'opengraph-image.webp', 'twitter-image.png', 'favicon.png']) {
    const p = path.join(PUBLIC_DIR, f);
    if (fs.existsSync(p)) {
      console.log(`${f}: ${(fs.statSync(p).size / 1024).toFixed(1)}KB`);
    }
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

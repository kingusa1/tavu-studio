const fs = require('fs');
const path = require('path');

function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === 'node_modules' || name === '.next' || name.startsWith('.')) continue;
      out.push(...walk(full));
    } else if (/\.(ts|tsx|js|jsx)$/.test(name)) {
      out.push(full);
    }
  }
  return out;
}

const replacements = [
  { from: /post-4\.jpg/g, to: 'post-4.webp' },
  { from: /about-reach\.png/g, to: 'about-reach.webp' },
  { from: /service-mat-stretch\.png/g, to: 'service-mat-stretch.webp' },
  { from: /background\.jpg/g, to: 'background.webp' },
  { from: /service-singing-bowl\.png/g, to: 'service-singing-bowl.webp' },
  { from: /service-ice-bath\.png/g, to: 'service-ice-bath.webp' },
  { from: /tavu-sign\.png/g, to: 'tavu-sign.webp' },
  { from: /service-yoga-mat\.png/g, to: 'service-yoga-mat.webp' },
  { from: /about-studio\.png/g, to: 'about-studio.webp' },
  { from: /service-pilates-stretch\.png/g, to: 'service-pilates-stretch.webp' },
  { from: /service-ice-hands\.png/g, to: 'service-ice-hands.webp' },
  { from: /hero-water-float\.png/g, to: 'hero-water-float.webp' },
  { from: /hero-yoga-pose\.png/g, to: 'hero-yoga-pose.webp' },
];

function run() {
  const files = walk(path.join(__dirname, '..', 'src'));
  let totalChanges = 0;
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let fileChanges = 0;
    for (const { from, to } of replacements) {
      const before = content;
      content = content.replace(from, to);
      if (content !== before) fileChanges += (before.match(from) || []).length;
    }
    if (fileChanges > 0) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`${path.relative(path.join(__dirname, '..'), file)}: ${fileChanges} replacements`);
      totalChanges += fileChanges;
    }
  }
  console.log(`\nTotal: ${totalChanges} replacements across ${files.length} scanned files`);
}

run();

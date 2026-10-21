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

// Map old placeholder image names -> real TAVU photo names
// Order matters: longer/more specific patterns first so short ones don't eat them
const replacements = [
  // Specific-first: `service-ice-hands` must be replaced before `service-ice-bath` (substring)
  { from: /service-ice-hands\.webp/g, to: 'service-ice-baths.webp' },
  { from: /service-ice-bath\.webp/g, to: 'service-sauna.webp' },
  { from: /service-mat-stretch\.webp/g, to: 'service-reformer-logo.webp' },
  { from: /service-pilates-stretch\.webp/g, to: 'service-reformer-mirror.webp' },
  { from: /service-yoga-mat\.webp/g, to: 'service-breathing-props.webp' },
  { from: /service-singing-bowl\.webp/g, to: 'service-breathing-shelf.webp' },
  { from: /hero-yoga-pose\.webp/g, to: 'hero-reformer-studio.webp' },
  { from: /hero-water-float\.webp/g, to: 'hero-entrance-sign.webp' },
  { from: /post-4\.webp/g, to: 'service-massage-towels.webp' },
  { from: /tavu-sign\.webp/g, to: 'about-exterior.webp' },
  { from: /about-studio\.webp/g, to: 'about-reception.webp' },
  { from: /about-reach\.webp/g, to: 'about-lounge.webp' },
];

const files = walk(path.join(__dirname, '..', 'src'));
let totalChanges = 0;
const touchedFiles = [];
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let fileChanges = 0;
  for (const { from, to } of replacements) {
    const matches = content.match(from);
    if (matches) {
      content = content.replace(from, to);
      fileChanges += matches.length;
    }
  }
  if (fileChanges > 0) {
    fs.writeFileSync(file, content, 'utf8');
    touchedFiles.push({ file: path.relative(path.join(__dirname, '..'), file), count: fileChanges });
    totalChanges += fileChanges;
  }
}

touchedFiles.sort((a, b) => b.count - a.count);
for (const { file, count } of touchedFiles) {
  console.log(`${count.toString().padStart(3)} replacements  ${file}`);
}
console.log(`\nTotal: ${totalChanges} replacements across ${touchedFiles.length} files`);

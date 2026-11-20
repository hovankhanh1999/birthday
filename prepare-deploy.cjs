const fs = require('node:fs');
const path = require('node:path');

const output = process.argv[2];
if (!output) throw new Error('Usage: node prepare-deploy.cjs <output-directory>');

const files = ['index.html', 'script.js', 'styles.css', 'climb-preview.css', 'pocket-preview.css', 'farewell.css'];
const assets = new Set();
const deployedAt = new Date();
const label = new Intl.DateTimeFormat('vi-VN', {
  timeZone: 'Asia/Ho_Chi_Minh',
  dateStyle: 'short',
  timeStyle: 'medium',
}).format(deployedAt);

fs.mkdirSync(path.join(output, 'assets'), { recursive: true });
for (const file of files) {
  let contents = fs.readFileSync(path.join(__dirname, file), 'utf8');
  for (const asset of contents.matchAll(/assets\/[\w.-]+/g)) assets.add(asset[0]);
  if (file === 'index.html') {
    const marker = '<small id="deploy-time" hidden>Deploy <time></time></small>';
    if (!contents.includes(marker)) throw new Error('Missing deploy time marker in index.html');
    contents = contents.replace(marker,
      `<small id="deploy-time">Deploy <time datetime="${deployedAt.toISOString()}">${label} (UTC+7)</time></small>`);
  }
  fs.writeFileSync(path.join(output, file), contents);
}
for (const asset of assets) {
  fs.copyFileSync(path.join(__dirname, asset), path.join(output, asset));
}

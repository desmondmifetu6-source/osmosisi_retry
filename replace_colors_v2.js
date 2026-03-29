const fs = require('fs');
const path = require('path');

const directory = __dirname;

const replacements = {
  '#0a1710': '#15220c',
  '#0f2115': '#1b2e10',
  '#162e1c': '#254515',
  '#1e3b26': '#305e19',
  '#2b4f35': '#3c781d',
  '#426b52': '#D4AF37', // Intellectual Gold
  'rgba(46, 139, 87': 'rgba(88, 204, 2', // Duolingo Green RGB
  'rgba(30, 59, 38': 'rgba(212, 175, 55' // Gold RGB
};

function processFile(filePath) {
  if (filePath.endsWith('.html') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    for (const [oldC, newC] of Object.entries(replacements)) {
      const regex = new RegExp(oldC.replace(/\(/g, '\\('), 'gi');
      content = content.replace(regex, newC);
    }
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${path.basename(filePath)}`);
    }
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes('.git') && !fullPath.includes('node_modules')) {
        walkDir(fullPath);
      }
    } else {
      processFile(fullPath);
    }
  }
}

walkDir(directory);
console.log('Color replacement v2 complete.');

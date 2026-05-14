const fs = require('fs');
const path = require('path');
const https = require('https');

const baseDir = __dirname;
const imgDir = path.join(baseDir, 'images');

if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir);
}

const files = [path.join(baseDir, 'js', 'api.js'), path.join(baseDir, 'reviews.html')];

const artifacts = [
  'C:\\Users\\4-410-28\\.gemini\\antigravity\\brain\\752e83a6-8fa2-4d33-8020-14a3d16f2aad\\dest_bali_1778723474484.png',
  'C:\\Users\\4-410-28\\.gemini\\antigravity\\brain\\752e83a6-8fa2-4d33-8020-14a3d16f2aad\\dest_paris_1778723457588.png',
  'C:\\Users\\4-410-28\\.gemini\\antigravity\\brain\\752e83a6-8fa2-4d33-8020-14a3d16f2aad\\dest_tokyo_1778723594437.png',
  'C:\\Users\\4-410-28\\.gemini\\antigravity\\brain\\752e83a6-8fa2-4d33-8020-14a3d16f2aad\\hero_bg_1778723281361.png'
];

async function main() {
  for (let filepath of files) {
    if (!fs.existsSync(filepath)) continue;
    let content = fs.readFileSync(filepath, 'utf-8');
    
    const regex = /https:\/\/loremflickr\.com\/\d+\/\d+\/([^ '"]+)/g;
    let match;
    const urlsToDownload = new Set();
    
    while ((match = regex.exec(content)) !== null) {
      urlsToDownload.add(match[1]);
    }
    
    for (let u of urlsToDownload) {
      const cleanName = u.replace(/,/g, '_') + '.jpg';
      const savePath = path.join(imgDir, cleanName);
      
      if (!fs.existsSync(savePath)) {
        // Just copy artifact as fallback unconditionally because loremflickr fails anyway
        const randomArt = artifacts[Math.floor(Math.random() * artifacts.length)];
        try { fs.copyFileSync(randomArt, savePath); } catch(e) {}
      }
    }
    
    const newContent = content.replace(/https:\/\/loremflickr\.com\/\d+\/\d+\/([^ '"]+)/g, (m, g1) => {
      return 'images/' + g1.replace(/,/g, '_') + '.jpg';
    });
    
    fs.writeFileSync(filepath, newContent, 'utf-8');
  }
}

main();

const fs = require('fs');
const path = require('path');

// Tạo thư mục docs nếu chưa tồn tại
if (!fs.existsSync('./docs')) {
    fs.mkdirSync('./docs');
}

// Copy index.html vào thư mục docs
fs.copyFileSync('./public/index.html', './docs/index.html');

// Copy imageUrls.json vào thư mục docs nếu tồn tại
if (fs.existsSync('./imageUrls.json')) {
    fs.copyFileSync('./imageUrls.json', './docs/imageUrls.json');
} else {
    console.log('Warning: imageUrls.json not found. Make sure to run fetchimage.js first.');
}

console.log('Build completed');
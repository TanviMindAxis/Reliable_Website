const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, '../review.html');
let content = fs.readFileSync(file, 'utf8');
content = content.replace('js/script.js?v=20261008_11', 'js/script.js?v=20261008_12');
fs.writeFileSync(file, content, 'utf8');
console.log('Bumped review.html script cache buster.');

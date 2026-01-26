const fs = require('fs');
const data = fs.readFileSync('about.html', 'utf8');
console.log(data.substring(0, 500));

const fs = require('fs');

fs.readFile('about.html', 'utf8', (err, data) => {
    if (err) {
        console.log('Error:', err);
        return;
    }
    console.log('--- START about.html ---');
    console.log(data);
    console.log('--- END about.html ---');
});

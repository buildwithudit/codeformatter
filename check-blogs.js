const fs = require('fs');
const { execSync } = require('child_process');

const allBlogs = fs.readdirSync('.').filter(f => f.startsWith('blog-') && f.endsWith('.html') && f !== 'blog-template.html' && f !== 'blog.html').sort();
const oldFiles = execSync('git ls-tree f5c90bc --name-only').toString().split('\n').filter(f => f.startsWith('blog-') && f.endsWith('.html') && f !== 'blog-template.html' && f !== 'blog.html');

const missing = allBlogs.filter(f => !oldFiles.includes(f));
console.log('Files NOT in commit f5c90bc (these are new files with short content):');
missing.forEach(f => {
    const words = fs.readFileSync(f, 'utf8').split(/\s+/).length;
    console.log(f + ' => ' + words + ' words');
});
console.log('\nTotal in f5c90bc: ' + oldFiles.length);
console.log('Total now: ' + allBlogs.length);
console.log('Missing from old: ' + missing.length);

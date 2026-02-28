const fs = require('fs');

// The correct AdSense script - goes RIGHT AFTER <head> tag (top)
const ADSENSE_SCRIPT = `    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2670168844256558"
         crossorigin="anonymous"></script>`;

// Match any variant of the adsbygoogle script tag (single or multi-line, with any spacing)
const ADSENSE_REGEX = /[ \t]*<script[^>]*pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js[^>]*>[\s\S]*?<\/script>\n?/g;

const allHtmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'blog-template.html').sort();

let updated = 0, skipped = 0;

allHtmlFiles.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    const original = html;

    // Step 1: Remove ALL existing adsbygoogle script tags from everywhere in the file
    html = html.replace(ADSENSE_REGEX, '');

    // Step 2: Insert AdSense script RIGHT AFTER the opening <head> tag (top of head)
    // Handle both <head> and <head>\r\n and <head>\n
    html = html.replace(/(<head[^>]*>)(\r?\n)/, `$1$2${ADSENSE_SCRIPT}\n`);

    if (html !== original) {
        fs.writeFileSync(file, html, 'utf8');
        console.log(`✅ AdSense → TOP of <head>: ${file}`);
        updated++;
    } else {
        console.log(`⏭️  Skipped (no change): ${file}`);
        skipped++;
    }
});

console.log(`\n════════════════════════════`);
console.log(`✅ Fixed:   ${updated} files`);
console.log(`⏭️  Skipped: ${skipped} files`);
console.log(`════════════════════════════`);

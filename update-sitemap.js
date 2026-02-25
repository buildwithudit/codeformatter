const fs = require('fs');
const path = require('path');

// Read all blog files
const blogs = fs.readdirSync('.').filter(f => f.startsWith('blog-') && f.endsWith('.html') && f !== 'blog-template.html' && f !== 'blog.html').sort();

// Read existing sitemap
let sitemap = fs.readFileSync('sitemap.xml', 'utf8');

// Generate blog URL entries
let blogXml = '\n    <!-- Blog Posts (Restored with full content) -->\n';
blogs.forEach(f => {
    blogXml += `    <url>
        <loc>https://www.codeformatter.in/${f}</loc>
        <lastmod>2026-02-25</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>\n`;
});

// Insert before closing </urlset> tag
sitemap = sitemap.replace('</urlset>', blogXml + '</urlset>');

// Update lastmod dates to today
sitemap = sitemap.replace(/2026-02-23/g, '2026-02-25');

fs.writeFileSync('sitemap.xml', sitemap);
console.log(`Updated sitemap.xml with ${blogs.length} blog URLs`);
console.log('Total URLs in sitemap: ' + (sitemap.match(/<url>/g) || []).length);

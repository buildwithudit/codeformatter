const fs = require('fs');

// Get all blog files
const blogs = fs.readdirSync('.').filter(f => f.startsWith('blog-') && f.endsWith('.html') && f !== 'blog-template.html' && f !== 'blog.html').sort();

// Start fresh sitemap from the original template (without blog entries)
const today = '2026-02-25';

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Homepage -->
    <url>
        <loc>https://www.codeformatter.in/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>

    <!-- AI Tools -->
    <url><loc>https://www.codeformatter.in/ai-code-explainer.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.codeformatter.in/ai-code-converter.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.codeformatter.in/ai-prompt-enhancer.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>

    <!-- Code Formatters -->
    <url><loc>https://www.codeformatter.in/html-formatter.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.codeformatter.in/css-formatter.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.codeformatter.in/js-formatter.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.codeformatter.in/sql-formatter.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.codeformatter.in/xml-formatter.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.codeformatter.in/json-tree-viewer.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.codeformatter.in/markdown-editor.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>

    <!-- Code Minifiers -->
    <url><loc>https://www.codeformatter.in/json-minifier.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>
    <url><loc>https://www.codeformatter.in/html-minifier.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>
    <url><loc>https://www.codeformatter.in/css-minifier.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>
    <url><loc>https://www.codeformatter.in/js-minifier.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>

    <!-- Image & Color Tools -->
    <url><loc>https://www.codeformatter.in/image-compressor.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.codeformatter.in/color-converter.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.codeformatter.in/qr-code-generator.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>

    <!-- Data Converters -->
    <url><loc>https://www.codeformatter.in/json-to-csv.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>
    <url><loc>https://www.codeformatter.in/csv-to-json.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>
    <url><loc>https://www.codeformatter.in/json-to-typescript.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.codeformatter.in/excel-to-html.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
    <url><loc>https://www.codeformatter.in/case-converter.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>

    <!-- Encoding & Security -->
    <url><loc>https://www.codeformatter.in/base64-tool.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>
    <url><loc>https://www.codeformatter.in/url-encoder.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>
    <url><loc>https://www.codeformatter.in/hash-generator.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>
    <url><loc>https://www.codeformatter.in/jwt-decoder.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>
    <url><loc>https://www.codeformatter.in/regex-tester.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>
    <url><loc>https://www.codeformatter.in/password-generator.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>

    <!-- Generators -->
    <url><loc>https://www.codeformatter.in/uuid-generator.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.codeformatter.in/timestamp-converter.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.codeformatter.in/json-to-yaml.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.codeformatter.in/cron-generator.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>

    <!-- CSS Generators -->
    <url><loc>https://www.codeformatter.in/gradient-generator.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
    <url><loc>https://www.codeformatter.in/glassmorphism-generator.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
    <url><loc>https://www.codeformatter.in/smooth-shadow-generator.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
    <url><loc>https://www.codeformatter.in/px-to-rem.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
    <url><loc>https://www.codeformatter.in/aspect-ratio-calculator.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>

    <!-- Text & Data Tools -->
    <url><loc>https://www.codeformatter.in/lorem-ipsum-generator.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
    <url><loc>https://www.codeformatter.in/mock-data-generator.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
    <url><loc>https://www.codeformatter.in/diff-checker.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>

    <!-- Preview Tools -->
    <url><loc>https://www.codeformatter.in/html-viewer.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.75</priority></url>
    <url><loc>https://www.codeformatter.in/social-card-preview.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.75</priority></url>

    <!-- Blog Main Page -->
    <url>
        <loc>https://www.codeformatter.in/blog.html</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>

    <!-- Blog Posts -->
${blogs.map(f => `    <url><loc>https://www.codeformatter.in/${f}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`).join('\n')}

    <!-- Static Pages -->
    <url><loc>https://www.codeformatter.in/about.html</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>
    <url><loc>https://www.codeformatter.in/contact.html</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>
    <url><loc>https://www.codeformatter.in/privacy.html</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.4</priority></url>
    <url><loc>https://www.codeformatter.in/terms.html</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.4</priority></url>
</urlset>
`;

fs.writeFileSync('sitemap.xml', sitemap);
const urlCount = (sitemap.match(/<url>/g) || []).length;
console.log('Sitemap regenerated with ' + urlCount + ' total URLs (' + blogs.length + ' blog posts)');

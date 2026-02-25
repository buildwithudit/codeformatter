const fs = require('fs');

const blogToolMap = {
    'blog-json-formatter.html': { tool: 'index.html', name: 'JSON Formatter', emoji: '🔧', hook: 'Messy JSON?' },
    'blog-css-formatter.html': { tool: 'css-formatter.html', name: 'CSS Formatter', emoji: '🎨', hook: 'Messy CSS?' },
    'blog-html-formatter.html': { tool: 'html-formatter.html', name: 'HTML Formatter', emoji: '📝', hook: 'Messy HTML?' },
    'blog-js-formatter.html': { tool: 'js-formatter.html', name: 'JavaScript Formatter', emoji: '⚡', hook: 'Messy JavaScript?' },
    'blog-xml-formatter.html': { tool: 'xml-formatter.html', name: 'XML Formatter', emoji: '📄', hook: 'Messy XML?' },
    'blog-sql-formatter.html': { tool: 'sql-formatter.html', name: 'SQL Formatter', emoji: '🗃️', hook: 'Messy SQL?' },
    'blog-json-minifier.html': { tool: 'json-minifier.html', name: 'JSON Minifier', emoji: '📦', hook: 'Bloated JSON?' },
    'blog-css-minifier.html': { tool: 'css-minifier.html', name: 'CSS Minifier', emoji: '🗜️', hook: 'Bloated CSS?' },
    'blog-html-minifier.html': { tool: 'html-minifier.html', name: 'HTML Minifier', emoji: '🗜️', hook: 'Bloated HTML?' },
    'blog-js-minifier.html': { tool: 'js-minifier.html', name: 'JS Minifier', emoji: '🗜️', hook: 'Bloated JavaScript?' },
    'blog-csv-to-json.html': { tool: 'csv-to-json.html', name: 'CSV to JSON Converter', emoji: '🔄', hook: 'CSV to JSON?' },
    'blog-json-to-csv.html': { tool: 'json-to-csv.html', name: 'JSON to CSV Converter', emoji: '🔄', hook: 'JSON to CSV?' },
    'blog-json-to-yaml.html': { tool: 'json-to-yaml.html', name: 'JSON to YAML Converter', emoji: '🔄', hook: 'JSON to YAML?' },
    'blog-json-to-typescript.html': { tool: 'json-to-typescript.html', name: 'JSON to TypeScript', emoji: '🔷', hook: 'Need TypeScript types?' },
    'blog-json-xml.html': { tool: 'xml-formatter.html', name: 'JSON to XML Converter', emoji: '🔄', hook: 'JSON to XML?' },
    'blog-base64-tool.html': { tool: 'base64-tool.html', name: 'Base64 Tool', emoji: '🔐', hook: 'Encode or decode?' },
    'blog-hash-generator.html': { tool: 'hash-generator.html', name: 'Hash Generator', emoji: '🔒', hook: 'Need a hash?' },
    'blog-jwt-decoder.html': { tool: 'jwt-decoder.html', name: 'JWT Decoder', emoji: '🔑', hook: 'Decode JWT tokens?' },
    'blog-regex-tester.html': { tool: 'regex-tester.html', name: 'Regex Tester', emoji: '🎯', hook: 'Test your regex?' },
    'blog-regex-cheat-sheet.html': { tool: 'regex-tester.html', name: 'Regex Tester', emoji: '🎯', hook: 'Test your regex?' },
    'blog-diff-checker.html': { tool: 'diff-checker.html', name: 'Diff Checker', emoji: '🔍', hook: 'Compare files?' },
    'blog-case-converter.html': { tool: 'case-converter.html', name: 'Case Converter', emoji: '🔠', hook: 'Convert text case?' },
    'blog-color-converter.html': { tool: 'color-converter.html', name: 'Color Converter', emoji: '🎨', hook: 'Convert colors?' },
    'blog-password-generator.html': { tool: 'password-generator.html', name: 'Password Generator', emoji: '🔐', hook: 'Need a strong password?' },
    'blog-uuid-generator.html': { tool: 'uuid-generator.html', name: 'UUID Generator', emoji: '🆔', hook: 'Need a UUID?' },
    'blog-lorem-ipsum-generator.html': { tool: 'lorem-ipsum-generator.html', name: 'Lorem Ipsum Generator', emoji: '📝', hook: 'Need placeholder text?' },
    'blog-markdown-editor.html': { tool: 'markdown-editor.html', name: 'Markdown Editor', emoji: '✍️', hook: 'Write Markdown?' },
    'blog-qr-code-generator.html': { tool: 'qr-code-generator.html', name: 'QR Code Generator', emoji: '📱', hook: 'Create a QR code?' },
    'blog-timestamp-converter.html': { tool: 'timestamp-converter.html', name: 'Timestamp Converter', emoji: '⏰', hook: 'Convert timestamps?' },
    'blog-url-encoder.html': { tool: 'url-encoder.html', name: 'URL Encoder', emoji: '🔗', hook: 'Encode URLs?' },
    'blog-px-to-rem.html': { tool: 'px-to-rem.html', name: 'PX to REM Converter', emoji: '📐', hook: 'PX to REM?' },
    'blog-mock-data-generator.html': { tool: 'mock-data-generator.html', name: 'Mock Data Generator', emoji: '🎲', hook: 'Need test data?' },
    'blog-cron-generator.html': { tool: 'cron-generator.html', name: 'Cron Generator', emoji: '⏱️', hook: 'Build cron jobs?' },
    'blog-image-compressor.html': { tool: 'image-compressor.html', name: 'Image Compressor', emoji: '🖼️', hook: 'Compress images?' },
    'blog-excel-to-html.html': { tool: 'excel-to-html.html', name: 'Excel to HTML', emoji: '📊', hook: 'Excel to HTML?' },
    'blog-social-card-preview.html': { tool: 'social-card-preview.html', name: 'Social Card Preview', emoji: '📣', hook: 'Preview social cards?' },
    'blog-glassmorphism-generator.html': { tool: 'glassmorphism-generator.html', name: 'Glassmorphism Generator', emoji: '✨', hook: 'Create glass effects?' },
    'blog-gradient-generator.html': { tool: 'gradient-generator.html', name: 'Gradient Generator', emoji: '🌈', hook: 'Create gradients?' },
    'blog-smooth-shadow-generator.html': { tool: 'smooth-shadow-generator.html', name: 'Shadow Generator', emoji: '🌓', hook: 'Create smooth shadows?' },
    'blog-aspect-ratio-calculator.html': { tool: 'aspect-ratio-calculator.html', name: 'Aspect Ratio Calculator', emoji: '📐', hook: 'Calculate ratios?' },
    'blog-json-tree-viewer.html': { tool: 'json-tree-viewer.html', name: 'JSON Tree Viewer', emoji: '🌳', hook: 'Visualize JSON?' },
    'blog-ai-future.html': { tool: 'ai-code-explainer.html', name: 'AI Code Explainer', emoji: '🤖', hook: 'Try AI coding?' },
    'blog-dark-mode.html': { tool: 'css-formatter.html', name: 'CSS Formatter', emoji: '🌙', hook: 'Format your CSS?' },
    'blog-debugging.html': { tool: 'ai-code-explainer.html', name: 'AI Code Explainer', emoji: '🐛', hook: 'Debug faster with AI?' },
    'blog-freelancing.html': { tool: 'index.html', name: 'Code Formatter', emoji: '💼', hook: 'Format code instantly?' },
    'blog-passive-income.html': { tool: 'index.html', name: 'Code Formatter', emoji: '💰', hook: 'Build dev tools?' },
    'blog-technical-seo.html': { tool: 'index.html', name: 'Code Formatter', emoji: '📈', hook: 'Optimize your SEO?' },
    'blog-vscode-tools.html': { tool: 'index.html', name: 'Code Formatter', emoji: '🛠️', hook: 'Format code online?' },
    'blog-tailwind-review.html': { tool: 'css-formatter.html', name: 'CSS Formatter', emoji: '🎨', hook: 'Format your CSS?' },
    'blog-privacy-tech.html': { tool: 'index.html', name: 'Code Formatter', emoji: '🔒', hook: 'Secure dev tools?' },
    'blog-json-fix.html': { tool: 'index.html', name: 'JSON Formatter', emoji: '🔧', hook: 'Fix broken JSON?' },
    'blog-json-parse-error.html': { tool: 'index.html', name: 'JSON Formatter', emoji: '🔧', hook: 'Fix JSON errors?' },
    'blog-json-online-formatter.html': { tool: 'index.html', name: 'JSON Formatter', emoji: '🔧', hook: 'Format JSON online?' },
    'blog-button-design.html': { tool: 'glassmorphism-generator.html', name: 'Glassmorphism Generator', emoji: '✨', hook: 'Design glass buttons?' },
    'blog-compress-images.html': { tool: 'image-compressor.html', name: 'Image Compressor', emoji: '🖼️', hook: 'Compress images?' },
    'blog-css-online-formatter.html': { tool: 'css-formatter.html', name: 'CSS Formatter', emoji: '🎨', hook: 'Format CSS online?' },
    'blog-css-seo.html': { tool: 'css-minifier.html', name: 'CSS Minifier', emoji: '🗜️', hook: 'Minify your CSS?' },
    'blog-html-boilerplate.html': { tool: 'html-formatter.html', name: 'HTML Formatter', emoji: '📝', hook: 'Format your HTML?' },
    'blog-image-opt.html': { tool: 'image-compressor.html', name: 'Image Compressor', emoji: '🖼️', hook: 'Optimize images?' },
    'blog-json-minify-online.html': { tool: 'json-minifier.html', name: 'JSON Minifier', emoji: '📦', hook: 'Minify JSON online?' },
};

// The CTA HTML - clean, professional card below heading
function makeTopCTA(info) {
    return `
            <!-- ★ Top CTA ★ -->
            <div style="background:linear-gradient(135deg,rgba(99,102,241,0.12),rgba(59,130,246,0.08));border:1px solid rgba(129,140,248,0.25);border-radius:12px;padding:24px 28px;margin-bottom:35px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:15px;">
                <div>
                    <div style="font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:4px;">${info.emoji} ${info.hook} Try <span style="color:#818cf8">${info.name}</span> Free</div>
                    <div style="font-size:.88rem;color:#a1a1aa;">No sign-up needed · 100% in-browser · Instant results</div>
                </div>
                <a href="${info.tool}" style="background:linear-gradient(135deg,#818cf8,#6366f1);color:#fff;text-decoration:none;padding:10px 26px;border-radius:50px;font-size:.88rem;font-weight:600;white-space:nowrap;box-shadow:0 4px 15px rgba(129,140,248,0.25);transition:transform .2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Open ${info.name} →</a>
            </div>`;
}

let updated = 0, skipped = 0;

const allBlogs = fs.readdirSync('.').filter(f => f.startsWith('blog-') && f.endsWith('.html') && f !== 'blog-template.html' && f !== 'blog.html').sort();

allBlogs.forEach(file => {
    const info = blogToolMap[file];
    if (!info) {
        console.log('⚠️  No mapping for: ' + file);
        skipped++;
        return;
    }

    let html = fs.readFileSync(file, 'utf8');

    // Find the BODY section first to avoid CSS style block
    const bodyStart = html.indexOf('<body');
    if (bodyStart === -1) {
        console.log('⚠️  No <body> in: ' + file);
        skipped++;
        return;
    }

    const bodyHtml = html.slice(bodyStart);

    // Find closing </div> of the meta-row div IN THE BODY (not in CSS)
    const metaRowPos = bodyHtml.indexOf('class="meta-row"');
    if (metaRowPos === -1) {
        console.log('⚠️  No meta-row in body of: ' + file);
        skipped++;
        return;
    }

    // Find the closing </div> of meta-row
    const metaRowDivClose = bodyHtml.indexOf('</div>', metaRowPos);
    if (metaRowDivClose === -1) {
        console.log('⚠️  No </div> after meta-row in: ' + file);
        skipped++;
        return;
    }

    // Find the newline after this </div>
    let insertAfter = bodyHtml.indexOf('\n', metaRowDivClose);
    if (insertAfter === -1) insertAfter = metaRowDivClose + 6;

    // Calculate absolute position in full HTML
    const absInsertPos = bodyStart + insertAfter + 1;

    // Insert the CTA
    html = html.slice(0, absInsertPos) + makeTopCTA(info) + '\n' + html.slice(absInsertPos);

    // Fix sticky-cta text and link at bottom
    html = html.replace(
        /<div class="sticky-cta">[\s\S]*?<\/div>\s*<\/div>/,
        `<div class="sticky-cta">
        <div class="sticky-text"><span>${info.hook}</span> Try it free →</div>
        <a href="${info.tool}" class="cta-btn-primary">Open ${info.name}</a>
    </div>`
    );

    fs.writeFileSync(file, html);
    updated++;
    console.log('✅ ' + file + ' → ' + info.name);
});

console.log('\nDone! Updated: ' + updated + ', Skipped: ' + skipped);

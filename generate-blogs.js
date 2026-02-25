const fs = require('fs');

const blogs = [
    {
        file: 'blog-html-formatter.html', title: 'HTML Formatter Online – Beautify & Indent HTML Free', desc: 'Format and beautify messy HTML code online for free. Fix indentation, close missing tags, and make your HTML readable instantly.', tool: 'html-formatter.html', toolName: 'HTML Formatter', kw: 'HTML formatter', content: `
<p>Messy HTML is a developer's nightmare. Whether it's minified production code or auto-generated markup, unformatted HTML is nearly impossible to read or debug. An <strong>HTML formatter</strong> takes your tangled markup and transforms it into clean, properly indented code in seconds.</p>
<h2>Why Format HTML?</h2>
<p>Unindented HTML makes it impossible to see the nesting structure. A missing closing tag can break your entire layout, and without proper formatting, finding it is like searching for a needle in a haystack.</p>
<p>Formatted HTML lets you:</p>
<ul><li><strong>See the DOM structure clearly</strong> — Every parent-child relationship is visible through indentation.</li><li><strong>Find missing closing tags</strong> — Proper indentation reveals unclosed elements immediately.</li><li><strong>Debug faster</strong> — When elements are properly nested, CSS and JS issues become obvious.</li><li><strong>Collaborate better</strong> — Clean code is easier for teammates to understand and modify.</li></ul>
<h2>How to Use the HTML Formatter</h2>
<ol><li><strong>Paste your HTML</strong> — Copy from any source: view-source, CMS output, or minified files.</li><li><strong>Click Format</strong> — Instant beautification with proper indentation.</li><li><strong>Copy the result</strong> — Use the formatted HTML in your project.</li></ol>
<h2>Common HTML Issues the Formatter Fixes</h2>
<ul><li><strong>Missing indentation</strong> — Adds consistent 2 or 4 space indentation.</li><li><strong>Single-line HTML</strong> — Breaks minified HTML into readable multi-line format.</li><li><strong>Inconsistent spacing</strong> — Normalizes all whitespace.</li></ul>
<h2>HTML Formatting Best Practices</h2>
<ul><li>Use <strong>2-space indentation</strong> — It's the web standard used by Google, Airbnb, and most frameworks.</li><li>Always close tags — Self-closing tags like <code>&lt;br /&gt;</code> and <code>&lt;img /&gt;</code> improve clarity.</li><li>Use semantic elements — <code>&lt;article&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;nav&gt;</code> instead of generic <code>&lt;div&gt;</code>.</li><li>Keep attributes on one line when possible — Break to multiple lines only for 4+ attributes.</li></ul>
<h2>FAQ</h2>
<h3>Is it free?</h3><p>Yes, 100% free with no sign-up required.</p>
<h3>Does it fix broken HTML?</h3><p>It formats the structure but doesn't auto-fix missing tags. It does make them easy to spot.</p>
<h3>Is my code stored?</h3><p>No. Everything runs in your browser. Your HTML never leaves your device.</p>`},

    {
        file: 'blog-js-formatter.html', title: 'JavaScript Formatter Online – Beautify JS Code Free', desc: 'Format and beautify JavaScript code instantly online. Fix indentation, add proper spacing, and make your JS readable with our free tool.', tool: 'js-formatter.html', toolName: 'JavaScript Formatter', kw: 'JavaScript formatter', content: `
<p>JavaScript powers the modern web — but after minification, bundling, or quick edits, JS code can become unreadable. A <strong>JavaScript formatter</strong> instantly adds proper indentation, spacing, and line breaks to make your code clean and maintainable.</p>
<h2>Why Format JavaScript?</h2>
<p>Minified JavaScript saves bandwidth but is impossible to debug. Even hand-written JS can get messy over time. Formatting helps you:</p>
<ul><li><strong>Debug faster</strong> — See code structure, find missing brackets, and trace logic flow.</li><li><strong>Improve code reviews</strong> — Clean code gets reviewed faster and with fewer misunderstandings.</li><li><strong>Maintain consistency</strong> — Ensure the same style across your entire codebase.</li><li><strong>Learn from others</strong> — Format minified library code to understand how it works.</li></ul>
<h2>How to Use</h2>
<ol><li><strong>Paste your JavaScript</strong> — From any source: minified files, browser console, or CDN scripts.</li><li><strong>Click Format</strong> — Instant beautification with proper indentation and spacing.</li><li><strong>Copy</strong> — Use the clean code in your editor or share with others.</li></ol>
<h2>JavaScript Coding Best Practices</h2>
<ul><li>Use <code>const</code> by default, <code>let</code> when reassignment is needed — Never use <code>var</code>.</li><li>Use arrow functions for callbacks — <code>arr.map(x =&gt; x * 2)</code> is cleaner.</li><li>Always use semicolons — Avoid ASI (Automatic Semicolon Insertion) bugs.</li><li>Use template literals — <code>\`Hello \${name}\`</code> is better than string concatenation.</li><li>Use destructuring — <code>const { name, age } = user;</code></li></ul>
<h2>FAQ</h2>
<h3>Does it support ES6+?</h3><p>Yes, the formatter supports all modern JavaScript syntax including arrow functions, async/await, optional chaining, and more.</p>
<h3>Can it format TypeScript?</h3><p>Basic TypeScript formatting works, but for full TS support use our dedicated tools.</p>
<h3>Is my code safe?</h3><p>Yes. All formatting happens locally in your browser — nothing is sent to any server.</p>`},

    {
        file: 'blog-json-minifier.html', title: 'JSON Minifier Online – Compress & Minify JSON Free', desc: 'Minify JSON data online for free. Remove whitespace, reduce file size, and optimize JSON for API responses and production use.', tool: 'json-minifier.html', toolName: 'JSON Minifier', kw: 'JSON minifier', content: `
<p>When you send JSON data over the network, every byte counts. A <strong>JSON minifier</strong> strips all unnecessary whitespace, newlines, and formatting — reducing your JSON payload by 30-60% without changing the data.</p>
<h2>Why Minify JSON?</h2>
<ul><li><strong>Faster API responses</strong> — Smaller payloads mean faster load times for your users.</li><li><strong>Reduced bandwidth costs</strong> — Less data transferred = lower hosting bills.</li><li><strong>Better mobile experience</strong> — Mobile users on slow connections benefit most from minified responses.</li><li><strong>Smaller config files</strong> — Minified JSON takes less storage space.</li></ul>
<h2>How Much Space Does Minification Save?</h2>
<p>On average, minifying JSON reduces file size by <strong>30-60%</strong> depending on the formatting. A 100KB formatted JSON file typically becomes 40-70KB after minification.</p>
<h2>How to Use</h2>
<ol><li><strong>Paste your JSON</strong> — Copy formatted/beautified JSON data.</li><li><strong>Click Minify</strong> — All whitespace and formatting is removed instantly.</li><li><strong>Copy the result</strong> — Use the compact JSON in your API, config file, or database.</li></ol>
<h2>When to Minify vs Format</h2>
<ul><li><strong>Minify</strong> for production — API responses, stored data, network transfer.</li><li><strong>Format</strong> for development — Reading, debugging, editing JSON data.</li></ul>
<h2>FAQ</h2>
<h3>Does minification change the data?</h3><p>No. Only whitespace is removed. The JSON data structure and values remain exactly the same.</p>
<h3>Can I minify large files?</h3><p>Yes, the tool handles files up to several MB without issues.</p>
<h3>Is it free?</h3><p>Completely free, no sign-up, no limits.</p>`},

    {
        file: 'blog-css-minifier.html', title: 'CSS Minifier Online – Compress CSS Code Free', desc: 'Minify CSS online for free. Remove whitespace, comments, and reduce CSS file size by up to 80% for faster page load times.', tool: 'css-minifier.html', toolName: 'CSS Minifier', kw: 'CSS minifier', content: `
<p>Page speed is a Google ranking factor. One of the easiest wins is <strong>minifying your CSS</strong> — removing all whitespace, comments, and unnecessary characters to reduce file size by 40-80%.</p>
<h2>Why Minify CSS?</h2>
<ul><li><strong>Faster page loads</strong> — Smaller CSS files load faster, improving Core Web Vitals.</li><li><strong>Better Google ranking</strong> — Page speed is a confirmed ranking factor since 2021.</li><li><strong>Lower bandwidth</strong> — Save hosting costs with smaller file sizes.</li><li><strong>Better mobile UX</strong> — Critical for users on slow 3G/4G connections.</li></ul>
<h2>How to Use</h2>
<ol><li><strong>Paste your CSS</strong> — Copy your development CSS with all formatting.</li><li><strong>Click Minify</strong> — Whitespace, comments, and redundant characters are removed.</li><li><strong>Copy or download</strong> — Use the minified CSS in production.</li></ol>
<h2>What Gets Removed?</h2>
<ul><li>All whitespace and line breaks</li><li>All CSS comments (<code>/* */</code>)</li><li>Unnecessary semicolons</li><li>Redundant zero units (e.g., <code>0px</code> → <code>0</code>)</li></ul>
<h2>FAQ</h2>
<h3>Will minifying break my CSS?</h3><p>No. Minification only removes formatting — your styles work exactly the same.</p>
<h3>How much smaller will my file be?</h3><p>Typically 40-80% smaller depending on how many comments and formatting your CSS has.</p>`},

    {
        file: 'blog-html-minifier.html', title: 'HTML Minifier Online – Compress HTML Code Free', desc: 'Minify HTML online for free. Remove whitespace, comments, and reduce HTML file size for faster page loads.', tool: 'html-minifier.html', toolName: 'HTML Minifier', kw: 'HTML minifier', content: `
<p>Every kilobyte matters for page speed. An <strong>HTML minifier</strong> compresses your HTML by removing whitespace, comments, and redundant attributes — making your pages load faster without changing how they look or work.</p>
<h2>Why Minify HTML?</h2>
<ul><li><strong>Faster First Contentful Paint</strong> — Smaller HTML = browser parses and renders faster.</li><li><strong>Better Core Web Vitals</strong> — Directly impacts LCP and FID scores.</li><li><strong>SEO boost</strong> — Google rewards fast-loading pages with better rankings.</li><li><strong>Save bandwidth</strong> — Important for high-traffic websites.</li></ul>
<h2>How to Use</h2>
<ol><li>Paste your HTML code</li><li>Click Minify</li><li>Copy the compressed output</li></ol>
<h2>FAQ</h2>
<h3>Does it remove my scripts and styles?</h3><p>No. Only whitespace and comments are removed. All functional code stays intact.</p>
<h3>Is it safe for production?</h3><p>Yes. Always test minified HTML before deploying, but the tool preserves all functionality.</p>`},

    {
        file: 'blog-js-minifier.html', title: 'JavaScript Minifier Online – Compress JS Code Free', desc: 'Minify JavaScript online for free. Reduce JS file size, remove whitespace and comments for faster website performance.', tool: 'js-minifier.html', toolName: 'JS Minifier', kw: 'JavaScript minifier', content: `
<p>JavaScript is often the heaviest resource on a web page. <strong>Minifying JavaScript</strong> can reduce file sizes by 40-70%, dramatically improving page load times and user experience.</p>
<h2>Why Minify JavaScript?</h2>
<ul><li><strong>Faster page loads</strong> — Less JavaScript to download means pages render faster.</li><li><strong>Better performance scores</strong> — Lighthouse and PageSpeed Insights reward smaller JS bundles.</li><li><strong>Reduced parse time</strong> — Browsers parse smaller files faster, improving Time to Interactive.</li><li><strong>Lower costs</strong> — Less bandwidth = less hosting expense.</li></ul>
<h2>How to Use</h2>
<ol><li>Paste your JavaScript code</li><li>Click Minify</li><li>Copy the compressed output</li></ol>
<h2>What Gets Removed?</h2>
<ul><li>Whitespace and line breaks</li><li>Comments (single-line and multi-line)</li><li>Unnecessary semicolons</li></ul>
<h2>FAQ</h2>
<h3>Will minification break my code?</h3><p>Simple minification (whitespace removal) is safe. Variable name mangling can cause issues with certain patterns — our tool sticks to safe minification.</p>
<h3>Should I minify before or after bundling?</h3><p>Usually after bundling. Most bundlers (Webpack, Vite) have built-in minification for production builds.</p>`}
];

// Template function
function genPage(b) {
    const related = blogs.filter(x => x.file !== b.file).slice(0, 4);
    return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${b.title} | Code Formatter</title>
<meta name="description" content="${b.desc}">
<meta name="author" content="Udit Sharma">
<link rel="icon" type="image/svg+xml" href="favicon.svg">
<link rel="icon" type="image/png" sizes="48x48" href="favicon-48.png">
<link rel="canonical" href="https://www.codeformatter.in/${b.file}">
<meta property="og:title" content="${b.title}">
<meta property="og:description" content="${b.desc}">
<meta property="og:type" content="article">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2670168844256558" crossorigin="anonymous"></script>
<style>
:root{--bg-body:#09090b;--bg-card:rgba(24,24,27,.6);--bg-code:#121214;--border:#27272a;--primary:#818cf8;--primary-glow:rgba(129,140,248,.15);--secondary:#10b981;--text-main:#e4e4e7;--text-muted:#a1a1aa;--text-dim:#71717a;--font-ui:'Inter',sans-serif;--font-code:'JetBrains Mono',monospace}*{box-sizing:border-box}body{background-color:var(--bg-body);background-image:linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);background-size:30px 30px;color:var(--text-main);font-family:var(--font-ui);line-height:1.6;margin:0;padding:0 0 100px;-webkit-font-smoothing:antialiased}.progress-container{position:fixed;top:0;left:0;width:100%;height:3px;z-index:1000}.progress-bar{height:3px;background:var(--primary);width:0%;box-shadow:0 0 10px var(--primary);transition:width .1s}.wrapper{max-width:760px;margin:0 auto;padding:40px 20px 60px}.nav-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:30px;border-bottom:1px solid var(--border);padding-bottom:15px}.nav-back{color:var(--text-muted);text-decoration:none;font-size:.85rem;font-weight:500;display:inline-flex;align-items:center;gap:6px;transition:color .2s}.nav-back:hover{color:#fff}.brand-logo{font-weight:700;color:#3b82f6;text-decoration:none;font-size:.9rem}article h1{font-size:2.2rem;font-weight:800;letter-spacing:-.03em;line-height:1.2;margin:0 0 15px;background:linear-gradient(180deg,#fff,#a1a1aa);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.meta-row{display:flex;gap:20px;font-size:.8rem;color:var(--text-dim);font-family:var(--font-code);margin-bottom:25px;border-bottom:1px solid var(--border);padding-bottom:20px;flex-wrap:wrap}.meta-row span{display:flex;align-items:center;gap:6px}.meta-row i{color:var(--primary)}article p{font-size:1.05rem;color:#d4d4d8;margin-bottom:20px}article h2{font-size:1.5rem;font-weight:700;color:#fff;margin-top:45px;margin-bottom:18px;padding-bottom:10px;border-bottom:1px solid var(--border)}article h2::before{content:'#';color:var(--primary);opacity:.4;margin-right:8px}article h3{font-size:1.2rem;font-weight:600;color:#fff;margin-top:30px;margin-bottom:10px}strong{color:#fff;font-weight:700}ul,ol{margin-bottom:24px;padding-left:20px;color:var(--text-muted)}li{margin-bottom:8px}p code{background:#27272a;padding:2px 6px;border-radius:4px;font-size:.85em;color:#fff;border:1px solid #3f3f46;font-family:var(--font-code)}.code-wrapper{margin:25px 0;border-radius:8px;border:1px solid var(--border);background:var(--bg-code);overflow:hidden}.code-header{padding:8px 15px;background:#18181b;border-bottom:1px solid var(--border);font-size:.75rem;color:var(--text-dim);text-transform:uppercase;font-weight:600}pre{margin:0;padding:20px;overflow-x:auto;font-size:.85rem;line-height:1.6}code{font-family:var(--font-code);color:#a5b4fc}.tool-card{background:linear-gradient(180deg,rgba(39,39,42,.4),rgba(24,24,27,.4));border:1px solid var(--border);border-radius:12px;padding:35px;text-align:center;margin:25px 0;position:relative;overflow:hidden}.tool-card::before{content:'';position:absolute;top:-50px;left:50%;transform:translateX(-50%);width:150px;height:150px;background:var(--primary);filter:blur(80px);opacity:.25;z-index:-1}.tool-card h3{margin:0 0 12px;color:#fff;font-size:1.3rem}.tool-card p{font-size:.95rem;color:var(--text-muted);margin-bottom:20px}.cta-btn-primary{background:linear-gradient(135deg,var(--primary),#6366f1);color:#fff;text-decoration:none;padding:10px 24px;border-radius:50px;font-size:.85rem;font-weight:600;display:inline-block;transition:transform .2s}.cta-btn-primary:hover{transform:scale(1.05)}.related-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-top:50px;border-top:1px solid var(--border);padding-top:35px}.related-card{background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:20px;text-decoration:none;transition:all .2s}.related-card:hover{border-color:var(--primary);transform:translateY(-3px)}.related-card h3{font-size:1rem;margin:0 0 6px;color:#fff}.related-card p{font-size:.85rem;color:var(--text-dim);margin:0}footer{margin-top:60px;padding:30px 0;border-top:1px solid var(--border);background:rgba(24,24,27,.4)}.footer-content{text-align:center;max-width:760px;margin:0 auto;padding:0 20px}.footer-links{display:flex;justify-content:center;gap:20px;margin-bottom:15px;flex-wrap:wrap}.footer-links a{color:var(--primary);text-decoration:none;font-size:.85rem;font-weight:500;display:inline-flex;align-items:center;gap:5px}.footer-links a:hover{color:#fff}.footer-copyright{font-size:.8rem;color:var(--text-dim);margin:0}@media(max-width:600px){article h1{font-size:1.7rem}.related-grid{grid-template-columns:1fr}}
</style>
</head>
<body>
<div class="progress-container"><div class="progress-bar" id="progressBar"></div></div>
<div class="wrapper">
<nav class="nav-header">
<a href="blog.html" class="nav-back"><i class="fas fa-arrow-left"></i> All Articles</a>
<a href="index.html" class="brand-logo">Code Formatter</a>
</nav>
<article>
<h1>${b.title}</h1>
<div class="meta-row">
<span><i class="far fa-user-circle"></i> Udit Sharma</span>
<span><i class="far fa-calendar-alt"></i> Jan 2026</span>
<span><i class="far fa-clock"></i> 6 Min Read</span>
</div>
<div class="tool-card">
<h3>🚀 Try ${b.toolName} — Free, No Sign-up</h3>
<p>Use our free online ${b.toolName.toLowerCase()} tool. Instant results, works on any device.</p>
<a href="${b.tool}" class="cta-btn-primary">Open ${b.toolName}</a>
</div>
${b.content}
<div class="related-grid">
${related.map(r => `<a href="${r.file}" class="related-card"><h3>${r.toolName}</h3><p>${r.desc.substring(0, 80)}...</p></a>`).join('\n')}
</div>
</article>
</div>
<footer><div class="footer-content">
<div class="footer-links">
<a href="index.html"><i class="fas fa-home"></i> Home</a>
<a href="blog.html"><i class="fas fa-blog"></i> Blog</a>
<a href="about.html"><i class="fas fa-info-circle"></i> About</a>
<a href="privacy.html"><i class="fas fa-shield-alt"></i> Privacy</a>
<a href="terms.html"><i class="fas fa-file-alt"></i> Terms</a>
</div>
<p class="footer-copyright">© 2026 Code Formatter. All rights reserved.</p>
</div></footer>
<script>window.addEventListener('scroll',()=>{const e=document.getElementById('progressBar'),s=document.documentElement;e.style.width=(s.scrollTop/(s.scrollHeight-s.clientHeight)*100)+'%'});</script>
</body></html>`;
}

// Generate each blog
blogs.forEach(b => {
    const path = __dirname + '/' + b.file;
    fs.writeFileSync(path, genPage(b));
    console.log('✅ ' + b.file);
});

console.log(`\nDone! Generated ${blogs.length} blog pages.`);

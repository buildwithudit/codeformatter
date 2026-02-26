/**
 * SEO CTR Optimization Script
 * Updates title tags and meta descriptions on all tool pages
 * Goal: Increase CTR from 0.6% to 3-5% → 50+ clicks/day
 * 
 * Strategy:
 * - Power words: Free, Instant, Online, No Login, No Signup
 * - Benefit-first meta descriptions with action verbs
 * - Keep titles ≤60 chars, meta ≤155 chars
 */

const fs = require('fs');
const path = require('path');

const DIR = __dirname;

// Map of file → [new title, new meta description]
const updates = {
    'index.html': [
        'Free JSON Formatter & Validator Online — Instant, No Login',
        'Paste your JSON and get it formatted, validated & beautified instantly. Free online JSON formatter — no login, no upload, 100% private. Try it now!'
    ],
    'html-formatter.html': [
        'Free HTML Formatter & Beautifier Online — Instant Results',
        'Format and beautify messy HTML code in one click. Free online HTML formatter — works instantly in your browser, no login required. Clean HTML now!'
    ],
    'css-formatter.html': [
        'Free CSS Formatter & Beautifier Online — Clean CSS Instantly',
        'Paste ugly CSS and get clean, readable code instantly. Free online CSS formatter & beautifier — no signup, no limits, 100% browser-based. Try free!'
    ],
    'js-formatter.html': [
        'Free JavaScript Formatter & Beautifier Online — Instant JS',
        'Format and beautify JavaScript code instantly. Free online JS formatter — works in your browser, no login needed. Clean up messy JS in seconds!'
    ],
    'sql-formatter.html': [
        'Free SQL Formatter & Beautifier Online — Pretty Print SQL',
        'Make your SQL queries readable with one click. Free online SQL formatter supporting MySQL, PostgreSQL, BigQuery & more — no login required. Try now!'
    ],
    'xml-formatter.html': [
        'Free XML Formatter & Validator Online — Beautify XML Instantly',
        'Format and validate ugly XML code in seconds. Free online XML formatter — no login, no upload, 100% private browser processing. Format XML now!'
    ],
    'json-minifier.html': [
        'Free JSON Minifier Online — Compress JSON Instantly (No Login)',
        'Minify & compress your JSON to reduce file size instantly. Free online JSON minifier — removes whitespace, no login, 100% secure. Try now for free!'
    ],
    'html-minifier.html': [
        'Free HTML Minifier Online — Compress HTML Code Instantly',
        'Minify HTML to speed up your website. Free online HTML minifier — reduces file size by removing whitespace. No login, instant results. Try free!'
    ],
    'css-minifier.html': [
        'Free CSS Minifier Online — Compress CSS for Faster Sites',
        'Minify CSS to boost page speed. Free online CSS minifier — strips whitespace & comments instantly. No signup required. Compress CSS free now!'
    ],
    'js-minifier.html': [
        'Free JavaScript Minifier Online — Compress JS Instantly',
        'Minify JavaScript to reduce load time. Free online JS minifier — compress code instantly, no login needed. Boost your site speed for free!'
    ],
    'image-compressor.html': [
        'Free Image Compressor Online — Compress Images Without Quality Loss',
        'Compress JPG, PNG & WebP images without losing quality. Free online image compressor — 100% private, no upload to server. Compress images now!'
    ],
    'color-converter.html': [
        'Free Color Converter Online — HEX, RGB, HSL, CMYK Instant',
        'Convert colors between HEX, RGB, HSL and CMYK instantly. Free online color converter — no login, fast & accurate. Convert any color for free!'
    ],
    'qr-code-generator.html': [
        'Free QR Code Generator Online — Create QR Codes Instantly',
        'Generate QR codes for URLs, text & more in seconds. Free online QR code generator — no login, download as PNG. Create your QR code for free!'
    ],
    'base64-tool.html': [
        'Free Base64 Encoder & Decoder Online — Instant Conversion',
        'Encode and decode Base64 strings instantly. Free online Base64 encoder/decoder — works in your browser, no login, 100% private. Try now!'
    ],
    'url-encoder.html': [
        'Free URL Encoder & Decoder Online — Encode URLs Instantly',
        'Encode or decode URLs and query strings in one click. Free online URL encoder/decoder — instant, no signup required. Encode your URL for free!'
    ],
    'diff-checker.html': [
        'Free Online Diff Checker — Compare Text & Code Side by Side',
        'Compare two texts, files or code snippets and instantly see the differences highlighted. Free online diff checker — no login, no limits. Try now!'
    ],
    'regex-tester.html': [
        'Free Regex Tester Online — Test Regular Expressions Instantly',
        'Test and debug regular expressions in real time. Free online regex tester with match highlighting and explanation — no login needed. Test regex now!'
    ],
    'markdown-editor.html': [
        'Free Markdown Editor Online — Preview Markdown Instantly',
        'Write and preview Markdown in real time with live rendering. Free online Markdown editor — no login, fast, supports all Markdown syntax. Try now!'
    ],
    'password-generator.html': [
        'Free Password Generator Online — Create Strong Passwords Instantly',
        'Generate strong, secure passwords instantly. Free online password generator — customize length & characters, 100% private, no login. Generate now!'
    ],
    'json-to-yaml.html': [
        'Free JSON to YAML Converter Online — Convert Instantly',
        'Convert JSON to YAML format in one click. Free online JSON to YAML converter — instant, no login, perfect for config files & Kubernetes. Try now!'
    ],
    'csv-to-json.html': [
        'Free CSV to JSON Converter Online — Convert CSV Instantly',
        'Convert CSV files or data to JSON format instantly. Free online CSV to JSON converter — paste CSV, get JSON in seconds. No login required!'
    ],
    'json-to-csv.html': [
        'Free JSON to CSV Converter Online — Download as Spreadsheet',
        'Convert JSON arrays to CSV format instantly. Free online JSON to CSV converter — download as Excel/Google Sheets compatible file. No login needed!'
    ],
    'ai-code-explainer.html': [
        'Free AI Code Explainer Online — Understand Any Code Instantly',
        'Paste any code and get a plain-English explanation powered by AI. Free online code explainer — supports JS, Python, Java & more. Try it free now!'
    ],
    'ai-code-converter.html': [
        'Free AI Code Converter Online — Convert Code Between Languages',
        'Convert code from one programming language to another using AI. Free online code converter — JavaScript, Python, Java & more. Try it free!'
    ],
    'ai-prompt-enhancer.html': [
        'Free AI Prompt Enhancer Online — Improve Your ChatGPT Prompts',
        'Turn weak AI prompts into powerful ones instantly. Free online AI prompt enhancer — get better results from ChatGPT & other AI tools. Try free now!'
    ],
    'uuid-generator.html': [
        'Free UUID Generator Online — Generate UUID v4 Instantly',
        'Generate random UUID/GUID strings instantly. Free online UUID generator — bulk generate, copy with one click, no login required. Generate UUIDs now!'
    ],
    'hash-generator.html': [
        'Free Hash Generator Online — MD5, SHA-256, SHA-512 Instantly',
        'Generate MD5, SHA-1, SHA-256 & SHA-512 hashes instantly. Free online hash generator — 100% private, browser-based, no login. Hash text now!'
    ],
    'lorem-ipsum-generator.html': [
        'Free Lorem Ipsum Generator Online — Generate Placeholder Text',
        'Generate lorem ipsum placeholder text instantly. Free online lorem ipsum generator — choose words, sentences or paragraphs. No login needed!'
    ],
    'json-tree-viewer.html': [
        'Free JSON Tree Viewer Online — Visualize JSON Interactively',
        'Visualize and explore your JSON as an interactive tree. Free online JSON tree viewer — expand/collapse nodes, search keys. No login required!'
    ],
    'jwt-decoder.html': [
        'Free JWT Decoder Online — Decode JSON Web Tokens Instantly',
        'Decode and inspect JWT tokens instantly. Free online JWT decoder — see header, payload & verify signatures securely. 100% private. Try now!'
    ],
    'json-to-typescript.html': [
        'Free JSON to TypeScript Converter Online — Generate Types Instantly',
        'Convert JSON to TypeScript interfaces & Zod schemas instantly. Free online tool — no login, perfect for type-safe code. Generate TS types free!'
    ]
};

let totalUpdated = 0;
let totalSkipped = 0;
let errors = [];

for (const [filename, [newTitle, newDesc]] of Object.entries(updates)) {
    const filePath = path.join(DIR, filename);

    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  SKIP (not found): ${filename}`);
        totalSkipped++;
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Replace <title>...</title>
    const oldTitle = content.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim();
    content = content.replace(/<title>[\s\S]*?<\/title>/, `<title>${newTitle}</title>`);

    // Replace meta description content="..."
    const oldDesc = content.match(/name="description"\s+content="(.*?)"/)?.[1];
    content = content.replace(
        /(name="description"\s+content=")[^"]*(")/,
        `$1${newDesc}$2`
    );

    // Also update OG title if it exists
    content = content.replace(
        /(property="og:title"\s+content=")[^"]*(")/,
        `$1${newTitle}$2`
    );

    // Also update OG description
    content = content.replace(
        /(property="og:description"\s+content=")[^"]*(")/,
        `$1${newDesc}$2`
    );

    // Also update Twitter title
    content = content.replace(
        /(name="twitter:title"\s+content=")[^"]*(")/,
        `$1${newTitle}$2`
    );

    // Also update Twitter description
    content = content.replace(
        /(name="twitter:description"\s+content=")[^"]*(")/,
        `$1${newDesc}$2`
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${filename}`);
    console.log(`   OLD title: ${oldTitle}`);
    console.log(`   NEW title: ${newTitle}`);
    console.log(`   OLD meta:  ${oldDesc?.slice(0, 80)}...`);
    console.log(`   NEW meta:  ${newDesc.slice(0, 80)}...`);
    console.log('');
    totalUpdated++;
}

console.log('='.repeat(60));
console.log(`✅ Successfully updated: ${totalUpdated} pages`);
console.log(`⚠️  Skipped (not found): ${totalSkipped} pages`);
if (errors.length > 0) {
    console.log(`❌ Errors: ${errors.length}`);
    errors.forEach(e => console.log('  -', e));
}
console.log('='.repeat(60));
console.log('');
console.log('CTR Optimization Tips:');
console.log('1. Submit updated sitemap to Google Search Console');
console.log('2. Use "Request Indexing" on top pages in GSC');
console.log('3. Monitor CTR weekly - aim for 2-3% average');
console.log('4. Position 9.5 → Need better content + backlinks for top 5');

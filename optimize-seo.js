const fs = require('fs');
const path = require('path');

// ============================================================
// COMPREHENSIVE SEO DATA - Titles + Meta Descriptions
// Optimized for CTR: Numbers, Power words, Clear Value Prop
// ============================================================
const seoData = {

    // ── TOOL PAGES ──────────────────────────────────────────────

    'index.html': {
        title: 'Free Online Developer Tools — Code Formatter, JSON, CSS & More | Code Formatter',
        desc: 'All-in-one free developer toolkit. Format, minify & convert JSON, HTML, CSS, JS instantly. 40+ tools, no login needed. Used by 10,000+ developers.'
    },
    'ai-code-explainer.html': {
        title: 'AI Code Explainer — Understand Any Code Instantly for Free',
        desc: 'Paste any code and get a plain-English explanation in seconds. Supports Python, JavaScript, Java, C++, CSS & more. Free, no login. Try it now!'
    },
    'ai-code-converter.html': {
        title: 'AI Code Converter — Convert Code Between Languages Free & Instantly',
        desc: 'Convert code between 20+ programming languages instantly using AI. Python to JS, Java to C#, and more. Free online tool — no signup required.'
    },
    'ai-prompt-enhancer.html': {
        title: 'AI Prompt Enhancer — Make ChatGPT Prompts 10x Better, Free',
        desc: 'Instantly improve your AI prompts for ChatGPT, Gemini & Claude. Get clearer, stronger results with our free prompt optimizer. No login required.'
    },
    'aspect-ratio-calculator.html': {
        title: 'Aspect Ratio Calculator — Free Online Image & Video Ratio Tool',
        desc: 'Calculate & convert aspect ratios for images, videos and screens instantly. 16:9, 4:3, 1:1 and custom ratios. Free tool, works in your browser.'
    },
    'base64-tool.html': {
        title: 'Base64 Encoder & Decoder Online — Free, Fast, Instant Results',
        desc: 'Encode or decode Base64 strings instantly. Supports text, URLs and files. Free online Base64 tool — no ads, no signup, works offline.'
    },
    'case-converter.html': {
        title: 'Case Converter Online — camelCase, snake_case, UPPER, Title Free',
        desc: 'Convert text between camelCase, snake_case, PascalCase, kebab-case, UPPER CASE and more. Free instant online case converter for developers.'
    },
    'color-converter.html': {
        title: 'Color Converter — HEX to RGB, HSL, CMYK Free Online Tool',
        desc: 'Convert colors between HEX, RGB, HSL, CMYK and RGBA formats instantly. Live preview included. Free online color converter for designers & devs.'
    },
    'cron-generator.html': {
        title: 'Cron Expression Generator — Build Cron Jobs Visually, Free',
        desc: 'Generate cron expressions visually with plain English preview. Never get cron syntax wrong again. Free online cron job generator for developers.'
    },
    'css-formatter.html': {
        title: 'CSS Formatter & Beautifier Online — Free, Instant, Clean Output',
        desc: 'Beautify and format messy CSS code instantly. Proper indentation, clean structure. Free online CSS formatter — paste and get results in 1 click.'
    },
    'css-minifier.html': {
        title: 'CSS Minifier Online — Compress CSS Free, Reduce File Size Instantly',
        desc: 'Minify CSS code online and reduce file size by up to 80%. Faster load times, better performance. Free CSS compressor — no setup needed.'
    },
    'csv-to-json.html': {
        title: 'CSV to JSON Converter Online — Free, Fast & Accurate',
        desc: 'Convert CSV files to JSON format instantly. Handles headers, special chars and large files. Free online CSV to JSON converter for developers.'
    },
    'diff-checker.html': {
        title: 'Diff Checker Online — Compare Two Text Files Free, Side by Side',
        desc: 'Find differences between two texts, files or code snippets instantly. Highlighted diff view. Free online text comparison tool — works instantly.'
    },
    'excel-to-html.html': {
        title: 'Excel to HTML Table Converter Online — Free, No Upload Needed',
        desc: 'Convert Excel spreadsheets to clean HTML tables in seconds. Paste your data and get HTML instantly. Free tool, works entirely in your browser.'
    },
    'glassmorphism-generator.html': {
        title: 'Glassmorphism CSS Generator — Create Glass UI Effects Free',
        desc: 'Generate glassmorphism CSS effects with live preview. Adjust blur, opacity and border instantly. Free online glass UI generator for designers.'
    },
    'gradient-generator.html': {
        title: 'CSS Gradient Generator — Create Beautiful Gradients Free Online',
        desc: 'Create linear, radial and conic CSS gradients with live preview. Copy the CSS code instantly. Free gradient generator for designers and developers.'
    },
    'hash-generator.html': {
        title: 'Hash Generator Online — MD5, SHA-1, SHA-256, SHA-512 Free',
        desc: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes instantly. Great for checksums and security. Free online hash generator — no login required.'
    },
    'html-formatter.html': {
        title: 'HTML Formatter & Beautifier Online — Free, Instant Clean HTML',
        desc: 'Beautify and indent messy HTML code instantly. Clean, readable output. Free online HTML formatter — paste your code and format in 1 click.'
    },
    'html-minifier.html': {
        title: 'HTML Minifier Online — Compress HTML Free, Reduce File Size Fast',
        desc: 'Minify HTML code and reduce page size by up to 30%. Faster websites, better SEO. Free HTML compressor — instant results, no setup needed.'
    },
    'html-viewer.html': {
        title: 'HTML Viewer Online — Preview HTML Code Live, Free & Instant',
        desc: 'Preview and render HTML code live in your browser. Edit and see changes in real time. Free online HTML viewer — no installation or login needed.'
    },
    'image-compressor.html': {
        title: 'Image Compressor Online — Reduce Image Size Free Without Losing Quality',
        desc: 'Compress JPG, PNG, WebP images online without visible quality loss. Reduce file size by up to 90%. Free image compressor, works in browser.'
    },
    'js-formatter.html': {
        title: 'JavaScript Formatter & Beautifier Online — Free, Instant JS Prettifier',
        desc: 'Format and beautify messy JavaScript code instantly. Proper indentation and spacing. Free online JS formatter — paste, click, done.'
    },
    'js-minifier.html': {
        title: 'JavaScript Minifier Online — Compress JS Code Free, Speed Up Sites',
        desc: 'Minify JavaScript code online and reduce file size by up to 70%. Faster loading, better performance. Free JS minifier — instant results.'
    },
    'json-minifier.html': {
        title: 'JSON Minifier Online — Compress JSON Free, Reduce Size Instantly',
        desc: 'Minify and compress JSON data online for free. Reduce JSON size by up to 40%. Perfect for APIs and storage. No login, instant results.'
    },
    'json-to-csv.html': {
        title: 'JSON to CSV Converter Online — Free, Fast & Accurate',
        desc: 'Convert JSON arrays to CSV format instantly. Handles nested objects and large datasets. Free online JSON to CSV converter for developers & analysts.'
    },
    'json-to-typescript.html': {
        title: 'JSON to TypeScript Interface Generator — Free Online Tool',
        desc: 'Convert JSON to TypeScript interfaces and Zod schemas instantly. Type-safe code generation. Free online JSON to TS converter for developers.'
    },
    'json-to-yaml.html': {
        title: 'JSON to YAML Converter Online — Free, Instant, Accurate',
        desc: 'Convert JSON to YAML format instantly for config files and DevOps workflows. Free online JSON to YAML converter — works in your browser.'
    },
    'json-tree-viewer.html': {
        title: 'JSON Tree Viewer Online — Explore JSON Visually, Free & Interactive',
        desc: 'Visualize and explore JSON data as an interactive tree. Collapse, expand and search nodes. Free online JSON viewer — no login needed.'
    },
    'jwt-decoder.html': {
        title: 'JWT Decoder Online — Decode JSON Web Tokens Free & Instantly',
        desc: 'Decode and inspect JWT tokens instantly in your browser. View header, payload and signature. Free, secure, client-side JWT decoder tool.'
    },
    'lorem-ipsum-generator.html': {
        title: 'Lorem Ipsum Generator — Free Placeholder Text, Any Length',
        desc: 'Generate Lorem Ipsum placeholder text in words, sentences or paragraphs. Custom length. Free online Lorem Ipsum generator — instant results.'
    },
    'markdown-editor.html': {
        title: 'Markdown Editor Online — Free Live Preview Markdown Formatter',
        desc: 'Write and preview Markdown in real time. Live side-by-side or full-screen preview. Free online Markdown editor — export to HTML instantly.'
    },
    'mock-data-generator.html': {
        title: 'Mock Data Generator Online — Create Fake Test Data Free & Fast',
        desc: 'Generate realistic fake test data: names, emails, addresses, numbers and more. Free online mock data generator — export as JSON or CSV.'
    },
    'password-generator.html': {
        title: 'Password Generator Online — Create Strong Secure Passwords Free',
        desc: 'Generate strong, random, secure passwords instantly. Custom length, symbols, numbers. Free online password generator — your data never leaves your browser.'
    },
    'px-to-rem.html': {
        title: 'PX to REM Converter Online — Free, Instant CSS Unit Converter',
        desc: 'Convert pixels to REM and REM to PX for responsive CSS design. Custom base font size. Free online PX to REM converter for developers.'
    },
    'qr-code-generator.html': {
        title: 'QR Code Generator Online — Create QR Codes Free, Download PNG',
        desc: 'Generate QR codes for URLs, text, emails and more. Download as PNG. Free online QR code generator — no signup, instant results.'
    },
    'regex-tester.html': {
        title: 'Regex Tester Online — Test Regular Expressions Free with Live Match',
        desc: 'Test and debug regular expressions with live match highlighting and group breakdown. Free online regex tester for JavaScript, Python and more.'
    },
    'smooth-shadow-generator.html': {
        title: 'Box Shadow Generator Online — Create CSS Shadows Free with Preview',
        desc: 'Create smooth, layered CSS box-shadow effects with live preview. Copy CSS code instantly. Free online box shadow generator for UI designers.'
    },
    'social-card-preview.html': {
        title: 'Social Card Preview Tool — Preview OG Tags Free for Twitter & LinkedIn',
        desc: 'Preview how your Open Graph meta tags and Twitter Cards look on social media. Free tool for developers to test social sharing previews instantly.'
    },
    'sql-formatter.html': {
        title: 'SQL Formatter & Beautifier Online — Free, Clean SQL Code Instantly',
        desc: 'Format and beautify SQL queries online. Clean indentation, readable output. Free online SQL formatter supporting MySQL, PostgreSQL & more.'
    },
    'timestamp-converter.html': {
        title: 'Unix Timestamp Converter Online — Free, Instant Epoch Time Tool',
        desc: 'Convert Unix timestamps to human-readable dates and back. Show local and UTC times. Free online timestamp converter — instant, no login needed.'
    },
    'url-encoder.html': {
        title: 'URL Encoder & Decoder Online — Free, Instant Percent Encoding Tool',
        desc: 'Encode or decode URLs and query strings instantly. Handle special characters correctly. Free online URL encoder/decoder for developers.'
    },
    'uuid-generator.html': {
        title: 'UUID Generator Online — Generate UUID v1, v4 Free & Instantly',
        desc: 'Generate random UUID v1 and v4 identifiers in bulk. Copy to clipboard. Free online UUID generator — instant, secure, client-side.'
    },
    'xml-formatter.html': {
        title: 'XML Formatter & Beautifier Online — Free, Instant Clean XML',
        desc: 'Beautify and format messy XML code with proper indentation instantly. Free online XML formatter — validate and prettify XML in one click.'
    },
    'diff-checker.html': {
        title: 'Diff Checker Online — Compare Text & Code Free, Side by Side',
        desc: 'Instantly compare two text files or code snippets and highlight every difference. Free online diff checker — no login, works in your browser.'
    },

    // ── BLOG PAGES ──────────────────────────────────────────────

    'blog.html': {
        title: 'Developer Blog — Tips, Guides & Tool Tutorials | Code Formatter',
        desc: 'Expert articles on JSON, CSS, JavaScript, SEO and developer tools. Practical guides for web developers. No fluff — just actionable content.'
    },
    'blog-json-formatter.html': {
        title: 'JSON Formatter Guide — Beautify, Validate & Fix JSON in 2026',
        desc: 'Complete guide to JSON formatting, validation and debugging. Learn how to fix common JSON errors and use free online tools. Updated for 2026.'
    },
    'blog-json-minifier.html': {
        title: 'JSON Minifier Guide — Compress JSON & Optimize API Payloads (2026)',
        desc: 'Learn how to minify JSON for faster APIs and smaller storage. Compare tools, understand trade-offs, and optimize JSON in 2026.'
    },
    'blog-json-minify-online.html': {
        title: 'How to Minify JSON Online — Best Free Tools & Step-by-Step Guide',
        desc: 'Step-by-step guide to minifying JSON online for free. Reduce JSON file size, speed up your API, and improve performance instantly.'
    },
    'blog-json-online-formatter.html': {
        title: 'Best JSON Formatter Online — Format, Validate & Fix JSON Free (2026)',
        desc: 'Find the best free JSON formatter online tools. Compare features, speed and usability. Format and validate JSON in seconds — no login needed.'
    },
    'blog-json-parse-error.html': {
        title: 'JSON Parse Error: How to Fix Every Common Error Fast (2026)',
        desc: 'Fixing JSON parse errors step by step. Diagnose unexpected token, trailing comma, and 10+ common JSON errors with real examples and free tools.'
    },
    'blog-json-fix.html': {
        title: 'How to Fix "Unexpected Token" in JSON — Complete Debug Guide (2026)',
        desc: 'Step-by-step guide to fixing the "unexpected token" JSON error. Real-world examples, root causes and the fastest free tool to fix it.'
    },
    'blog-json-xml.html': {
        title: 'JSON vs XML (2026) — Key Differences, Speed & When to Use Each',
        desc: 'JSON vs XML compared: syntax, performance, use cases and developer preference in 2026. Make the right choice for your next API or config file.'
    },
    'blog-json-to-csv.html': {
        title: 'JSON to CSV: How to Convert & When to Use Each Format (2026)',
        desc: 'Complete guide to converting JSON to CSV online. Understand when to use each format, avoid common mistakes, and use free converter tools.'
    },
    'blog-json-to-typescript.html': {
        title: 'JSON to TypeScript — Auto-Generate Interfaces & Zod Schemas Free',
        desc: 'How to convert JSON to TypeScript interfaces automatically. Generate type-safe code and Zod schemas from JSON with free online tools (2026).'
    },
    'blog-json-to-yaml.html': {
        title: 'JSON to YAML: Complete Conversion Guide for DevOps & Config Files',
        desc: 'Convert JSON to YAML step by step. Understand YAML syntax, avoid gotchas, and use free online converters for your config files and pipelines.'
    },
    'blog-json-tree-viewer.html': {
        title: 'JSON Tree Viewer — Visualize Nested JSON Data Easily (2026 Guide)',
        desc: 'Learn how to explore complex JSON structures with a tree viewer. Best free tools, tips for nested data, and real developer use cases (2026).'
    },
    'blog-css-formatter.html': {
        title: 'CSS Formatter Guide — Write Cleaner, More Readable CSS in 2026',
        desc: 'Why CSS formatting matters and how to do it right. Best practices, formatting tools and professional CSS conventions for clean codebases.'
    },
    'blog-css-minifier.html': {
        title: 'CSS Minifier Guide — Compress CSS & Speed Up Your Website (2026)',
        desc: 'Everything about CSS minification: how it works, how much it helps, tools to use, and when NOT to minify. Boost your page speed today.'
    },
    'blog-css-online-formatter.html': {
        title: 'Best CSS Formatter Online — Top Free Tools Compared (2026)',
        desc: "We tested the top CSS formatters online so you don't have to. Find the fastest, cleanest CSS beautifier for your workflow. Updated 2026."
    },
    'blog-css-seo.html': {
        title: 'Does Minifying CSS Help SEO? The Real Answer (2026)',
        desc: "Find out if CSS minification actually improves your SEO rankings. Data, Google's advice, and what really makes a difference for Core Web Vitals."
    },
    'blog-html-formatter.html': {
        title: 'HTML Formatter Guide — Clean, Readable HTML Code Best Practices (2026)',
        desc: 'How to format HTML code correctly. Indentation rules, tool recommendations and team coding standards for clean, maintainable HTML in 2026.'
    },
    'blog-html-minifier.html': {
        title: 'HTML Minifier Guide — Reduce Page Size & Boost Load Speed (2026)',
        desc: 'How HTML minification works, how much it reduces file size, and the best free tools to minify HTML online. Improve your website performance today.'
    },
    'blog-html-boilerplate.html': {
        title: 'HTML5 Boilerplate 2026 — The Production-Ready Template You Need',
        desc: 'The ultimate HTML5 boilerplate for 2026. Best practices for meta tags, SEO, performance and accessibility — ready to copy and use today.'
    },
    'blog-js-formatter.html': {
        title: 'JavaScript Formatter Guide — Readable, Clean JS Code in 2026',
        desc: 'How to format JavaScript code properly. Prettier vs ESLint vs online formatters — tools, configs and best practices for clean JS in 2026.'
    },
    'blog-js-minifier.html': {
        title: 'JavaScript Minifier Guide — Compress JS & Speed Up Your Site (2026)',
        desc: 'Complete guide to JS minification: how it works, how much it helps, top tools and when to use source maps. Faster JavaScript today.'
    },
    'blog-base64-tool.html': {
        title: "Base64 Encoding Explained — Developer's Complete Guide (2026)",
        desc: 'What is Base64, how it works, when to use it and how to encode/decode in JavaScript, Python and online tools. With free examples (2026).'
    },
    'blog-case-converter.html': {
        title: 'Naming Conventions Guide — camelCase, snake_case & More (2026)',
        desc: 'When to use camelCase, PascalCase, snake_case and kebab-case in your code. Language conventions, team standards and free converter tools.'
    },
    'blog-color-converter.html': {
        title: 'HEX, RGB, HSL, CMYK — Complete Color Format Guide (2026)',
        desc: 'Understand every color format: HEX, RGB, HSL, CMYK. How to convert between them, when to use each, and the best free online color converters.'
    },
    'blog-compress-images.html': {
        title: 'How to Compress Images Without Losing Quality — 2026 Guide',
        desc: 'Compress JPG, PNG and WebP images without visible quality loss. Best free tools, format tips and optimization strategies for the web in 2026.'
    },
    'blog-aspect-ratio-calculator.html': {
        title: 'Aspect Ratio Calculator Guide — Responsive Design Made Easy (2026)',
        desc: 'How to use aspect ratios for responsive design. 16:9, 4:3, 1:1 explained. Calculate custom ratios and use free online tools for any screen.'
    },
    'blog-cron-generator.html': {
        title: 'Cron Job Guide — How to Write Cron Expressions Correctly (2026)',
        desc: 'Master cron expressions step by step. Read cron syntax, avoid common mistakes and generate cron jobs visually with a free online tool (2026).'
    },
    'blog-diff-checker.html': {
        title: 'Diff Checker Guide — How to Compare Code & Text Files (2026)',
        desc: 'How to use diff checkers to compare code, find changes and merge files. Best practices, tools and real developer use cases for 2026.'
    },
    'blog-excel-to-html.html': {
        title: 'Excel to HTML Table — How to Convert Spreadsheets Fast (2026)',
        desc: 'Convert Excel data to HTML tables in seconds. Step-by-step guide with free tools, formatting tips and use cases for developers in 2026.'
    },
    'blog-glassmorphism-generator.html': {
        title: 'Glassmorphism CSS Guide — How to Create Glass UI Effects (2026)',
        desc: 'Create stunning glassmorphism UI effects with CSS. Step-by-step tutorial, browser support, best practices and a free CSS glass generator.'
    },
    'blog-gradient-generator.html': {
        title: 'CSS Gradient Guide — How to Create Beautiful Gradients (2026)',
        desc: 'Master CSS gradients: linear, radial, conic. Code examples, design tips and free online gradient generators for stunning UI backgrounds.'
    },
    'blog-hash-generator.html': {
        title: 'MD5 vs SHA-256 — Hashing Explained for Developers (2026)',
        desc: 'Understand MD5, SHA-1, SHA-256, SHA-512 hashing. When to use each, security differences, and how to generate hashes free online (2026).'
    },
    'blog-image-compressor.html': {
        title: 'Image Compressor Guide — Reduce Image Size for Faster Web (2026)',
        desc: 'How to compress images for the web without losing quality. Tools, formats, tips and the impact on page speed and SEO scores in 2026.'
    },
    'blog-image-opt.html': {
        title: 'WebP vs PNG vs AVIF — Which Image Format Should You Use? (2026)',
        desc: 'Compare WebP, PNG, AVIF and JPEG for web performance. File size, quality, browser support and when to use each image format in 2026.'
    },
    'blog-jwt-decoder.html': {
        title: 'JWT Explained — How JSON Web Tokens Work (2026 Developer Guide)',
        desc: 'Understand JSON Web Tokens end to end: header, payload, signature, and common security pitfalls. Decode JWTs free with an online tool.'
    },
    'blog-lorem-ipsum-generator.html': {
        title: 'Lorem Ipsum Generator Guide — Placeholder Text for Designers (2026)',
        desc: 'Everything about Lorem Ipsum: its origin, how to generate it, and when to use real content instead. Free Lorem Ipsum generator included.'
    },
    'blog-markdown-editor.html': {
        title: 'Markdown Guide 2026 — Syntax, Tips & Free Online Editors',
        desc: 'Complete Markdown reference: headings, lists, code blocks, tables and more. Best free Markdown editors and how to use them effectively.'
    },
    'blog-mock-data-generator.html': {
        title: 'Mock Data Generator Guide — Generate Fake Test Data Free (2026)',
        desc: 'How to generate realistic mock data for testing: names, emails, addresses, JSON. Best free tools, strategies and team workflows for 2026.'
    },
    'blog-password-generator.html': {
        title: 'Strong Password Guide — How to Generate Secure Passwords (2026)',
        desc: 'What makes a strong password, how to generate one and manage it safely. Free online secure password generator included. Updated for 2026.'
    },
    'blog-px-to-rem.html': {
        title: 'PX to REM Guide — Responsive CSS Typography Made Simple (2026)',
        desc: 'Why REM beats PX for accessibility and responsive design. How to convert, when to use each unit, and a free online PX to REM calculator.'
    },
    'blog-qr-code-generator.html': {
        title: 'QR Code Generator Guide — How QR Codes Work & How to Create One',
        desc: 'Complete guide to QR codes: how they work, best practices for design and use cases. Generate QR codes free online and download as PNG.'
    },
    'blog-regex-cheat-sheet.html': {
        title: 'Regex Cheat Sheet 2026 — Complete Regular Expression Reference',
        desc: 'The complete regular expression cheat sheet for developers. Every regex pattern, modifier and quantifier with examples. Bookmark this now.'
    },
    'blog-regex-tester.html': {
        title: 'Regex Tester Guide — How to Write & Debug Regular Expressions (2026)',
        desc: 'Learn to write and test regular expressions step by step. Common patterns, debugging tips and a free live regex tester for JavaScript.'
    },
    'blog-smooth-shadow-generator.html': {
        title: 'CSS Box Shadow Guide — Create Perfect UI Shadows (2026)',
        desc: 'Master CSS box-shadow: layering, blur, spread, color and smooth shadows. Code examples and a free online CSS shadow generator for designers.'
    },
    'blog-social-card-preview.html': {
        title: 'Open Graph Guide — How to Preview & Fix Social Media Cards (2026)',
        desc: 'How to set up OG tags, Twitter Cards and LinkedIn previews correctly. Fix broken social cards and test with a free Social Card Preview tool.'
    },
    'blog-sql-formatter.html': {
        title: 'SQL Formatter Guide — Write Clean, Readable SQL Queries (2026)',
        desc: 'How to format SQL queries for readability and team standards. Best practices, free online SQL formatters and common formatting mistakes to avoid.'
    },
    'blog-timestamp-converter.html': {
        title: 'Unix Timestamp Guide — Convert Epoch Time Easily (2026)',
        desc: 'Understand Unix timestamps: how they work, how to convert to dates in JS/Python/SQL, and use a free online timestamp converter tool (2026).'
    },
    'blog-url-encoder.html': {
        title: 'URL Encoding Guide — How Percent Encoding Works (2026)',
        desc: 'What is URL encoding, why it matters, and how to encode/decode URLs correctly. Free online URL encoder tool and common gotchas explained.'
    },
    'blog-uuid-generator.html': {
        title: 'UUID Guide — What Are UUIDs & How to Generate Them (2026)',
        desc: 'Understand UUID v1 vs v4, when to use UUIDs, and how to generate them in your language. Free online UUID generator with bulk export.'
    },
    'blog-xml-formatter.html': {
        title: 'XML Formatter Guide — Clean & Format XML Code Correctly (2026)',
        desc: 'How to format XML for readability, validate structure and fix common XML errors. Free online XML formatter and beautifier tool included.'
    },
    'blog-csv-to-json.html': {
        title: 'CSV to JSON Guide — Convert & Transform Data Easily (2026)',
        desc: 'How to convert CSV to JSON correctly: headers, special characters, nested data. Free online converter and real developer use cases (2026).'
    },
    'blog-tailwind-review.html': {
        title: 'Tailwind CSS vs Traditional CSS — Honest Review for 2026',
        desc: 'Is Tailwind CSS worth it in 2026? We compare Tailwind vs vanilla CSS: developer experience, performance and real-world trade-offs.'
    },
    'blog-technical-seo.html': {
        title: 'Technical SEO Checklist 2026 — Boost Rankings with These Fixes',
        desc: 'Complete technical SEO checklist for developers: Core Web Vitals, structured data, sitemaps, canonicals and more. Actionable fixes for 2026.'
    },
    'blog-dark-mode.html': {
        title: 'Dark Mode CSS Guide — How to Build It Right, Not Just #000000',
        desc: 'Build a proper dark mode with CSS custom properties, system preferences and contrast ratios. Avoid common dark mode mistakes in 2026.'
    },
    'blog-debugging.html': {
        title: 'How to Debug Minified JavaScript in Chrome DevTools (2026 Guide)',
        desc: 'Step-by-step guide to debugging minified JS files using source maps and Chrome DevTools. Never be stumped by minified code again.'
    },
    'blog-ai-future.html': {
        title: 'Will AI Replace Developers in 2026? The Honest Truth',
        desc: "A balanced, evidence-based analysis of AI's real impact on software development jobs. What AI can do, what it can't, and how to stay relevant."
    },
    'blog-freelancing.html': {
        title: 'How to Make ₹50,000/Month Freelancing as a Developer (2026 Guide)',
        desc: 'A detailed roadmap for developers to earn ₹50k+/month freelancing. Platforms, portfolio tips, client acquisition and pricing strategies.'
    },
    'blog-passive-income.html': {
        title: '3 Passive Income Ideas for Developers That Actually Work (2026)',
        desc: 'Real passive income streams for software developers: tools, digital products and content. Honest earnings, timelines and how to start today.'
    },
    'blog-privacy-tech.html': {
        title: 'Privacy Tools Every Developer Should Know in 2026',
        desc: 'Best privacy tools and practices for developers: encryption, secure storage, GDPR compliance and client-side processing. Updated for 2026.'
    },
    'blog-vscode-tools.html': {
        title: 'Best VS Code Extensions for Developers in 2026 — Hidden Gems',
        desc: 'Top VS Code extensions that actually save time in 2026. Productivity, formatting, debugging and AI tools — tried and tested picks.'
    },
};

// ── Update HTML files ─────────────────────────────────────────

const dir = __dirname;
let updated = 0;
let skipped = 0;
let errors = [];

for (const [filename, { title, desc }] of Object.entries(seoData)) {
    const filePath = path.join(dir, filename);
    if (!fs.existsSync(filePath)) {
        skipped++;
        continue;
    }

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const original = content;

        // Replace <title>
        content = content.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

        // Replace meta description
        content = content.replace(
            /(<meta\s+name=["']description["']\s+content=["'])[^"']*?(["'])/i,
            `$1${desc}$2`
        );
        // Also handle reversed attribute order: content first, then name
        content = content.replace(
            /(<meta\s+content=["'])[^"']*?(["']\s+name=["']description["'])/i,
            `$1${desc}$2`
        );

        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated: ${filename}`);
            updated++;
        } else {
            console.log(`⚠️  No change: ${filename} (check tag format)`);
            skipped++;
        }
    } catch (e) {
        console.error(`❌ Error: ${filename} — ${e.message}`);
        errors.push(filename);
    }
}

console.log('\n════════════════════════════════');
console.log(`✅ Updated:  ${updated} files`);
console.log(`⚠️  Skipped:  ${skipped} files`);
console.log(`❌ Errors:   ${errors.length} files`);
if (errors.length) console.log('   Error files:', errors.join(', '));
console.log('════════════════════════════════');

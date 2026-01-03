// script.js
const tools = [
    { category: "JSON Tools", items: [{ id: "json-fmt", name: "JSON Formatter", desc: "Validate, Prettify & Tree View" }, { id: "json-min", name: "JSON Minifier", desc: "Compress JSON data" }, { id: "json-csv", name: "JSON to CSV", desc: "Convert JSON array to CSV" }, { id: "mock-data", name: "Mock Data Gen", desc: "Fake Users JSON" }] },
    { category: "Image Tools", items: [{ id: "img-compress", name: "Image Minifier & Converter", desc: "Compress & Convert (WebP, JPG, PNG)" }] },
    { category: "Design / UI", items: [{ id: "shadow-gen", name: "Smooth Shadow", desc: "Layered Shadows" }, { id: "glass-morphism", name: "Glassmorphism Gen", desc: "Generate Glass CSS" }, { id: "color-conv", name: "Color Converter", desc: "HEX, RGB, HSL conversion" }, { id: "aspect-ratio", name: "Aspect Ratio", desc: "Calc Ratio & Padding" }] },
    { category: "Media / Creator", items: [{ id: "social-card", name: "Social Preview", desc: "Twitter/Link Cards" }] },
    { category: "Dev Tools", items: [{ id: "diff-check", name: "Diff Checker", desc: "Compare Text/Code" }, { id: "jwt-dec", name: "JWT Decoder", desc: "Decode Header & Payload" }, { id: "px-rem", name: "PX to REM", desc: "Convert Pixels to REM units" }, { id: "case-conv", name: "Case Converter", desc: "Camel, Snake, Kebab formats" }] },
    { category: "HTML / XML", items: [{ id: "html-fmt", name: "HTML Formatter", desc: "Beautify HTML code" }, { id: "html-min", name: "HTML Minifier", desc: "Compress HTML code" }, { id: "html-view", name: "HTML Viewer", desc: "Preview HTML output" }, { id: "xml-fmt", name: "XML Formatter", desc: "Beautify XML" }] },
    { category: "JS / CSS", items: [{ id: "js-fmt", name: "JS Formatter", desc: "Beautify JavaScript" }, { id: "js-min", name: "JS Minifier", desc: "Minify & Obfuscate JS" }, { id: "css-fmt", name: "CSS Formatter", desc: "Beautify CSS Code" }, { id: "css-min", name: "CSS Minifier", desc: "Compress CSS files" }] },
    { category: "Converters", items: [{ id: "excel-html", name: "Excel to HTML", desc: "Convert Spreadsheet to HTML" }, { id: "csv-json", name: "CSV to JSON", desc: "Convert CSV to JSON" }, { id: "sql-fmt", name: "SQL Formatter", desc: "Format SQL Queries" }] },
    { category: "Utils", items: [{ id: "base64", name: "Base64 Tool", desc: "Encode or Decode Base64" }, { id: "url-enc", name: "URL Encoder", desc: "Encode URL parameters" }, { id: "qr-gen", name: "QR Generator", desc: "Generate QR Codes" }, { id: "hash-gen", name: "Hash Generator", desc: "MD5, SHA1, SHA256" }, { id: "lorem", name: "Lorem Ipsum", desc: "Generate Dummy Text" }] }
];

let currentId = "json-fmt"; let isRemToPxMode = false; let debounceTimer; const DIFF_SPLIT = "\n======\n";
let originalImageBlob = null; let compressedImageUrl = null;

const els = {
    input: document.getElementById('input'), output: document.getElementById('output'), menu: document.getElementById('menuContainer'),
    title: document.getElementById('toolTitle'), desc: document.getElementById('toolDesc'), visual: document.getElementById('visualOutput'),
    frame: document.getElementById('iframePreview'), inputStats: document.getElementById('inputStats'), outputStats: document.getElementById('outputStats'),
    savingsStat: document.getElementById('savingsStat'), btnPri: document.getElementById('btnPrimary'), btnSec: document.getElementById('btnSecondary'),
    viewToggles: document.getElementById('viewToggles'), sidebar: document.getElementById('sidebar'), overlay: document.getElementById('overlay'),
    inputActions: document.getElementById('inputActions'), paneInputTitle: document.getElementById('paneInputTitle'), paneOutputTitle: document.getElementById('paneOutputTitle'),
    mockControls: document.getElementById('mockControls'), socialControls: document.getElementById('socialControls'),
    shadowControls: document.getElementById('shadowControls'), imageControls: document.getElementById('imageControls'), imagePreview: document.getElementById('imagePreview'),
    shadowControls: document.getElementById('shadowControls'), imageControls: document.getElementById('imageControls'), imagePreview: document.getElementById('imagePreview'),
    glassControls: document.getElementById('glassControls'),
    colorControls: document.getElementById('colorToolsWrapper'),
    aspectControls: document.getElementById('aspectControls'),
};

document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    // Auto Select based on global variable
    if (typeof activeToolId !== 'undefined') {
        selectTool(activeToolId);
        const links = document.querySelectorAll(`.nav-item[data-id="${activeToolId}"]`);
        links.forEach(link => link.classList.add('active'));
    }
    setupEventListeners();
    startTypingAnimation();
});

function startTypingAnimation() {
    const textToType = "Paste your code here...";
    const inputEl = document.getElementById('input');
    if (!inputEl) return;
    let index = 0; inputEl.placeholder = "";
    function type() { if (index < textToType.length) { inputEl.placeholder += textToType.charAt(index); index++; setTimeout(type, 50); } }
    setTimeout(type, 500); inputEl.addEventListener('focus', () => { inputEl.placeholder = "Paste your code here..."; });
}

function setupEventListeners() {
    if (els.input) {
        els.input.addEventListener('input', () => {
            updateStats(els.input.value, 'input');
            document.getElementById('footerStatus').innerHTML = '<i class="fas fa-keyboard"></i> Typing...';
            clearTimeout(debounceTimer);
            if (['color-conv', 'aspect-ratio'].includes(currentId)) debounceTimer = setTimeout(() => runAction('primary'), 300);
        });
        document.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') runAction('primary'); });
        els.input.addEventListener('keydown', function (e) {
            if (e.key == 'Tab') { e.preventDefault(); const start = this.selectionStart; const end = this.selectionEnd; this.value = this.value.substring(0, start) + "\t" + this.value.substring(end); this.selectionStart = this.selectionEnd = start + 1; }
        });
    }
    window.addEventListener('resize', () => { if (window.innerWidth > 900) { els.overlay.classList.remove('show'); els.sidebar.classList.remove('open'); } });
    const dz = document.getElementById('dropZone');
    if (dz) {
        dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('dragover'); });
        dz.addEventListener('dragleave', e => { e.preventDefault(); dz.classList.remove('dragover'); });
        dz.addEventListener('drop', e => { e.preventDefault(); dz.classList.remove('dragover'); if (e.dataTransfer.files.length) { document.getElementById('fileInput').files = e.dataTransfer.files; handleImageUpload(document.getElementById('fileInput')); } });
    }
}

function loadTheme() { const saved = localStorage.getItem('theme') || 'dark'; document.documentElement.className = saved; updateThemeIcon(saved); }
function toggleTheme() { const current = document.documentElement.className; const newTheme = current === 'dark' ? 'light' : 'dark'; document.documentElement.className = newTheme; localStorage.setItem('theme', newTheme); updateThemeIcon(newTheme); }
function updateThemeIcon(theme) { document.getElementById('themeIcon').className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon'; }

function selectTool(id) {
    currentId = id;
    let tool; tools.forEach(g => { const t = g.items.find(i => i.id === id); if (t) tool = t; });
    if (tool) { els.title.innerText = tool.name; els.desc.innerText = tool.desc; }

    [els.mockControls, els.socialControls, els.shadowControls, els.imageControls, els.imagePreview, els.glassControls, els.colorControls, els.aspectControls].forEach(el => { if (el) el.style.display = 'none'; });
    if (els.input) els.input.style.display = 'block';
    if (els.visual) els.visual.style.display = 'none';
    if (els.frame) els.frame.style.display = 'none';
    if (els.output) els.output.style.display = 'block';
    if (els.btnPri) els.btnPri.style.display = 'flex';
    if (els.btnSec) els.btnSec.style.display = 'none';
    if (els.inputActions) els.inputActions.style.display = 'flex';
    if (els.viewToggles) els.viewToggles.style.display = (['json-fmt', 'html-view', 'excel-html', 'jwt-dec', 'glass-morphism', 'social-card', 'shadow-gen', 'color-conv', 'aspect-ratio'].includes(id)) ? 'flex' : 'none';
    if (els.outputStats) els.outputStats.style.display = 'none';
    if (els.savingsStat) els.savingsStat.style.display = 'none';
    updateStats("", 'input');
    els.btnSec.style.display = 'flex'; els.btnSec.innerText = 'MINIFY'; els.btnPri.innerHTML = '<i class="fas fa-play"></i> RUN / FORMAT';
    els.input.placeholder = "Paste your code here..."; els.input.disabled = false;
    els.paneInputTitle.innerText = "Input / Controls"; els.paneOutputTitle.innerText = "Output";

    if (['qr-gen', 'lorem', 'hash-gen', 'base64', 'url-enc', 'csv-json', 'case-conv', 'jwt-dec', 'color-conv', 'glass-morphism', 'aspect-ratio', 'mock-data', 'social-card', 'shadow-gen', 'img-compress'].includes(id)) els.btnSec.style.display = 'none';

    if (id === 'mock-data') { els.input.style.display = 'none'; els.mockControls.style.display = 'block'; els.btnPri.style.display = 'none'; }
    else if (id === 'social-card') { els.input.style.display = 'none'; els.socialControls.style.display = 'block'; els.btnPri.style.display = 'none'; }
    else if (id === 'shadow-gen') { els.input.style.display = 'none'; els.shadowControls.style.display = 'block'; els.btnPri.style.display = 'none'; updateShadow(); switchView('visual'); }
    else if (id === 'img-compress') {
        els.input.style.display = 'none'; els.output.style.display = 'none';
        els.imageControls.style.display = 'block'; els.imagePreview.style.display = 'block';
        els.btnPri.style.display = 'none'; els.inputActions.style.display = 'none';
        els.paneInputTitle.innerText = "Upload & Settings"; els.paneOutputTitle.innerText = "Preview & Download";
        document.getElementById('imgOriginal').style.display = 'none'; document.getElementById('iconOriginal').style.display = 'block';
        document.getElementById('metaOriginal').innerText = "Waiting for image...";
        document.getElementById('imgCompressed').style.display = 'none'; document.getElementById('iconCompressed').style.display = 'block';
        document.getElementById('metaCompressed').innerText = "-"; document.getElementById('badgeSaved').innerText = "0% Saved"; document.getElementById('badgeSaved').style.background = 'var(--text-muted)';
    }
    else if (id === 'glass-morphism') { els.input.style.display = 'none'; els.glassControls.style.display = 'flex'; els.btnPri.style.display = 'none'; renderGlassGenerator(); switchView('visual'); }
    else if (id === 'color-conv') {
        console.log('Selecting Color Conv!');
        els.input.style.display = 'none';
        if (els.colorControls) els.colorControls.style.display = 'flex';
        else console.error('ELS.COLORCONTROLS IS MISSING');
        els.btnPri.style.display = 'none';
        renderColorConverter();
        switchView('visual');
    }
    else if (id === 'aspect-ratio') { els.input.style.display = 'none'; els.aspectControls.style.display = 'block'; els.btnPri.style.display = 'none'; updateAspectRatio(); switchView('visual'); }
    else if (id === 'px-rem') { isRemToPxMode = false; els.btnSec.style.display = 'flex'; els.btnSec.innerHTML = '<i class="fas fa-exchange-alt"></i> SWAP ⇄'; els.btnPri.innerHTML = '<i class="fas fa-calculator"></i> CONVERT'; els.input.placeholder = "Enter PX values (e.g. 16 24 32)..."; }
    else if (id === 'diff-check') { els.btnSec.style.display = 'flex'; els.btnSec.innerHTML = '<i class="fas fa-columns"></i> INSERT SPLIT'; els.btnPri.innerHTML = '<i class="fas fa-search"></i> COMPARE'; els.input.placeholder = "Step 1: Paste Original Text\nStep 2: Click 'INSERT SPLIT' button below\nStep 3: Paste New Text after the line"; }
    else if (id === 'html-view') { els.input.placeholder = ""; els.btnSec.style.display = 'none'; els.btnPri.innerHTML = '<i class="fas fa-eye"></i> PREVIEW'; }
    else if (id === 'excel-html') { els.btnSec.style.display = 'none'; els.btnPri.innerHTML = '<i class="fas fa-code"></i> CONVERT'; }
}

// --- ASPECT RATIO LOGIC ---
function updateAspectRatio() {
    const w = parseInt(document.getElementById('aspWidth').value) || 1920;
    const h = parseInt(document.getElementById('aspHeight').value) || 1080;

    // Calculate GCD for Ratio
    const gcd = (a, b) => b ? gcd(b, a % b) : a;
    const divisor = gcd(w, h);
    const ratioW = w / divisor;
    const ratioH = h / divisor;

    // Calculate Padding
    const pad = ((h / w) * 100).toFixed(2);

    // Update UI Results
    document.getElementById('resRatio').innerText = `${ratioW}:${ratioH}`;
    document.getElementById('resPadding').innerText = `${pad}%`;

    // Update Visual
    els.visual.innerHTML = `
    <div style="height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center;">
        <div style="width:100%; max-width:400px; aspect-ratio:${w}/${h}; background:var(--primary); transition:all 0.3s; border-radius:8px; display:flex; justify-content:center; align-items:center; color:#fff; font-weight:bold; font-size:1.5rem; position:relative; box-shadow:0 10px 30px -10px var(--primary);">
            ${w} x ${h}
        </div>
        <div style="margin-top:20px; color:var(--text-muted); font-size:0.9rem;">
            Visual Preview (${ratioW}:${ratioH})
        </div>
        <div style="margin-top:20px; width:100%; max-width:400px;">
             <div class="code-box-item" onclick="navigator.clipboard.writeText('aspect-ratio: ${ratioW} / ${ratioH};'); showToast('CSS Copied')">
                <span>CSS</span> <strong>aspect-ratio: ${ratioW} / ${ratioH};</strong> <i class="far fa-copy"></i>
            </div>
        </div>
    </div>
    <style>
        .code-box-item {
            background: var(--bg-input); border: 1px solid var(--border); padding: 12px; border-radius: 8px;
            display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: all 0.2s;
            font-size: 0.9rem; color: var(--text-main);
        }
        .code-box-item:hover { border-color: var(--primary); background: rgba(59, 130, 246, 0.1); }
        .code-box-item span { color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; }
        .code-box-item i { opacity: 0.5; }
    </style>`;

    // Output Code
    els.output.value = `.aspect-box {
  width: 100%;
  aspect-ratio: ${ratioW} / ${ratioH};
  /* Legacy fallback */
  padding-bottom: ${pad}%;
}`;
}

function setAspect(w, h) {
    // Determine base width (e.g., 1080p width is 1920)
    // Scale height accordingly
    const baseW = 1080;
    // Wait, let's keep it simple. Just set 1920width and calc height
    const newW = 1920;
    const newH = Math.round((h / w) * 1920);

    document.getElementById('aspWidth').value = newW;
    document.getElementById('aspHeight').value = newH;
    updateAspectRatio();
}

function handleImageUpload(input) {
    const file = input.files[0]; if (!file) return; originalImageBlob = file;
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = document.getElementById('imgOriginal'); img.src = e.target.result; img.style.display = 'block'; document.getElementById('iconOriginal').style.display = 'none';
        document.getElementById('metaOriginal').innerText = `${file.type} | ${(file.size / 1024).toFixed(1)} KB`; processImage();
    };
    reader.readAsDataURL(file);
}
function processImage() {
    if (!originalImageBlob) return;
    const quality = parseFloat(document.getElementById('rngQuality').value);
    document.getElementById('valQuality').innerText = Math.round(quality * 100) + '%';
    const format = document.getElementById('selFormat').value; const maxWidth = document.getElementById('numWidth').value ? parseInt(document.getElementById('numWidth').value) : 0;
    const img = new Image(); img.src = document.getElementById('imgOriginal').src;
    img.onload = () => {
        const canvas = document.createElement('canvas'); let w = img.width; let h = img.height;
        if (maxWidth > 0 && w > maxWidth) { const ratio = maxWidth / w; w = maxWidth; h = h * ratio; }
        canvas.width = w; canvas.height = h; const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0, w, h);
        compressedImageUrl = canvas.toDataURL(format, quality);
        const imgComp = document.getElementById('imgCompressed'); imgComp.src = compressedImageUrl; imgComp.style.display = 'block'; document.getElementById('iconCompressed').style.display = 'none';
        const head = `data:${format};base64,`; const sizeInBytes = Math.round((compressedImageUrl.length - head.length) * 0.75);
        const sizeKB = (sizeInBytes / 1024).toFixed(1); const saved = ((1 - (sizeInBytes / originalImageBlob.size)) * 100).toFixed(0);
        document.getElementById('metaCompressed').innerText = `${format.split('/')[1].toUpperCase()} | ${sizeKB} KB`;
        const badge = document.getElementById('badgeSaved'); badge.innerText = `${saved > 0 ? saved : 0}% Saved`; badge.style.background = saved > 0 ? 'var(--diff-add)' : 'var(--text-muted)';
    };
}
function downloadImage() { if (!compressedImageUrl) return; const a = document.createElement('a'); const ext = document.getElementById('selFormat').value.split('/')[1]; a.href = compressedImageUrl; a.download = `minified_image.${ext}`; a.click(); showToast("Image Downloaded"); }

function generateMockData() {
    const rows = parseInt(document.getElementById('mockRows').value); const data = []; const names = ["Alice", "Bob", "Charlie", "Dave", "Eve"]; const roles = ["Admin", "User", "Editor"];
    for (let i = 0; i < rows; i++) {
        const item = {}; if (document.getElementById('mockId').checked) item.id = i + 1; if (document.getElementById('mockName').checked) item.name = names[Math.floor(Math.random() * names.length)] + ` ${i}`; if (document.getElementById('mockEmail').checked) item.email = `user${i}@example.com`; if (document.getElementById('mockRole').checked) item.role = roles[Math.floor(Math.random() * roles.length)]; if (document.getElementById('mockAvatar').checked) item.avatar = `https://i.pravatar.cc/150?u=${i}`; data.push(item);
    }
    els.output.value = JSON.stringify(data, null, 2); updateStats(els.output.value, 'output');
}
function generateSocialCard() {
    const title = document.getElementById('ogTitle').value; const desc = document.getElementById('ogDesc').value; const img = document.getElementById('ogImg').value; const url = document.getElementById('ogUrl').value;
    els.visual.innerHTML = `<div style="max-width:400px; margin:20px auto; border:1px solid #e1e8ed; border-radius:12px; overflow:hidden; background:#fff; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;"><div style="height:200px; background:url('https://placehold.co/600x400/png') center/cover; background-color:#cfd9de;"></div><div style="padding:12px; border-top:1px solid #e1e8ed;"><h3 style="margin:0 0 4px; color:#0f1419; font-size:15px; font-weight:700; line-height:20px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${title}</h3><p style="margin:0; color:#536471; font-size:14px; line-height:18px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${desc}</p><div style="margin-top:4px; color:#536471; font-size:14px;">${new URL(url).hostname}</div></div></div><p style="text-align:center; margin-top:10px; font-size:0.8rem; color:var(--text-muted);">Twitter Card Preview</p>`;
    els.output.value = `\n<meta property="og:type" content="website">\n<meta property="og:url" content="${url}">\n<meta property="og:title" content="${title}">\n<meta property="og:description" content="${desc}">\n<meta property="og:image" content="${img}">\n\n<meta property="twitter:card" content="summary_large_image">\n<meta property="twitter:url" content="${url}">\n<meta property="twitter:title" content="${title}">\n<meta property="twitter:description" content="${desc}">\n<meta property="twitter:image" content="${img}">`;
    els.visual.style.display = 'block'; els.output.style.display = 'block'; switchView('visual');
}
function updateShadow() {
    const intensity = parseFloat(document.getElementById('rngIntensity').value);
    const yDist = parseInt(document.getElementById('rngY').value);
    const blur = parseInt(document.getElementById('rngBlur').value);
    const colInput = document.getElementById('rngColor');
    const colorHex = colInput ? colInput.value : '#000000';

    document.getElementById('valIntensity').innerText = intensity;
    document.getElementById('valY').innerText = yDist + 'px';
    document.getElementById('valBlur').innerText = blur + 'px';
    if (document.getElementById('valColor')) document.getElementById('valColor').innerText = colorHex;

    // Helper to hex -> rgb
    const r = parseInt(colorHex.substr(1, 2), 16);
    const g = parseInt(colorHex.substr(3, 2), 16);
    const b = parseInt(colorHex.substr(5, 2), 16);

    const layers = [];
    for (let i = 1; i <= 6; i++) {
        const curY = Math.round((yDist / 6) * i);
        const curBlur = Math.round((blur / 6) * i);
        const opacity = (intensity / i).toFixed(3);
        layers.push(`0 ${curY}px ${curBlur}px rgba(${r}, ${g}, ${b}, ${opacity})`);
    }
    const css = `box-shadow:\n  ${layers.join(',\n  ')};`;
    els.output.value = css;

    // Updated logic to use enhanced preview box
    const shadowBox = document.getElementById('shadowBox');
    const hasCodePreview = document.getElementById('shadowCodePreview');

    // Structure construction if missing OR if code preview is missing (legacy structure)
    if (!shadowBox || !hasCodePreview) {
        els.visual.innerHTML = `
            <div class="preview-bg-container" style="flex-direction:column; gap:20px;">
                <div id="shadowBox" class="shadow-preview-box">
                    <span class="preview-label">Shadow Preview</span>
                    Smooth Shadow
                </div>
                 <div style="width:280px; background:var(--bg-input); padding:12px; border-radius:8px; border:1px solid var(--border); position:relative; display:flex; align-items:center;">
                    <pre id="shadowCodePreview" style="margin:0; font-family:'JetBrains Mono'; font-size:11px; color:var(--text-main); white-space:pre-wrap; flex:1; overflow:hidden; text-overflow:ellipsis;">${layers[layers.length - 1]}</pre>
                    <div style="cursor:pointer; color:var(--primary); margin-left:10px;" title="Copy Full CSS" onclick="navigator.clipboard.writeText(document.getElementById('shadowFullCode').value); showToast('CSS Copied!')">
                        <i class="far fa-copy"></i>
                    </div>
                </div>
                <textarea id="shadowFullCode" style="display:none;">${css}</textarea>
            </div>
        `;
    } else {
        // Just update existing elements
        shadowBox.style.boxShadow = layers.join(',');
        const codePreview = document.getElementById('shadowCodePreview');
        if (codePreview) codePreview.innerText = css.replace('box-shadow:\n  ', '').replace(';', '');
        const fullCode = document.getElementById('shadowFullCode');
        if (fullCode) fullCode.value = css;
    }
}


function renderGlassGenerator() {
    // Only render the preview part in the Visual Pane (Right Box)
    // Controls are now static in LHS
    els.visual.innerHTML = `
    <div style="height:100%; display:flex; flex-direction:column; gap:20px;">
        <div id="glassPreviewBg" style="flex:1; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius:12px; display:flex; justify-content:center; align-items:center; position:relative; overflow:hidden;">
            <!-- Abstract shapes for better blur visualization -->
            <div style="position:absolute; top:20%; left:20%; width:100px; height:100px; background:#ff9a9e; border-radius:50%;"></div>
            <div style="position:absolute; bottom:20%; right:20%; width:120px; height:120px; background:#4facfe; border-radius:50%;"></div>
            
            <div id="glassCard" style="width:300px; height:180px; color:#fff; display:flex; flex-direction:column; justify-content:center; align-items:center; border:1px solid rgba(255,255,255,0.3); border-radius:16px; font-weight:600; font-size:1.4rem; gap:12px; text-shadow:0 2px 4px rgba(0,0,0,0.1);">
                <i class="fas fa-gem" style="font-size:2.5rem; opacity:0.9;"></i>
                <span>Glass CSS</span>
            </div>
        </div>
        
        <!-- Code Value Box below preview -->
        <div style="background:var(--bg-input); padding:15px; border-radius:8px; border:1px solid var(--border); position:relative;">
            <div style="position:absolute; top:10px; right:10px; cursor:pointer; color:var(--text-muted);" title="Copy Code" onclick="navigator.clipboard.writeText(document.getElementById('glassCode').innerText); showToast('Copied!')">
                <i class="far fa-copy"></i>
            </div>
            <pre id="glassCode" class="language-css" style="margin:0; font-family:'JetBrains Mono'; font-size:13px; color:var(--text-main); white-space:pre-wrap;"></pre>
        </div>
    </div>`;
    els.visual.style.display = 'block';
    updateGlass();
}

function updateGlass() {
    const blur = document.getElementById('rngBlur').value;
    const trans = document.getElementById('rngTrans').value;
    const colVal = document.getElementById('rngColor').value;

    document.getElementById('valBlur').innerText = blur + "px";
    document.getElementById('valTrans').innerText = trans;

    const bgCol = `rgba(${colVal}, ${colVal}, ${colVal}, ${trans})`;
    const borderCol = `rgba(255, 255, 255, ${Math.min(0.3, parseFloat(trans) + 0.1)})`;

    // Update Preview Card Styles
    const card = document.getElementById('glassCard');
    if (card) {
        card.style.background = bgCol;
        card.style.backdropFilter = `blur(${blur}px)`;
        card.style.webkitBackdropFilter = `blur(${blur}px)`;
        card.style.border = `1px solid ${borderCol}`;
    }

    // Generate Code
    const code = `.glass-panel {
    background: ${bgCol};
    backdrop-filter: blur(${blur}px);
    -webkit-backdrop-filter: blur(${blur}px);
    border: 1px solid ${borderCol};
}`;

    // Update Code Display
    const glassCode = document.getElementById('glassCode');
    if (glassCode) {
        glassCode.innerHTML = `<span style="color:#c586c0">.glass-panel</span> {
    <span style="color:#9cdcfe">background</span>: <span style="color:#ce9178">${bgCol}</span>;
    <span style="color:#9cdcfe">backdrop-filter</span>: <span style="color:#ce9178">blur(${blur}px)</span>;
    <span style="color:#9cdcfe">-webkit-backdrop-filter</span>: <span style="color:#ce9178">blur(${blur}px)</span>;
    <span style="color:#9cdcfe">border</span>: <span style="color:#ce9178">1px solid ${borderCol}</span>;
}`;
    }

    if (els.output) els.output.value = code;
}
// --- COLOR CONVERTER LOGIC ---
function renderColorConverter() {
    // Initial Render of Right Pane Preview
    const r = document.getElementById('rngR').value;
    const g = document.getElementById('rngG').value;
    const b = document.getElementById('rngB').value;
    updateColorUI(r, g, b);
}


function generateColorPalette() {
    const hex = document.getElementById('clrPicker').value;
    const type = document.getElementById('selHarmony') ? document.getElementById('selHarmony').value : 'monochromatic';

    // Helper: Hex to HSL
    const hexToHsl = (H) => {
        let r = 0, g = 0, b = 0;
        if (H.length == 4) { r = "0x" + H[1] + H[1]; g = "0x" + H[2] + H[2]; b = "0x" + H[3] + H[3]; }
        else if (H.length == 7) { r = "0x" + H[1] + H[2]; g = "0x" + H[3] + H[4]; b = "0x" + H[5] + H[6]; }
        r /= 255; g /= 255; b /= 255;
        let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin, h = 0, s = 0, l = 0;
        if (delta == 0) h = 0;
        else if (cmax == r) h = ((g - b) / delta) % 6;
        else if (cmax == g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;
        h = Math.round(h * 60); if (h < 0) h += 360;
        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        return [h, s, l];
    };

    // Helper: HSL to Hex
    const hslToHex = (h, s, l) => {
        let c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2, r = 0, g = 0, b = 0;
        if (0 <= h && h < 60) { r = c; g = x; b = 0; }
        else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
        else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
        else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
        else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
        else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
        r = Math.round((r + m) * 255).toString(16); g = Math.round((g + m) * 255).toString(16); b = Math.round((b + m) * 255).toString(16);
        if (r.length == 1) r = "0" + r; if (g.length == 1) g = "0" + g; if (b.length == 1) b = "0" + b;
        return "#" + r + g + b;
    };

    let [h, s, l] = hexToHsl(hex);
    let colors = [];
    if (type === 'analogous') {
        for (let i = 0; i < 5; i++) colors.push(hslToHex((h + (i * 30)) % 360, s, l));
    } else if (type === 'complementary') {
        colors = [hex, hslToHex((h + 180) % 360, s, l), hslToHex(h, s, Math.max(0, l - 0.2)), hslToHex((h + 180) % 360, s, Math.min(1, l + 0.2)), hslToHex(h, Math.max(0, s - 0.2), l)];
    } else if (type === 'triadic') {
        colors = [hex, hslToHex((h + 120) % 360, s, l), hslToHex((h + 240) % 360, s, l), hslToHex(h, s, Math.max(0, l - 0.2)), hslToHex((h + 120) % 360, s, Math.min(1, l + 0.2))];
    } else {
        // Monochromatic (Default)
        for (let i = 1; i <= 5; i++) colors.push(hslToHex(h, s, Math.max(0, Math.min(1, l + (i - 3) * 0.15))));
    }

    navigator.clipboard.writeText(colors.join(', '));
    showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} Palette Generated!`);
}

function updateColorFromPicker() {
    const hex = document.getElementById('clrPicker').value;
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    updateColorUI(r, g, b);
}

function updateColorFromHex() {
    let hex = document.getElementById('inpHexInput').value;
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    if (hex.length === 6) {
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        updateColorUI(r, g, b);
    }
}

function updateColorFromRGB() {
    const r = parseInt(document.getElementById('rngR').value);
    const g = parseInt(document.getElementById('rngG').value);
    const b = parseInt(document.getElementById('rngB').value);
    updateColorUI(r, g, b);
}

function updateColorUI(r, g, b) {
    if (isNaN(r) || isNaN(g) || isNaN(b)) return;

    // 1. Update Sliders & Labels
    document.getElementById('rngR').value = r; document.getElementById('valR').innerText = r;
    document.getElementById('rngG').value = g; document.getElementById('valG').innerText = g;
    document.getElementById('rngB').value = b; document.getElementById('valB').innerText = b;

    // 2. Compute HEX
    const toHex = (c) => { const x = parseInt(c).toString(16); return x.length == 1 ? "0" + x : x; };
    const hex = "#" + toHex(r) + toHex(g) + toHex(b);

    // 3. Update Inputs
    document.getElementById('clrPicker').value = hex;
    const hexInp = document.getElementById('inpHexInput');
    if (document.activeElement !== hexInp) hexInp.value = hex.substring(1).toUpperCase();

    // 4. Compute HSL & CMYK
    const r1 = r / 255, g1 = g / 255, b1 = b / 255;
    const max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1);
    let h, s, l = (max + min) / 2;
    if (max == min) { h = s = 0; } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r1: h = (g1 - b1) / d + (g1 < b1 ? 6 : 0); break;
            case g1: h = (b1 - r1) / d + 2; break;
            case b1: h = (r1 - g1) / d + 4; break;
        }
        h /= 6;
    }
    const hsl = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    const rgba = `rgba(${r}, ${g}, ${b}, 1)`;

    // CMYK Calc
    let k = 1 - Math.max(r1, g1, b1);
    let c = (1 - r1 - k) / (1 - k) || 0;
    let m = (1 - g1 - k) / (1 - k) || 0;
    let y = (1 - b1 - k) / (1 - k) || 0;
    const cmyk = `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`;

    // 5. Render Creative Preview
    // Calculate contrast text color
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const textColor = luminance > 0.5 ? '#000000' : '#ffffff';
    const textMuted = luminance > 0.5 ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)';

    // Palette Generation (Harmony Support)
    const harmType = document.getElementById('selHarmony') ? document.getElementById('selHarmony').value : 'monochromatic';

    // Reuse Helper: Hex to HSL & Back (Inline to ensure availability)
    const toHexVal = (c) => { const x = Math.round(c).toString(16); return x.length == 1 ? "0" + x : x; };
    const rgbToHsl = (r, g, b) => {
        r /= 255; g /= 255; b /= 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max == min) { h = s = 0; } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [h, s, l];
    };
    const hslToOct = (h, s, l) => {
        let r, g, b;
        if (s == 0) { r = g = b = l; } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1; if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1 / 3);
        }
        return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
    };

    let pH = [], [h0, s0, l0] = rgbToHsl(r, g, b);

    if (harmType === 'analogous') {
        for (let i = -2; i <= 2; i++) pH.push(hslToOct((h0 + (i * 0.08) + 1) % 1, s0, l0));
    } else if (harmType === 'complementary') {
        pH = [hslToOct(h0, s0, Math.max(0, l0 - 0.3)), hslToOct(h0, s0, Math.min(1, l0 + 0.2)),
        `rgb(${r},${g},${b})`,
        hslToOct((h0 + 0.5) % 1, s0, Math.min(1, l0 + 0.2)), hslToOct((h0 + 0.5) % 1, s0, l0)];
    } else if (harmType === 'triadic') {
        pH = [hslToOct((h0 + 0.33) % 1, s0, l0), hslToOct((h0 + 0.33) % 1, s0, Math.min(1, l0 + 0.2)),
        `rgb(${r},${g},${b})`,
        hslToOct((h0 + 0.66) % 1, s0, Math.min(1, l0 + 0.2)), hslToOct((h0 + 0.66) % 1, s0, l0)];
    } else {
        // Monochromatic / Default
        const shade = (amt) => {
            const rr = Math.min(255, Math.max(0, r + amt));
            const gg = Math.min(255, Math.max(0, g + amt));
            const bb = Math.min(255, Math.max(0, b + amt));
            return `rgb(${rr},${gg},${bb})`;
        };
        pH = [shade(-80), shade(-40), `rgb(${r},${g},${b})`, shade(40), shade(80)];
    }

    els.visual.innerHTML = `
    <div class="color-showcase" style="height:100%; display:flex; flex-direction:column; gap:20px; overflow-y:auto; padding-right:5px;">
        <!-- Hero Card -->
        <div class="hero-color-card" style="background:${hex}; color:${textColor};">
            <div class="glass-overlay"></div>
            <div class="color-info-large">
                <span style="font-size:3rem; font-weight:800; letter-spacing:-1px;">${hex}</span>
                <span style="font-size:1rem; opacity:0.8; font-weight:500;">${rgba}</span>
            </div>
            <div class="contrast-badge" style="background:${textColor}; color:${hex};">
                ${luminance > 0.5 ? 'Dark Text' : 'Light Text'}
            </div>
        </div>

        <!-- Palette Strip (${harmType}) -->
        <div class="palette-row">
            <div class="p-swatch" style="background:${pH[0]}" title="Color 1" onclick="navigator.clipboard.writeText('${pH[0]}'); showToast('Copied!')"></div>
            <div class="p-swatch" style="background:${pH[1]}" title="Color 2" onclick="navigator.clipboard.writeText('${pH[1]}'); showToast('Copied!')"></div>
            <div class="p-swatch active" style="background:${pH[2]}" title="Base Color" onclick="navigator.clipboard.writeText('${pH[2]}'); showToast('Copied!')"></div>
            <div class="p-swatch" style="background:${pH[3]}" title="Color 4" onclick="navigator.clipboard.writeText('${pH[3]}'); showToast('Copied!')"></div>
            <div class="p-swatch" style="background:${pH[4]}" title="Color 5" onclick="navigator.clipboard.writeText('${pH[4]}'); showToast('Copied!')"></div>
        </div>

        <!-- Value Grid -->
        <div class="output-grid">
            <div class="code-box-item" onclick="navigator.clipboard.writeText('${hex}'); showToast('HEX Copied')">
                <div class="code-label">HEX</div>
                <div class="code-val">${hex}</div>
                <i class="far fa-copy"></i>
            </div>
            <div class="code-box-item" onclick="navigator.clipboard.writeText('${rgba}'); showToast('RGB Copied')">
                <div class="code-label">RGB</div>
                <div class="code-val">${r}, ${g}, ${b}</div>
                <i class="far fa-copy"></i>
            </div>
            <div class="code-box-item" onclick="navigator.clipboard.writeText('${hsl}'); showToast('HSL Copied')">
                <div class="code-label">HSL</div>
                <div class="code-val">${hsl}</div>
                <i class="far fa-copy"></i>
            </div>
            <div class="code-box-item" onclick="navigator.clipboard.writeText('${cmyk}'); showToast('CMYK Copied')">
                <div class="code-label">CMYK</div>
                <div class="code-val">${cmyk}</div>
                <i class="far fa-copy"></i>
            </div>
        </div>

        <!-- UI Component Mockup -->
        <div class="ui-mockup-section">
            <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:10px;">UI Component Preview</div>
            <div class="mock-card">
                <div class="mock-avatar" style="background:${hex}; color:${textColor}">JD</div>
                <div class="mock-content">
                    <div class="mock-line" style="width:60%;"></div>
                    <div class="mock-line" style="width:40%; opacity:0.5"></div>
                </div>
                <button class="mock-btn" style="background:${hex}; color:${textColor}; box-shadow: 0 4px 12px ${hex}60;">Action</button>
            </div>
        </div>
    </div>
    
    <style>
        .hero-color-card {
            width: 100%; height: 200px; border-radius: 16px; position: relative;
            display: flex; flex-direction: column; justify-content: flex-end; padding: 25px;
            box-shadow: 0 20px 40px -10px rgba(0,0,0,0.2); overflow: hidden;
            transition: all 0.3s ease;
        }
        .glass-overlay {
            position: absolute; top: 0; left: 0; right: 0; height: 50%;
            background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%);
            pointer-events: none;
        }
        .contrast-badge {
            position: absolute; top: 20px; right: 20px;
            padding: 6px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;
            text-transform: uppercase; letter-spacing: 0.5px;
        }
        .color-info-large { display: flex; flex-direction: column; gap: 5px; position: relative; z-index: 10; }
        
        .palette-row { display: flex; height: 60px; gap: 0; border-radius: 12px; overflow: hidden; margin-top: 5px; }
        .p-swatch { flex: 1; height: 100%; cursor: pointer; transition: transform 0.2s; }
        .p-swatch:hover { transform: scale(1.05); z-index: 5; }

        .output-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .code-box-item {
            background: var(--bg-card); border: 1px solid var(--border);
            padding: 15px; border-radius: 12px; cursor: pointer;
            position: relative; transition: all 0.2s; display: flex; flex-direction: column; gap: 5px;
        }
        .code-box-item:hover { border-color: var(--primary); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .code-label { font-size: 0.7rem; color: var(--text-muted); font-weight: 600; letter-spacing: 0.5px; }
        .code-val { font-size: 0.9rem; color: var(--text-main); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .code-box-item i { position: absolute; top: 15px; right: 15px; color: var(--text-muted); opacity: 0; transition: opacity 0.2s; }
        .code-box-item:hover i { opacity: 1; }

        .mock-card {
            background: var(--bg-card); border: 1px solid var(--border);
            padding: 20px; border-radius: 12px; display: flex; align-items: center; gap: 15px;
        }
        .mock-avatar {
            width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
            font-weight: bold; font-size: 0.9rem;
        }
        .mock-content { flex: 1; display: flex; flex-direction: column; gap: 6px; }
        .mock-line { height: 8px; background: var(--bg-sidebar); border-radius: 4px; }
        .mock-btn {
            border: none; padding: 8px 16px; border-radius: 6px; font-size: 0.85rem; font-weight: 600; cursor: default;
        }
    </style>
    `;

    // Update Hidden Output text for legacy Copy All
    els.output.value = `Color Conversion Result:\n\nHEX:  ${hex}\nRGB:  ${r}, ${g}, ${b}\nHSL:  ${hsl}\nCMYK: ${cmyk}`;
}

// Redirect / Initialize Functions
// Redirect / Initialize Functions
function renderColorConverter() {
    // FORCE VISIBILITY: Re-fetch element to ensure we have the live DOM node
    const controls = document.getElementById('colorToolsWrapper');
    if (controls) {
        controls.style.setProperty('display', 'flex', 'important');
    }

    // Only run update if input exists
    if (document.getElementById('inpHexInput')) {
        try {
            updateColorFromHex();
        } catch (e) { console.error('Error updating color:', e); }
    }
}

function renderGlassGenerator() {
    // Placeholder if missing
}

async function runAction(mode) {
    const val = els.input.value; const getPlugins = () => window.prettierPlugins || {};
    if (currentId === 'px-rem' && mode === 'secondary') { isRemToPxMode = !isRemToPxMode; els.input.placeholder = isRemToPxMode ? "Enter REM values..." : "Enter PX values..."; showToast(`Switched mode: ${isRemToPxMode ? "REM → PX" : "PX → REM"} `); return; }
    if (currentId === 'diff-check' && mode === 'secondary') { const currentPos = els.input.selectionStart || els.input.value.length; els.input.value = els.input.value.slice(0, currentPos) + DIFF_SPLIT + els.input.value.slice(currentPos); showToast("Splitter Inserted"); return; }
    if (!val && !['lorem', 'glass-morphism', 'mock-data'].includes(currentId)) return;
    if (mode === 'primary') btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    await new Promise(r => setTimeout(r, 50));
    try {
        let res = "";
        if (currentId === 'glass-morphism') { const code = document.getElementById('glassCode').innerText; navigator.clipboard.writeText(code); showToast("CSS Copied to Clipboard!"); btn.innerHTML = originalText; return; }
        else if (currentId === 'aspect-ratio') { const nums = val.match(/\d+/g); if (!nums || nums.length < 2) throw new Error("Enter Width and Height (e.g. 1920 1080)"); const w = parseInt(nums[0]), h = parseInt(nums[1]); const pad = ((h / w) * 100).toFixed(2); res = `Aspect Ratio: ${w}:${h}\nPadding-Bottom: ${pad}%\n\nCSS:\n.aspect-box {\n  width: 100%;\n  padding-bottom: ${pad}%;\n  position: relative;\n}`; els.visual.innerHTML = `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; flex-direction:column;"><div style="width:200px; height:${(200 * (h / w))}px; background:var(--primary); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:bold; border-radius:4px;">${w}:${h}</div><p style="margin-top:10px; color:var(--text-muted);">Preview Shape</p></div>`; els.visual.style.display = 'block'; els.visual.style.height = 'auto'; els.output.style.display = 'block'; }
        else if (currentId === 'color-conv') {
            // Legacy Color Conv run action - redirect to new UI logic
            renderColorConverter();
            res = els.output.value;
        }
        else if (currentId === 'json-fmt') {
            const obj = JSON.parse(val);
            // If MINIFY button clicked (secondary mode)
            if (mode === 'secondary') {
                res = JSON.stringify(obj);
                els.output.value = res;
                els.output.style.display = 'block';
                els.visual.style.display = 'none';
                updateStats(res, 'output');
                showToast("Minified!");
                btn.innerHTML = originalText;
                return;
            }
            // Otherwise FORMAT (primary mode)
            res = JSON.stringify(obj, null, 4);
            els.visual.innerHTML = syntaxHighlight(res);
            els.visual.style.display = 'block';
            els.visual.style.height = '100%';
            els.output.style.display = 'none';
            switchView('visual');
        }
        else if (currentId === 'json-min') res = JSON.stringify(JSON.parse(val));
        else if (currentId === 'diff-check') { if (!val.includes("======")) throw new Error("Use 'INSERT SPLIT' button"); const parts = val.split("======"); const diff = Diff.diffLines(parts[0].trim(), parts[1].trim()); let f = document.createDocumentFragment(); diff.forEach((p) => { if (p.added || p.removed) { const s = document.createElement('span'); s.className = p.added ? 'diff-added' : 'diff-removed'; s.appendChild(document.createTextNode((p.added ? '+ ' : '- ') + p.value)); f.appendChild(s); } else { const s = document.createElement('span'); s.style.opacity = "0.5"; s.appendChild(document.createTextNode('  ' + p.value)); f.appendChild(s); } }); els.visual.innerHTML = "<pre></pre>"; els.visual.firstChild.appendChild(f); els.visual.style.display = 'block'; els.output.style.display = 'none'; switchView('visual'); }
        else if (currentId === 'jwt-dec') { const parts = val.trim().split('.'); if (parts.length !== 3) throw new Error("Invalid Token"); const decode = (s) => JSON.parse(decodeURIComponent(atob(s.replace(/-/g, '+').replace(/_/g, '/')).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))); res = JSON.stringify({ HEADER: decode(parts[0]), PAYLOAD: decode(parts[1]) }, null, 4); els.visual.innerHTML = syntaxHighlight(res); els.visual.style.display = 'block'; els.visual.style.height = '100%'; els.output.style.display = 'none'; switchView('visual'); }
        else if (currentId === 'px-rem') { const baseSize = 16; const nums = val.match(/[0-9.]+/g); if (!nums) res = "Please enter numbers."; else { const results = nums.map(num => isRemToPxMode ? `${num} rem = ${parseFloat(num) * baseSize} px` : `${num} px = ${parseFloat((parseFloat(num) / baseSize).toFixed(4))} rem`); res = `Mode: ${isRemToPxMode ? 'REM → PX' : 'PX → REM'} (Base: 16px) \n--------------------------\n` + results.join('\n'); } }
        else if (currentId === 'case-conv') { const t = val.trim(); const toCamel = s => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, c) => c.toUpperCase()); const toSnake = s => s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(x => x.toLowerCase()).join('_'); res = `Original: ${t} \nCamel: ${toCamel(t)} \nSnake: ${toSnake(t)} `; }
        else if (currentId === 'html-fmt') res = await prettier.format(val, { parser: "html", plugins: getPlugins() });
        else if (currentId === 'html-min') res = val.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(/\>[\t ]+\</g, "><").replace(/\>[\t ]+$/g, ">");
        else if (currentId === 'html-view') { els.frame.style.display = 'block'; els.output.style.display = 'none'; els.frame.srcdoc = val; btn.innerHTML = originalText; showToast("Preview Loaded"); return; }
        else if (currentId === 'css-fmt') res = await prettier.format(val, { parser: "css", plugins: getPlugins() });
        else if (currentId === 'css-min') res = val.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\n/g, "").replace(/\s+/g, " ").replace(/\s?([:;{}])\s?/g, "$1").replace(/;}/g, "}").trim();
        else if (currentId === 'js-fmt') res = await prettier.format(val, { parser: "babel", plugins: getPlugins() });
        else if (currentId === 'lorem') res = "Lorem ipsum dolor sit amet...";
        else if (currentId === 'sql-fmt') res = window.sqlFormatter.format(val);
        else if (currentId === 'csv-json') res = JSON.stringify(Papa.parse(val, { header: true }).data, null, 2);
        else if (currentId === 'excel-html') { res = excelToHtml(val); els.output.value = res; els.frame.srcdoc = res; }
        else if (currentId === 'base64') res = (mode === 'primary') ? btoa(val) : atob(val);
        else if (currentId === 'url-enc') res = (mode === 'primary') ? encodeURIComponent(val) : decodeURIComponent(val);
        else if (currentId === 'qr-gen') { els.visual.innerHTML = ""; els.visual.style.background = "#fff"; new QRCode(els.visual, { text: val, width: 200, height: 200 }); els.visual.style.display = 'flex'; els.visual.style.justifyContent = 'center'; els.visual.style.alignItems = 'center'; els.output.style.display = 'none'; btn.innerHTML = originalText; showToast("QR Generated!"); return; }
        else if (currentId === 'hash-gen') res = `MD5:    ${CryptoJS.MD5(val)} \nSHA1:   ${CryptoJS.SHA1(val)} \nSHA256: ${CryptoJS.SHA256(val)} `;
        els.output.value = res; updateStats(res, 'output'); if (mode === 'primary' && val && res) showToast("Done!");
    } catch (e) { if (mode === 'primary') { console.error(e); showToast(e.message, true); els.output.value = "Error: " + e.message; } }
    btn.innerHTML = originalText;
}
function handleMenuClick() { if (window.innerWidth <= 900) { toggleMobileSidebar(); } else { toggleSidebarDesktop(); } }
function toggleSidebarDesktop() { els.sidebar.classList.toggle('collapsed'); }
function toggleMobileSidebar() { const isOpen = els.sidebar.classList.contains('open'); if (isOpen) { els.sidebar.classList.remove('open'); els.overlay.classList.remove('show'); } else { els.sidebar.classList.add('open'); els.overlay.classList.add('show'); } }
function formatSize(bytes) { if (bytes === 0) return '0 B'; const k = 1024; const sizes = ['B', 'KB', 'MB']; const i = Math.floor(Math.log(bytes) / Math.log(k)); return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]; }
function updateStats(text, target) { const label = `${text.length.toLocaleString()} chars | ${formatSize(new Blob([text]).size)} `; if (target === 'input') els.inputStats.innerText = label; if (target === 'output') { els.outputStats.innerText = label; els.outputStats.style.display = 'block'; } }
function switchView(type) {
    const toggleVisual = document.getElementById('toggleVisual');
    const toggleCode = document.getElementById('toggleCode');

    if (type === 'visual') {
        if (els.frame) els.frame.style.display = (currentId === 'html-view' || currentId === 'excel-html') ? 'block' : 'none';
        if (currentId === 'json-fmt' || currentId === 'jwt-dec' || currentId === 'glass-morphism' || currentId === 'social-card' || currentId === 'shadow-gen' || currentId === 'color-conv') {
            if (els.visual) els.visual.style.display = 'block';
        }
        if (els.output) els.output.style.display = 'none';
        if (toggleVisual) toggleVisual.style.color = 'var(--primary)';
        if (toggleCode) toggleCode.style.color = 'var(--text-muted)';
    } else {
        if (els.visual) els.visual.style.display = 'none';
        if (els.frame) els.frame.style.display = 'none';
        if (els.output) els.output.style.display = 'block';
        if (toggleCode) toggleCode.style.color = 'var(--primary)';
        if (toggleVisual) toggleVisual.style.color = 'var(--text-muted)';
    }
}
function syntaxHighlight(json) { return '<pre>' + json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match => { let cls = 'json-number'; if (/^"/.test(match)) { cls = /:$/.test(match) ? 'json-key' : 'json-string'; } else if (/true|false/.test(match)) cls = 'json-boolean'; else if (/null/.test(match)) cls = 'json-null'; return '<span class="' + cls + '">' + match + '</span>'; }) + '</pre>'; }
function excelToHtml(d) { let t = '<style>table{border-collapse:collapse;width:100%;font-family:sans-serif;}th,td{border:1px solid #ddd;padding:8px;text-align:left;}th{background-color:#f2f2f2;color:#333}tr:nth-child(even){background-color:#f9f9f9}</style><table>'; d.trim().split('\n').forEach((r, i) => { t += '<tr>'; r.split('\t').forEach(c => t += i === 0 ? `< th > ${c}</th > ` : ` < td > ${c}</td > `); t += '</tr>'; }); return t + '</table>'; }
function copyOutput() { navigator.clipboard.writeText(els.output.value); showToast("Copied!"); }
function pasteInput() { navigator.clipboard.readText().then(t => { els.input.value = t; updateStats(t, 'input'); }); }
function clearAll() { els.input.value = ""; els.output.value = ""; els.visual.innerHTML = ""; els.inputStats.innerText = "0 chars | 0 KB"; }
function downloadOutput() { const blob = new Blob([els.output.value], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `code_export.txt`; a.click(); }
function toggleFullscreen() { els.output.parentElement.parentElement.classList.toggle('fullscreen'); }
function showToast(msg, isError = false) { const t = document.getElementById('toast'); t.innerHTML = `< i class="fas ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'}" ></i > <span>${msg}</span>`; t.className = isError ? "toast show error" : "toast show"; setTimeout(() => t.classList.remove('show'), 3000); }
function closeAllDrawers() { els.sidebar.classList.remove('open'); els.overlay.classList.remove('show'); }

function filterTools(input) {
    const query = input.value.toLowerCase();
    const menu = document.getElementById('menuContainer');
    const items = menu.getElementsByClassName('nav-item');
    const titles = menu.getElementsByClassName('nav-group-title');

    // 1. Filter Items
    for (let item of items) {
        const text = item.innerText.toLowerCase();
        if (text.includes(query)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    }

    // 2. Filter Titles (Hide if no visible children)
    for (let title of titles) {
        let next = title.nextElementSibling;
        let hasVisible = false;
        while (next && !next.classList.contains('nav-group-title')) {
            if (next.classList.contains('nav-item') && next.style.display !== 'none') {
                hasVisible = true;
            }
            next = next.nextElementSibling;
        }
        title.style.display = hasVisible ? 'block' : 'none';
    }
}
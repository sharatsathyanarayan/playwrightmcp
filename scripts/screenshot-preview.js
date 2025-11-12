const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs').promises;

(async () => {
    const outDir = path.resolve(__dirname, '../docs/screenshots');
    try {
        await fs.mkdir(outDir, { recursive: true });
    } catch (err) {
        // mkdir may fail if directory exists or permission issues — log and continue
        console.warn('Could not create screenshots directory:', err.message);
    }

    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
    const filePath = path.resolve(__dirname, '../docs/preview.html');
    const url = 'file://' + filePath;
    console.log('Opening', url);
    await page.goto(url, { waitUntil: 'networkidle' });
    // wait a short time for fonts to load
    await page.waitForTimeout(500);
    const outPath = path.join(outDir, 'preview.png');
    await page.screenshot({ path: outPath, fullPage: true });
    console.log('Saved screenshot to', outPath);
    await browser.close();
})();

const fs = require('fs').promises;
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const cwd = process.cwd();
  const reportPath = path.join(cwd, 'playwright-report', 'index.html');
  const outDir = path.join(cwd, 'docs', 'screenshots');
  const outFile = path.join(outDir, 'playwright-report.png');

  try {
    await fs.mkdir(outDir, { recursive: true });
    if (!require('fs').existsSync(reportPath)) {
      console.error('Report not found at', reportPath);
      process.exit(2);
    }

    const browser = await chromium.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    const fileUrl = 'file://' + reportPath;
    await page.goto(fileUrl, { waitUntil: 'networkidle' });

    // wait for the report root to render
    await page.waitForSelector('#root, .report-root, body', { timeout: 5000 }).catch(() => {});

    // Give a short pause for any client-side rendering
    await page.waitForTimeout(500);

    await page.screenshot({ path: outFile, fullPage: true });
    await browser.close();

    console.log('Saved screenshot to', outFile);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

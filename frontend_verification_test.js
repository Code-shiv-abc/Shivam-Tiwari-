const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function run() {
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 }
  });

  const verificationDir = path.join(process.cwd(), 'verification');
  if (!fs.existsSync(verificationDir)) {
    fs.mkdirSync(verificationDir);
  }

  try {
    console.log("Navigating to project details...");
    await page.goto('http://localhost:3002/projects/cloud-native-transformation', { waitUntil: 'networkidle' });
    // Wait for Next.js to hydrate and framer motion animations to finish
    await page.waitForTimeout(3000);

    const projectDetailsPath = path.join(verificationDir, 'project_details_styled.png');
    await page.screenshot({ path: projectDetailsPath, fullPage: true });
    console.log(`Saved screenshot to ${projectDetailsPath}`);

  } catch (e) {
    console.error("Failed to run playwright:", e);
  } finally {
    await browser.close();
  }
}

run();

const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const filePath = 'file://' + path.resolve(__dirname, '../road-highway.html');
  await page.goto(filePath, { waitUntil: 'networkidle0' });

  // Scroll to the spec section
  await page.evaluate(() => {
    const el = document.querySelector('.service-spec-grid');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });

  await new Promise(r => setTimeout(r, 600));

  // Take desktop resting screenshot
  const specGrid = await page.$('.service-spec-grid');
  if (specGrid) {
    await specGrid.screenshot({ path: path.join(__dirname, 'spec_animated_desktop.png') });
    console.log('Saved spec_animated_desktop.png');
  }

  // Hover over the first feature card
  const firstCard = await page.$('.spec-feature-card');
  if (firstCard) {
    await firstCard.hover();
    await new Promise(r => setTimeout(r, 400));
    await specGrid.screenshot({ path: path.join(__dirname, 'spec_animated_hover.png') });
    console.log('Saved spec_animated_hover.png');
  }

  // Mobile screenshot
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => {
    const el = document.querySelector('.service-spec-grid');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 400));
  const mobileGrid = await page.$('.service-spec-grid');
  if (mobileGrid) {
    await mobileGrid.screenshot({ path: path.join(__dirname, 'spec_animated_mobile.png') });
    console.log('Saved spec_animated_mobile.png');
  }

  await browser.close();
  console.log('Verification screenshots captured!');
})();

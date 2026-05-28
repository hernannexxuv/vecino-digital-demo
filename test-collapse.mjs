import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto('http://localhost:5173/dideco', { waitUntil: 'networkidle0' });
  
  // Resize to 900px (tablet, < 1024px)
  await page.setViewport({ width: 900, height: 800 });
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Get dimensions of grid container inside DidecoDashboard
  const dims = await page.evaluate(() => {
    // The grid is the 3rd child of DidecoDashboard root div
    const grid = document.querySelector('main > div > div > div:nth-child(3)');
    return grid ? { w: grid.clientWidth, h: grid.clientHeight } : null;
  });
  console.log('Grid dimensions at 900px:', dims);
  
  await browser.close();
})();

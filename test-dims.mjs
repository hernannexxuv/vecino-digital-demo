import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  await page.setViewport({ width: 1200, height: 800 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  console.log('Page loaded on desktop viewport');
  
  // Resize to mobile viewport to simulate DevTools opening (docked to right)
  await page.setViewport({ width: 600, height: 800 });
  console.log('Resized to 600px width');
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Get dimensions of main container BEFORE click
  let mainDims = await page.evaluate(() => {
    const el = document.querySelector('main');
    return el ? { w: el.clientWidth, h: el.clientHeight, display: getComputedStyle(el).display } : null;
  });
  console.log('BEFORE click main dims:', mainDims);
  
  // Click overlay
  await page.mouse.click(300, 400);
  console.log('Clicked overlay');
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Get dimensions of main container AFTER click
  mainDims = await page.evaluate(() => {
    const el = document.querySelector('main');
    return el ? { w: el.clientWidth, h: el.clientHeight, display: getComputedStyle(el).display } : null;
  });
  console.log('AFTER click main dims:', mainDims);
  
  await browser.close();
})();

import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  // Start with desktop viewport
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  console.log('Page loaded on desktop viewport');
  
  // Resize to mobile viewport to simulate DevTools opening
  await page.setViewport({ width: 600, height: 800 });
  console.log('Resized to mobile viewport');
  
  // Wait a bit
  await new Promise(r => setTimeout(r, 1000));
  
  // Click at coordinate (300, 400) which should be on the overlay
  await page.mouse.click(300, 400);
  console.log('Clicked on the screen');
  
  // Wait a bit to see if there are any errors or if content disappears
  await new Promise(r => setTimeout(r, 1000));
  
  // Check if main content is visible
  const html = await page.content();
  if (html.includes('Plataforma GovTech')) {
    console.log('Main content is still visible');
  } else {
    console.log('Main content disappeared! HTML length:', html.length);
  }
  
  await browser.close();
})();

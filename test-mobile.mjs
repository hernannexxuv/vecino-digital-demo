import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  console.log('Page loaded on desktop viewport');
  
  // Enable mobile emulation
  await page.emulate({
    viewport: {
      width: 375,
      height: 667,
      isMobile: true,
      hasTouch: true
    },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
  });
  console.log('Mobile emulation enabled');
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Click on the screen
  await page.mouse.click(200, 300);
  console.log('Clicked screen');
  
  await new Promise(r => setTimeout(r, 1000));
  
  const html = await page.content();
  console.log('HTML length:', html.length);
  if (!html.includes('Plataforma GovTech')) {
    console.log('Content disappeared!');
  } else {
    console.log('Content is still there');
  }
  
  await browser.close();
})();

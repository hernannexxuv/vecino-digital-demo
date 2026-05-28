import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  // Resize to 600px width (simulating DevTools docked to side)
  await page.setViewport({ width: 600, height: 800 });
  await new Promise(r => setTimeout(r, 1000));
  
  await page.screenshot({ path: 'before_click.png' });
  console.log('Saved before_click.png');
  
  // Click on the overlay (center of screen)
  await page.mouse.click(300, 400);
  
  await new Promise(r => setTimeout(r, 1000));
  
  await page.screenshot({ path: 'after_click.png' });
  console.log('Saved after_click.png');
  
  await browser.close();
})();

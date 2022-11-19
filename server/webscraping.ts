import puppeteer from 'puppeteer';

async function webscrape(params: string): Promise<string> {
  const browser = await puppeteer.launch({
    'args' : [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  const page = await browser.newPage();
  
  const URL:string = `https://www.bing.com/images/search?q=${params}&qft=+filterui%3aimagesize-large&form=AWIR&first=1&tsc=ImageHoverTitle`;
  await page.goto(URL);
  await page.waitForSelector('img.mimg');
  const imgUrl:string = await page.evaluate(() => {
    const imageEl = document.querySelector('img.mimg') as HTMLImageElement;
    return imageEl.getAttribute('src') as string;
  });
  
  await browser.close();
  return imgUrl;
}

export default webscrape;


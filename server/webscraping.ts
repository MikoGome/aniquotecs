import puppeteer from 'puppeteer';

async function webscrape(params: string): Promise<string> {
  console.log(params);
  const browser = await puppeteer.launch({
    'args' : [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  const page = await browser.newPage();
  
  const URL:string =  `https://www.bing.com/images/search?q=${params}&qs=n&form=QBIR&qft=+filterui%3Aimagesize-large+filterui%3Aphoto-transparent&sp=-1&pq=${params}&sc=0-27&cvid=900E0B8009244C0DA2F10FC844099845&ghsh=0&ghacc=0&first=1&tsc=ImageHoverTitle&cw=1177&ch=920`;
  await page.goto(URL);
  // await page.waitForSelector('img.mimg');
  const imgUrl:string = await page.evaluate(() => {
    const imageEl = document.querySelector('img.mimg') as HTMLImageElement;
    return imageEl.getAttribute('src') as string;
  });
  
  await browser.close();
  return imgUrl;
}

export default webscrape;


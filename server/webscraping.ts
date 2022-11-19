import puppeteer from 'puppeteer';

async function webscrape(params: string): Promise<string> {
  const browser = await puppeteer.launch({
    'args' : [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  const page = await browser.newPage();
  
  const URL:string =  `https://www.google.com/search?q=${params}&sxsrf=ALiCzsZZMmZeyExPb_rUvhzUt89XmXM0jw:1668859139397&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiE_7vhmLr7AhVXJUQIHWHfAzYQ_AUoAXoECAIQAw&biw=1920&bih=937&dpr=1`;
  console.log(URL);
  await page.goto(URL);
  await page.waitForSelector('img.rg_i');
  page.click('img.rg_i');
  await page.waitForSelector('.pxAole div.v4dQwb img');
  const imgUrl:string = await page.evaluate(() => {
    const imageEl = document.querySelector('.pxAole div.v4dQwb img') as HTMLImageElement;
    return imageEl.getAttribute('src') as string;
  });
  
  await browser.close();
  return imgUrl;
}

export default webscrape;


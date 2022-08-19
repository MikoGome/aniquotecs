import puppeteer from 'puppeteer';

async function webscrape(params: string): Promise<string> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const URL = `https://www.google.com/search?q=${params}&sxsrf=ALiCzsZCha0uJqjiuzH3sLIuBD-ZIhLQfw:1660941518663&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjboNmp4dP5AhVxKkQIHXLEC-IQ_AUoAXoECAIQAw`;
  await page.goto(URL);
  const imgUrl:string = await page.evaluate(() => {
    const imageEl = document.querySelector('.rg_i') as HTMLImageElement;
    return imageEl.getAttribute('src') as string;
  });
  
  await browser.close();
  return imgUrl;
}

export default webscrape;


const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

async function TiktokDownloader(Url) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  try {
    await page.goto("https://ttdownloader.com/");
    await page.type("#url", Url);
    await page.click("#submit");
    await page.waitForSelector("#results-list");

    const results = await page.evaluate(() => {
      return {
        nowatermark: document.querySelector("#results-list > div:nth-child(2) a").href,
        watermark: document.querySelector("#results-list > div:nth-child(3) a").href,
        audio: document.querySelector("#results-list > div:nth-child(4) a").href,
      };
    });

    await browser.close();
    return results;
  } catch (err) {
    await browser.close();
    throw err;
  }
}

module.exports = { TiktokDownloader };

const puppeteer = require("puppeteer");

async function TiktokDownloader(Url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto("https://ttdownloader.com/");
    await page.type("#url", Url); // Isi URL video di form
    await page.click("#submit"); // Klik tombol unduh
    await page.waitForSelector("#results-list"); // Tunggu hasil muncul

    // Ambil hasil unduhan
    const results = await page.evaluate(() => {
      return {
        nowatermark: document
          .querySelector("#results-list > div:nth-child(2) a")
          .href,
        watermark: document
          .querySelector("#results-list > div:nth-child(3) a")
          .href,
        audio: document
          .querySelector("#results-list > div:nth-child(4) a")
          .href,
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

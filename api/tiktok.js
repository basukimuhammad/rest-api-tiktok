const axios = require("axios");
const cheerio = require("cheerio");

// Fungsi TikTok downloader
async function TiktokDownloader(Url) {
  return new Promise(async (resolve, reject) => {
    await axios
      .get("https://ttdownloader.com/", {
        headers: {
          "accept":
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
        },
      })
      .then((respon) => {
        const $ = cheerio.load(respon.data);
        const token = $("#token").attr("value"); // Ambil token dari halaman

        axios
          .post(
            "https://ttdownloader.com/req/",
            new URLSearchParams({
              url: Url,
              format: "",
              token: token,
            }),
            {
              headers: {
                "content-type": "application/x-www-form-urlencoded",
                "user-agent":
                  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
              },
            }
          )
          .then((res) => {
            const ch = cheerio.load(res.data);
            const result = {
              nowatermark: ch("#results-list > div:nth-child(2) a").attr("href"),
              watermark: ch("#results-list > div:nth-child(3) a").attr("href"),
              audio: ch("#results-list > div:nth-child(4) a").attr("href"),
            };
            resolve(result);
          })
          .catch(reject);
      })
      .catch(reject);
  });
}

module.exports = { TiktokDownloader };

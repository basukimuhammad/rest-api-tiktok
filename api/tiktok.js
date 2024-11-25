const axios = require("axios");

async function TiktokDownloader(Url) {
  return new Promise(async (resolve, reject) => {
    try {
      // Kirim permintaan POST langsung ke endpoint target tanpa token
      const response = await axios.post(
        "https://ttdownloader.com/req/",
        new URLSearchParams({
          url: Url, // URL video
          format: "", // Format kosong untuk default
        }),
        {
          headers: {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,id;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "user-agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
            // Tambahkan cookie jika perlu, atau hapus jika tidak diperlukan
          },
        }
      );

      const result = response.data; // Data respons
      resolve(result);
    } catch (err) {
      reject(err.response ? err.response.data : err.message); // Tangkap error
    }
  });
}

module.exports = { TiktokDownloader };


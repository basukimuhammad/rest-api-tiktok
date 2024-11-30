const axios = require("axios");

function downloadTikTokVideo(url) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!url || !/^https:\/\/(www\.|vm\.|m\.)?tiktok\.com\//.test(url)) {
        return reject("URL TikTok tidak valid. Masukkan URL yang benar.");
      }

      const response = await axios({
        method: "POST",
        url: "https://tikwm.com/api/",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Cookie": "current_language=en",
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
        },
        data: new URLSearchParams({
          url, // Masukkan URL video TikTok
          hd: 1, // Mendapatkan video dalam kualitas HD jika tersedia
        }).toString(),
      });

      const { data } = response;
      if (!data || !data.data) {
        return reject("Gagal mendapatkan data video. Coba lagi nanti.");
      }

      const videoData = data.data;
      const result = {
        title: videoData.title || "Tidak ada judul",
        cover: videoData.cover || null, // URL thumbnail video
        no_watermark: videoData.play || null, // URL video tanpa watermark
        watermark: videoData.wmplay || null, // URL video dengan watermark
        music: videoData.music || null, // URL musik dari video
        author: {
          username: videoData.author.name || "Tidak ada nama pengguna",
          avatar: videoData.author.avatar || null, // URL avatar pengguna
        },
      };

      resolve(result);
    } catch (error) {
      reject(`Error: ${error.message || "Gagal memproses permintaan."}`);
    }
  });
}

module.exports = {
  downloadTikTokVideo,
};

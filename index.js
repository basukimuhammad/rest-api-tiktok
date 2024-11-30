const path = require("path");
const Fastify = require("fastify");
const { downloadTikTokVideo } = require("./api/tiktok.js"); // Ganti `tiktoks` dengan `downloadTikTokVideo`

const app = Fastify({ logger: true });

// Endpoint utama
app.get("/", async (req, res) => {
  res.send("Selamat datang di API TikTok Downloader By Basuki! Gunakan /tiktok?url={url_tiktok}");
});

// Endpoint TikTok downloader
app.get("/tiktok", async (req, res) => {
  const url = req.query.url; // Mendapatkan parameter `url`

  if (!url) {
    return res.status(400).send({
      status: "error",
      message: "Parameter URL tidak ditemukan! Gunakan ?url={url_tiktok}",
    });
  }

  try {
    const result = await downloadTikTokVideo(url); // Memanggil fungsi downloadTikTokVideo
    res.send({
      status: "success",
      creator: "Basuki",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Gagal mendapatkan video TikTok. Coba lagi nanti.",
      error: error.message,
    });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server berjalan di: http://localhost:${port}`);
});

const path = require("path");
const Fastify = require("fastify");
const { TiktokDownloader } = require("./api/tiktok.js"); // Import fungsi TikTok downloader

const app = Fastify({
  logger: true,
});

// Konfigurasi file statis
app.register(require("@fastify/static"), {
  root: path.join(__dirname, "api"), // Folder 'api' berisi file statis
  prefix: "/static/", // Tambahkan prefix untuk file statis
});

// Endpoint utama
app.get("/", async (req, res) => {
  res.send(
    "Selamat datang di API TikTok Downloader! Gunakan endpoint /tiktok?url={link_video} untuk mengunduh video TikTok."
  );
});

// Endpoint TikTok downloader
app.get("/tiktok", async (req, res) => {
  const videoUrl = req.query.url; // Ambil URL dari query parameter

  if (!videoUrl) {
    return res.status(400).send({
      status: "error",
      message: "URL video TikTok tidak ditemukan! Gunakan parameter ?url={link_video}",
    });
  }

  try {
    const hasil = await TiktokDownloader(videoUrl); // Panggil fungsi downloader
    res.send({
      status: "success",
      data: hasil,
    });
  } catch (error) {
    console.error(`Error in API /tiktok: ${error.message}`); // Log error API
    res.status(500).send({
      status: "error",
      message: "Gagal mengunduh video. Coba lagi nanti.",
      error: error.message,
    });
  }
});

// Menentukan port server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});

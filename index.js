import path from "path";
import Fastify from "fastify";
const { TiktokDownloader } = require("./api/tiktok.js");

const app = Fastify({ logger: true });

// Konfigurasi file statis (opsional)
app.register(require("@fastify/static"), {
    root: path.join(__dirname, "static"), // Folder 'static' berisi file statis
    prefix: "/static/", // Prefix untuk akses file
});

// Endpoint utama
app.get("/", async (req, res) => {
    res.send("Selamat datang di API TikTok Downloader! Gunakan /tiktok?url={link_video}");
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
    console.log(`Server berjalan di: http://localhost:${port}`);
});

import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(__filename);
import Fastify from "fastify";
import { TiktokDownloader } from "./api/timeApi.js"; // Impor fungsi downloader

const app = Fastify({ logger: true });

// Konfigurasi file statis (opsional)
app.register(require("@fastify/static"), {
    root: path.join(__dirname, "static"),
    prefix: "/static/",
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

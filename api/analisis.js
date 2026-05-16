const fetch = require('node-fetch');

// Konfigurasi Repositori GitHub Kamu
const GITHUB_USER = 'jerryst21'; // ◄ UBAH dengan username GitHub kamu
const GITHUB_REPO = 'inijolink';         // ◄ UBAH dengan nama repositori kamu
const FILE_PATH = 'inijo2023/financedata.json';

module.exports = async (req, res) => {
    // Hanya menerima request bertipe POST
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Metode tidak diizinkan. Gunakan POST.' });
    }

    try {
        const { pin, dataBaru } = req.body;

        // 1. Validasi PIN dari Environment Variable Vercel
        if (!pin || pin !== process.env.DASHBOARD_PIN) {
            return res.status(401).json({ success: false, message: 'PIN Akses Salah atau Tidak Valid!' });
        }

        // 2. Cek ketersediaan Token GitHub di Vercel
        const token = process.env.GITHUB_PAT;
        if (!token) {
            return res.status(500).json({ success: false, message: 'Konfigurasi Server Error: GITHUB_PAT belum diatur di Vercel.' });
        }

        const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${FILE_PATH}`;
        const headers = {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Vercel-Serverless-Proxy'
        };

        // 3. Ambil file JSON yang ada di GitHub saat ini untuk mendapatkan SHA (wajib di GitHub API) dan data lama
        const responseGet = await fetch(url, { headers });
        
        let currentData = [];
        let sha = null;

        if (responseGet.status === 200) {
            const fileInfo = await responseGet.json();
            sha = fileInfo.sha;
            // Decode base64 dari GitHub ke teks biasa, lalu parse ke JSON array
            const contentText = Buffer.from(fileInfo.content, 'base64').toString('utf-8');
            currentData = JSON.parse(contentText);
        } else if (responseGet.status !== 404) {
            return res.status(responseGet.status).json({ success: false, message: 'Gagal mengambil data lama dari GitHub.' });
        }

        // 4. Selipkan/Tambahkan data baru ke dalam list array
        currentData.push(dataBaru);

        // 5. Encode kembali data menjadi format JSON string yang rapi dan ubah ke Base64
        const updatedContentStr = JSON.stringify(currentData, null, 2);
        const contentBase64 = Buffer.from(updatedContentStr).toString('base64');

        // 6. Kirim data yang sudah diperbarui kembali ke GitHub (Commit otomatis)
        const commitPayload = {
            message: `Pembaruan otomatis data keuangan bulan ${dataBaru.bulan} via Admin Dashboard`,
            content: contentBase64,
            branch: 'main'
        };

        // Jika file sudah ada sebelumnya, sertakan SHA agar GitHub tahu ini adalah update, bukan file baru tabrakan
        if (sha) {
            commitPayload.sha = sha;
        }

        const responsePut = await fetch(url, {
            method: 'PUT',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commitPayload)
        });

        if (responsePut.status === 200 || responsePut.status === 201) {
            return res.status(200).json({ success: true, message: `Data bulan ${dataBaru.bulan} berhasil disimpan dan di-commit ke GitHub!` });
        } else {
            const errorDetails = await responsePut.json();
            return res.status(responsePut.status).json({ success: false, message: 'Gagal melakukan commit ke GitHub.', error: errorDetails });
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Terjadi kesalahan pada internal server API Vercel.', error: error.message });
    }
};

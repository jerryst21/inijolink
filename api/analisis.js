const fetch = require('node-fetch');

// Konfigurasi Repositori GitHub Kamu
const GITHUB_USER = 'jerryst21'; 
const GITHUB_REPO = 'inijolink';  
const FILE_PATH = 'inijo2023/financedata.json';

module.exports = async (req, res) => {
    const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${FILE_PATH}`;
    const token = process.env.GITHUB_PAT;

    if (!token) {
        return res.status(500).json({ success: false, message: 'Konfigurasi Server Error: GITHUB_PAT belum diatur di Vercel.' });
    }

    const headers = {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Vercel-Serverless-Proxy'
    };

    // ALUR 1: JIKA USER MAU MENGAMBIL DATA (GET)
    if (req.method === 'GET') {
        try {
            const responseGet = await fetch(url, { headers });
            if (responseGet.status === 200) {
                const fileInfo = await responseGet.json();
                const contentText = Buffer.from(fileInfo.content, 'base64').toString('utf-8');
                return res.status(200).json({ success: true, data: JSON.parse(contentText) });
            } else {
                return res.status(responseGet.status).json({ success: false, message: 'Gagal mengambil data.' });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    // ALUR 2: JIKA USER MAU MENYIMPAN DATA EDITAN (POST)
    if (req.method === 'POST') {
        try {
            const { pin, dataSemua } = req.body;

            // Validasi PIN
            if (!pin || pin !== process.env.DASHBOARD_PIN) {
                return res.status(401).json({ success: false, message: 'PIN Akses Salah atau Tidak Valid!' });
            }

            // Ambil SHA file lama terlebih dahulu (wajib di GitHub API agar tidak tabrakan)
            const responseGet = await fetch(url, { headers });
            let sha = null;
            if (responseGet.status === 200) {
                const fileInfo = await responseGet.json();
                sha = fileInfo.sha;
            }

            // Encode seluruh array data editan baru dari user ke Base64
            const updatedContentStr = JSON.stringify(dataSemua, null, 2);
            const contentBase64 = Buffer.from(updatedContentStr).toString('base64');

            const commitPayload = {
                message: `Update massal data finansial via Admin Editor Dashboard`,
                content: contentBase64,
                branch: 'main'
            };
            if (sha) commitPayload.sha = sha;

            // Kirim / Timpa data ke GitHub
            const responsePut = await fetch(url, {
                method: 'PUT',
                headers: { ...headers, 'Content-Type': 'application/json' },
                body: JSON.stringify(commitPayload)
            });

            if (responsePut.status === 200 || responsePut.status === 201) {
                return res.status(200).json({ success: true, message: 'Semua perubahan data berhasil disimpan!' });
            } else {
                return res.status(responsePut.status).json({ success: false, message: 'Gagal melakukan commit perubahan.' });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    return res.status(405).json({ success: false, message: 'Metode tidak diizinkan.' });
};

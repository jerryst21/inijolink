// api/clipboard.js

export default async function handler(req, res) {
  // Konfigurasi Repositori GitHub Kamu (Hardcoded sesuai request)
  const GITHUB_USER = 'jerryst21'; 
  const GITHUB_REPO = 'inijolink';  
  const FILE_PATH = 'clipboard/text.json';

  // Token keamanan tetap diambil dari environment variable Vercel
  const token = process.env.GITHUB_PAT;

  if (!token) {
    return res.status(500).json({ error: "Missing GITHUB_PAT environment variable in Vercel." });
  }

  // Konstruksi URL API GitHub berdasarkan konfigurasi baru
  const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${FILE_PATH}`;
  
  const headers = {
    Authorization: `token ${token}`,
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Cloud-Clipboard-App",
  };

  // ------------------------------------
  // METODE: GET (Membaca data clipboard)
  // ------------------------------------
  if (req.method === "GET") {
    try {
      const response = await fetch(url, { headers });
      
      if (response.status === 404) {
        return res.status(200).json([]); // Jika folder/file belum ada, return array kosong
      }

      const data = await response.json();
      const content = Buffer.from(data.content, "base64").toString("utf-8");
      return res.status(200).json(JSON.parse(content));
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // ------------------------------------
  // METODE: POST (Mengupdate data clipboard)
  // ------------------------------------
  if (req.method === "POST") {
    try {
      const { items } = req.body;
      if (!Array.isArray(items)) {
        return res.status(400).json({ error: "Format data tidak valid. Harus berupa array." });
      }

      // Membatasi maksimum 100 item sesuai kesepakatan PRD agar performa terjaga
      const limitedItems = items.slice(0, 100);

      // Ambil SHA file terbaru terlebih dahulu untuk menghindari konflik overwrite di GitHub
      const getResponse = await fetch(url, { headers });
      let sha = null;
      if (getResponse.status !== 404) {
        const getData = await getResponse.json();
        sha = getData.sha;
      }

      const fileContent = JSON.stringify(limitedItems, null, 2);
      const base64Content = Buffer.from(fileContent).toString("base64");

      const putResponse = await fetch(url, {
        method: "PUT",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "update clipboard data via Vercel Function",
          content: base64Content,
          sha: sha || undefined, // SHA wajib dikirim jika file sudah ada untuk update data
        }),
      });

      if (!putResponse.ok) {
        const errData = await putResponse.json();
        return res.status(putResponse.status).json({ error: errData.message });
      }

      return res.status(200).json({ success: true, items: limitedItems });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: "Method tidak diizinkan" });
}

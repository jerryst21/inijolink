// api/clipboard.js

export default async function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return res.status(500).json({ 
      error: "Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variable in Vercel." 
    });
  }

  const url = `${supabaseUrl}/rest/v1/clipboards`;
  const headers = {
    "apikey": supabaseAnonKey,
    "Authorization": `Bearer ${supabaseAnonKey}`,
    "Content-Type": "application/json",
  };

  // ------------------------------------
  // METODE: GET (Membaca data)
  // ------------------------------------
  if (req.method === "GET") {
    try {
      const response = await fetch(`${url}?order=created_at.desc`, {
        method: "GET",
        headers: headers
      });

      if (!response.ok) {
        const errData = await response.json();
        return res.status(response.status).json({ error: errData.message });
      }

      const data = await response.json();
      const mappedItems = data.map(item => ({
        id: item.id,
        text: item.text,
        pinned: item.pinned,
        createdAt: item.created_at
      }));

      return res.status(200).json(mappedItems);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // ------------------------------------
  // METODE: POST (Menyimpan / Sinkronisasi Data)
  // ------------------------------------
  if (req.method === "POST") {
    try {
      // FIX 1: Deteksi otomatis apakah data berupa array langsung atau objek { items }
      let items = [];
      if (Array.isArray(req.body)) {
        items = req.body;
      } else if (req.body && Array.isArray(req.body.items)) {
        items = req.body.items;
      } else {
        return res.status(400).json({ error: "Format data tidak valid. Harus berupa array." });
      }

      const limitedItems = items.slice(0, 100);

      // LANGKAH 1: Kosongkan data lama di Supabase (No History)
      const deleteResponse = await fetch(url, {
        method: "DELETE",
        headers: headers
      });

      if (!deleteResponse.ok) {
        const errData = await deleteResponse.json();
        return res.status(deleteResponse.status).json({ error: "Gagal membersihkan data lama: " + errData.message });
      }

      if (limitedItems.length === 0) {
        return res.status(200).json([]);
      }

      // LANGKAH 2: Format ulang data agar sesuai dengan kolom Supabase
      const rowsToInsert = limitedItems.map(item => {
        const row = {
          text: item.text,
          pinned: item.pinned === true
        };

        // FIX 2: Jangan kirim ID teks bawaan frontend agar tidak merusak tipe data UUID di Supabase.
        // Biarkan database Supabase menggenerasikannya secara otomatis demi keamanan ekstra.
        
        // Cek jika ada tanggal bawaan yang valid, gunakan tanggal tersebut
        if (item.createdAt && !isNaN(Date.parse(item.createdAt))) {
          row.created_at = item.createdAt;
        }

        return row;
      });

      // LANGKAH 3: Masukkan data baru secara massal
      const insertResponse = await fetch(url, {
        method: "POST",
        headers: {
          ...headers,
          "Prefer": "return=representation"
        },
        body: JSON.stringify(rowsToInsert)
      });

      if (!insertResponse.ok) {
        const errData = await insertResponse.json();
        return res.status(insertResponse.status).json({ error: "Gagal menyimpan data baru: " + errData.message });
      }

      const insertedData = await insertResponse.json();

      // Urutkan kembali data terbaru untuk dikembalikan ke frontend
      const savedItems = insertedData
        .map(item => ({
          id: item.id,
          text: item.text,
          pinned: item.pinned,
          createdAt: item.created_at
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Kembalikan data dalam bentuk Array langsung agar index.html tidak bingung
      return res.status(200).json(savedItems);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: "Method tidak diizinkan" });
}

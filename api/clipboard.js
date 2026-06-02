// api/clipboard.js

export default async function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  // Validasi konfigurasi environment variables di Vercel
  if (!supabaseUrl || !supabaseAnonKey) {
    return res.status(500).json({ 
      error: "Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variable in Vercel." 
    });
  }

  // Base URL untuk tabel 'clipboards' di Supabase REST API
  const url = `${supabaseUrl}/rest/v1/clipboards`;

  // Header standar untuk otentikasi aman Supabase via Anon Key
  const headers = {
    "apikey": supabaseAnonKey,
    "Authorization": `Bearer ${supabaseAnonKey}`,
    "Content-Type": "application/json",
  };

  // ------------------------------------
  // METODE: GET (Membaca data dari Supabase)
  // ------------------------------------
  if (req.method === "GET") {
    try {
      // Mengambil data murni diurutkan berdasarkan tanggal terbaru (created_at)
      const response = await fetch(`${url}?order=created_at.desc`, {
        method: "GET",
        headers: headers
      });

      if (!response.ok) {
        const errData = await response.json();
        return res.status(response.status).json({ error: errData.message });
      }

      const data = await response.json();

      // Format ulang data agar sesuai dengan struktur nama variabel yang dikenali oleh index.html
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
  // METODE: POST (Sinkronisasi Data Baru / Hapus Permanen)
  // ------------------------------------
  if (req.method === "POST") {
    try {
      const { items } = req.body;
      if (!Array.isArray(items)) {
        return res.status(400).json({ error: "Format data tidak valid. Harus berupa array." });
      }

      // Batasi maksimal 100 item untuk menjaga optimasi performa
      const limitedItems = items.slice(0, 100);

      // LANGKAH 1: Hapus seluruh data lama secara permanen (Sesuai keinginan: No History!)
      // RLS Policy yang kita buat sebelumnya mengizinkan penghapusan massal tanpa filter.
      const deleteResponse = await fetch(url, {
        method: "DELETE",
        headers: headers
      });

      if (!deleteResponse.ok) {
        const errData = await deleteResponse.json();
        return res.status(deleteResponse.status).json({ error: "Gagal membersihkan data lama: " + errData.message });
      }

      // Jika data yang dikirim kosong (misal sehabis klik Clear All), langsung selesai
      if (limitedItems.length === 0) {
        return res.status(200).json({ success: true, items: [] });
      }

      // LANGKAH 2: Format ulang data dari frontend agar siap masuk ke kolom tabel Supabase
      const rowsToInsert = limitedItems.map(item => {
        const row = {
          text: item.text,
          pinned: item.pinned === true
        };
        // Jika ID bawaan frontend bukan format ID sementara 'id-xxx', kita pertahankan ID-nya
        if (item.id && !item.id.startsWith('id-')) {
          row.id = item.id;
        }
        if (item.createdAt) {
          row.created_at = item.createdAt;
        }
        return row;
      });

      // LANGKAH 3: Mass-insert data baru ke database Supabase
      const insertResponse = await fetch(url, {
        method: "POST",
        headers: {
          ...headers,
          "Prefer": "return=representation" // Meminta Supabase mengembalikan data yang sukses disimpan
        },
        body: JSON.stringify(rowsToInsert)
      });

      if (!insertResponse.ok) {
        const errData = await insertResponse.json();
        return res.status(insertResponse.status).json({ error: "Gagal menyimpan data baru: " + errData.message });
      }

      const insertedData = await insertResponse.json();

      // Kembalikan format data ke frontend dalam urutan tanggal terbaru
      const savedItems = insertedData
        .map(item => ({
          id: item.id,
          text: item.text,
          pinned: item.pinned,
          createdAt: item.created_at
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return res.status(200).json({ success: true, items: savedItems });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: "Method tidak diizinkan" });
}

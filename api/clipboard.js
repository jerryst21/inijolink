// api/clipboard.js

export default async function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return res.status(500).json({ error: "Missing environment variables di Vercel" });
  }

  const url = `${supabaseUrl}/rest/v1/clipboards`;
  const headers = {
    "apikey": supabaseAnonKey,
    "Authorization": `Bearer ${supabaseAnonKey}`,
    "Content-Type": "application/json",
  };

  // ------------------------------------
  // METODE: GET
  // ------------------------------------
  if (req.method === "GET") {
    try {
      const response = await fetch(`${url}?order=created_at.desc`, {
        method: "GET",
        headers: headers
      });

      if (!response.ok) {
        const errText = await response.text();
        return res.status(response.status).json({ error: "Supabase GET Error", details: errText });
      }

      const data = await response.json();
      
      // Memastikan data terpetakan dengan benar dari kolom database Supabase
      const mappedItems = data.map(item => ({
        id: item.id,
        text: item.text || "",
        pinned: item.pinned || false,
        createdAt: item.created_at || new Date().toISOString()
      }));

      return res.status(200).json(mappedItems);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // ------------------------------------
  // METODE: POST
  // ------------------------------------
  if (req.method === "POST") {
    try {
      let items = [];
      if (Array.isArray(req.body)) {
        items = req.body;
      } else if (req.body && Array.isArray(req.body.items)) {
        items = req.body.items;
      } else {
        return res.status(400).json({ error: "Format data salah. Harus berupa array." });
      }

      const limitedItems = items.slice(0, 100);

      // FIX UTAMA: Menambahkan '?id=not.is.null' sebagai klausa WHERE tiruan.
      // Ini memerintahkan Supabase menghapus semua baris yang memiliki ID (alias seluruh data di tabel).
      const deleteResponse = await fetch(`${url}?id=not.is.null`, {
        method: "DELETE",
        headers: headers
      });

      if (!deleteResponse.ok) {
        const errText = await deleteResponse.text();
        return res.status(deleteResponse.status).json({ error: "Gagal membersihkan data lama", details: errText });
      }

      if (limitedItems.length === 0) {
        return res.status(200).json([]);
      }

      const rowsToInsert = limitedItems.map(item => ({
        text: item.text || "",
        pinned: item.pinned === true,
        ...(item.createdAt && !isNaN(Date.parse(item.createdAt)) ? { created_at: item.createdAt } : {})
      }));

      const insertResponse = await fetch(url, {
        method: "POST",
        headers: {
          ...headers,
          "Prefer": "return=representation"
        },
        body: JSON.stringify(rowsToInsert)
      });

      if (!insertResponse.ok) {
        const errText = await insertResponse.text();
        return res.status(insertResponse.status).json({ error: "Gagal menyimpan data baru", details: errText });
      }

      const insertedData = await insertResponse.json();
      const savedItems = insertedData
        .map(item => ({
          id: item.id,
          text: item.text,
          pinned: item.pinned,
          createdAt: item.created_at
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Mengembalikan data yang dibungkus dalam objek 'items' dan status 'success'
      return res.status(200).json({ 
        success: true, 
        items: savedItems 
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: "Method tidak diizinkan" });
}

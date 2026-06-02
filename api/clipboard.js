// api/clipboard.js

export default async function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  // 1. Debugging Environment Variables
  if (!supabaseUrl || !supabaseAnonKey) {
    return res.status(500).json({ 
      error: "Missing environment variables di Vercel",
      debug: { 
        hasUrl: !!supabaseUrl, 
        hasKey: !!supabaseAnonKey 
      }
    });
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
        return res.status(response.status).json({ 
          error: "Supabase GET Error", 
          supabaseRawMessage: errText 
        });
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
      return res.status(500).json({ error: "Crash di GET handler", message: error.message });
    }
  }

  // ------------------------------------
  // METODE: POST
  // ------------------------------------
  if (req.method === "POST") {
    try {
      // 2. Debugging Data dari Frontend (index.html)
      let items = [];
      if (Array.isArray(req.body)) {
        items = req.body;
      } else if (req.body && Array.isArray(req.body.items)) {
        items = req.body.items;
      } else {
        return res.status(400).json({ 
          error: "Format data salah. Bukan array.", 
          receivedBody: req.body 
        });
      }

      const limitedItems = items.slice(0, 100);

      // LANGKAH 1: Hapus data lama (DELETE)
      const deleteResponse = await fetch(url, {
        method: "DELETE",
        headers: headers
      });

      if (!deleteResponse.ok) {
        const errText = await deleteResponse.text();
        return res.status(deleteResponse.status).json({ 
          error: "Gagal membersihkan data lama (DELETE)", 
          supabaseStatus: deleteResponse.status,
          supabaseRawMessage: errText 
        });
      }

      if (limitedItems.length === 0) {
        return res.status(200).json([]);
      }

      // LANGKAH 2: Mapping data baris baru
      const rowsToInsert = limitedItems.map(item => ({
        text: item.text || "",
        pinned: item.pinned === true,
        ...(item.createdAt && !isNaN(Date.parse(item.createdAt)) ? { created_at: item.createdAt } : {})
      }));

      // LANGKAH 3: Simpan data baru (POST ke Supabase)
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
        return res.status(insertResponse.status).json({ 
          error: "Gagal menyimpan data baru (POST)", 
          supabaseStatus: insertResponse.status,
          supabaseRawMessage: errText, // Menampilkan detail error asli dari Supabase
          payloadSent: rowsToInsert    // Menampilkan bentuk data yang kita kirim
        });
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

      return res.status(200).json(savedItems);
    } catch (error) {
      return res.status(500).json({ 
        error: "Crash di POST handler", 
        message: error.message,
        stack: error.stack
      });
    }
  }

  return res.status(405).json({ error: "Method tidak diizinkan" });
}

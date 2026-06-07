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
  // METODE: GET (Ambil Semua Data)
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
  // METODE: POST (Insert Tunggal - NO OVERWRITE)
  // ------------------------------------
  if (req.method === "POST") {
    try {
      const { text } = req.body;

      if (!text || text.trim() === "") {
        return res.status(400).json({ error: "Teks tidak boleh kosong" });
      }

      const rowToInsert = {
        text: text.trim(),
        pinned: false,
        created_at: new Date().toISOString()
      };

      const insertResponse = await fetch(url, {
        method: "POST",
        headers: {
          ...headers,
          "Prefer": "return=representation"
        },
        body: JSON.stringify(rowToInsert)
      });

      if (!insertResponse.ok) {
        const errText = await insertResponse.text();
        return res.status(insertResponse.status).json({ error: "Gagal menyimpan data baru", details: errText });
      }

      const insertedData = await insertResponse.json();
      return res.status(200).json({ 
        success: true, 
        item: {
          id: insertedData[0].id,
          text: insertedData[0].text,
          pinned: insertedData[0].pinned,
          createdAt: insertedData[0].created_at
        }
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // ------------------------------------
  // METODE: PATCH (Update Status Pin Berdasarkan ID)
  // ------------------------------------
  if (req.method === "PATCH") {
    try {
      const { id } = req.query;
      const { pinned } = req.body;

      if (!id) return res.status(400).json({ error: "ID diperlukan untuk update" });

      const patchResponse = await fetch(`${url}?id=eq.${id}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify({ pinned: pinned === true })
      });

      if (!patchResponse.ok) {
        const errText = await patchResponse.text();
        return res.status(patchResponse.status).json({ error: "Gagal update status pin", details: errText });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // ------------------------------------
  // METODE: DELETE (Hapus Item atau Bersihkan Unpinned)
  // ------------------------------------
  if (req.method === "DELETE") {
    try {
      const { id, clearUnpinned } = req.query;

      // Opsi A: Clear Unpinned (Tombol Clear All)
      if (clearUnpinned === "true") {
        const deleteResponse = await fetch(`${url}?pinned=eq.false`, {
          method: "DELETE",
          headers: headers
        });

        if (!deleteResponse.ok) {
          const errText = await deleteResponse.text();
          return res.status(deleteResponse.status).json({ error: "Gagal membersihkan item unpinned", details: errText });
        }
        return res.status(200).json({ success: true, message: "Semua item unpinned berhasil dihapus" });
      }

      // Opsi B: Hapus Satu Item Spesifik Berdasarkan ID
      if (!id) return res.status(400).json({ error: "ID diperlukan untuk menghapus" });

      const deleteResponse = await fetch(`${url}?id=eq.${id}`, {
        method: "DELETE",
        headers: headers
      });

      if (!deleteResponse.ok) {
        const errText = await deleteResponse.text();
        return res.status(deleteResponse.status).json({ error: "Gagal menghapus item", details: errText });
      }

      return res.status(200).json({ success: true, message: "Item berhasil dihapus" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: "Method tidak diizinkan" });
}

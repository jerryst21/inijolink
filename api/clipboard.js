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
  // LINE 45-END: UBAH METODE POST MENJADI INSERT TUNGGAL & HAPUS BATASAN 100 ITEM
  if (req.method === "POST") {
    try {
      const { text } = req.body;

      if (!text || text.trim() === "") {
        return res.status(400).json({ error: "Teks tidak boleh kosong" });
      }

      // Menyiapkan data satu baris baru untuk di-insert
      const rowToInsert = {
        text: text.trim(),
        pinned: false,
        created_at: new Date().toISOString()
      };

      // Langsung POST ke Supabase (Tanpa DELETE massal sebelumnya)
      const insertResponse = await fetch(url, {
        method: "POST",
        headers: {
          ...headers,
          "Prefer": "return=representation" // Meminta Supabase mengembalikan data yang baru dibuat
        },
        body: JSON.stringify(rowToInsert)
      });

      if (!insertResponse.ok) {
        const errText = await insertResponse.text();
        return res.status(insertResponse.status).json({ error: "Gagal menyimpan data ke cloud", details: errText });
      }

      const insertedData = await insertResponse.json();
      
      // Mengembalikan response sukses beserta data item yang baru dibuat
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

  return res.status(405).json({ error: "Method tidak diizinkan" });
}

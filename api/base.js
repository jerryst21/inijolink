import dataLinks from './datalinks.json';

export default function handler(req, res) {
  // Mengambil parameter 'id' dari URL (misal: ?id=mma)
  const { id } = req.query;

  // Jika ID ditemukan di JSON, kirim datanya. Jika tidak, kirim array kosong.
  const result = dataLinks[id.toLowerCase()] || [];

  // Mengirim response
  res.status(200).json(result);
}

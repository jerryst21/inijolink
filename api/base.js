// api/base.js
export default function handler(req, res) {
  const data = [
    {
      category: "TUGAS HARIAN",
      links: [
        { no: 1, title: "PEMBUKUAN", url: "#", icon: "M" },
        { no: 2, title: "BCA - VPN", url: "#", icon: "BCA" },
        { no: 3, title: "BNIDIRECT CASH", url: "#", icon: "BNI" },
        { no: 4, title: "QLOLA BY BRI", url: "#", icon: "BRI" },
        { no: 5, title: "KOPRA BY MANDIRI", url: "#", icon: "MDR" },
        { no: 6, title: "KAS KANTOR - 2026", url: "#", icon: "📗", status: "🟢" },
        { no: 7, title: "ARSIP NOTA", url: "#", icon: "📁" },
        { no: 8, title: "REKAP SALES - 2026", url: "#", icon: "📗", status: "🔵" },
        { no: 9, title: "STOK GUDANG & FREEZER 2026", url: "#", icon: "📗", status: "🟡" },
        { no: 10, title: "DAFTAR AKTIVA", url: "#", icon: "📗", status: "🔵" },
      ]
    },
    {
      category: "TUGAS BULANAN",
      links: [
        { no: 11, title: "BPJS KETENAGAKERJAAN", url: "#", icon: "⚙️", info: "10" },
        { no: 12, title: "PERHITUNGAN GAJI 2026", url: "#", icon: "📗", status: "🔵" },
        { no: 13, title: "REKAPAN INSENTIF", url: "#", icon: "📗", status: "🔵" },
        { no: 14, title: "LAPORAN LABA RUGI", url: "#", icon: "📗", status: "🔵" },
        { no: 15, title: "PROFIT SHARING", url: "#", icon: "📗", status: "🔵" },
      ]
    }
  ];

  res.status(200).json(data);
}

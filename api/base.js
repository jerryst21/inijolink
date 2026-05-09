export default function handler(req, res) {
  const data = [
    {
      category: "TUGAS HARIAN",
      links: [
        { title: "PEMBUKUAN", url: "#", icon: "fi fi-sr-book", iconColor: "#ff4757" },
        { title: "BCA - VPN", url: "#", icon: "fi fi-sr-vpn", iconColor: "#1e90ff" },
        { title: "BNIDIRECT CASH", url: "#", icon: "BNI" },
        { title: "QLOLA BY BRI", url: "#", icon: "BRI" },
        { title: "KOPRA BY MANDIRI", url: "#", icon: "MDR" },
        { 
          title: "KAS KANTOR", 
          url: "#", 
          icon: "📗", 
          status: "🟢",
          subLinks: [
            { label: "2025", url: "#" },
            { label: "2026", url: "#" }
          ]
        },
        { title: "ARSIP NOTA", url: "#", icon: "📁" },
        { 
          title: "REKAP SALES", 
          url: "#", 
          icon: "📗", 
          status: "🔵",
          subLinks: [
            { label: "2025", url: "#" },
            { label: "2026", url: "#" }
          ]
        },
      ]
    },
    {
      category: "TUGAS BULANAN",
      links: [
        { title: "BPJS KETENAGAKERJAAN", url: "#", icon: "⚙️", info: "Jatuh tempo tgl 10" },
        { 
          title: "PERHITUNGAN GAJI", 
          url: "#", 
          icon: "📗", 
          status: "🔵",
          subLinks: [
            { label: "2025", url: "#" },
            { label: "2026", url: "#" }
          ]
        },
      ]
    }
  ];

  res.status(200).json(data);
}

export default function handler(req, res) {
  const data = [
    {
      category: "TUGAS HARIAN",
      links: [
        { title: "Pembukuan", url: "#", icon: "fa-solid fa-money-check", iconColor: "#ff4757" }, // Pakai FontAwesome
        { title: "BCA - VPN", url: "#", icon: "fa-solid fa-shield-halved", iconColor: "#1e90ff" }, // Pakai FontAwesome
        { title: "BNIDIRECT CASH", url: "#", icon: "BNI" },
        { title: "QLOLA By BRI", url: "#", icon: "BRI" },
        { title: "Kopra By Mandiri", url: "#", icon: "MDR" },
        { title: "Kas Kantor", url: "#", icon: "📗", status: "🟢",
          subLinks: [
            { label: "2025", url: "#" },
            { label: "2026", url: "#" }
          ]
        },
        { title: "Arsip Nota", url: "#", icon: "fa-solid fa-file-invoice" }, // Pakai FontAwesome
        { title: "Rekap Sales", url: "#", icon: "📗", status: "🔵",
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
        { title: "BPJS Ketenagakerjaan", url: "#", icon: "fa-solid fa-hands-holding-circle", iconColor: "#80EF80", info: "Jatuh tempo tgl 10" },
        { title: "Perhitungan Gaji", url: "#", icon: "📗", status: "🔵",
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

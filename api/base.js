export default function handler(req, res) {
  const data = [
    {
      category: "TUGAS HARIAN",
      links: [
        { title: "Pembukuan", url: "#", icon: "M" }, // iconColor: "#ff4757"
        { title: "BCA - VPN", url: "#", icon: "fa-solid fa-shield-halved", iconColor: "#1e90ff" }, // Pakai FontAwesome
        { title: "BNIDIRECT CASH", url: "#", icon: "<i class="fa-brands fa-cash-app"></i>", iconColor: "#FFA500" },
        { title: "QLOLA By BRI", url: "#", icon: "BRI"}, // iconColor: "#002147" 
        { title: "Kopra By Mandiri", url: "#", icon: "K"}, // iconColor: "#55A9DC" 
        { title: "Kas Kantor", url: "#", icon: "📗", status: "🟢",
          subLinks: [
            { label: "2025", url: "#" },
            { label: "2026", url: "#" }
          ]
        },
        { title: "Arsip Nota", url: "#", icon: "📗" },
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

export default function handler(req, res) {
  const data = [
    {
      category: "TUGAS HARIAN",
      links: [
        { title: "Pembukuan", url: "https://greengroup.manager.io/", icon: "fa-solid fa-money-check", iconColor: "#ff4757" }, 
        { title: "BCA - VPN", url: "https://vpn.klikbca.com/+CSCOE+/logon.html", icon: "fa-solid fa-money-bill-transfer", iconColor: "#1e90ff" },
        { title: "BNIDIRECT CASH", url: "https://bnidirect.bni.co.id/corp/common/login.do?action=logout", icon: "fa-solid fa-money-bill-transfer", iconColor: "#FFA500" },
        { title: "QLOLA By BRI", url: "https://qlola.bri.co.id/", icon: "fa-solid fa-money-bill-transfer", iconColor: "#ADE8F4" },
        { title: "Kopra By Mandiri", url: "https://koprabymandiri.com/", icon: "fa-solid fa-money-bill-transfer", iconColor: "#0096C7" },
        { title: "Kas Kantor", url: "https://docs.google.com/spreadsheets/d/1GaDZr_7zTJ2CRQ_fVwOzkdHUaeQwYnYnOr_zLMkarKY", icon: "fa-solid fa-cash-register", iconColor: "#0F9D58", status: "🟢",
          subLinks: [
            { label: "2025", url: "https://docs.google.com/spreadsheets/d/1t3RFDYCUSAIz5BlQXPkHeR4GMmIu0DF8gDu9hwYj0to" },
            { label: "2026", url: "https://docs.google.com/spreadsheets/d/1GaDZr_7zTJ2CRQ_fVwOzkdHUaeQwYnYnOr_zLMkarKY" }
          ]
        },
        { title: "Arsip Nota", url: "https://inijo.vercel.app/arsip/arsipxo862.html", icon: "fa-solid fa-box-archive" }, 
        { title: "Rekap Sales", url: "https://docs.google.com/spreadsheets/d/1GaDZr_7zTJ2CRQ_fVwOzkdHUaeQwYnYnOr_zLMkarKY", icon: "fa-solid fa-chart-line", iconColor: "#0F9D58", status: "🟢",
          subLinks: [
            { label: "2025", url: "https://docs.google.com/spreadsheets/d/16v0TZQZfqfBRWPCY-dTUSiGeafp3kwcBZNtFwevYW2c" },
            { label: "2026", url: "https://docs.google.com/spreadsheets/d/1GaDZr_7zTJ2CRQ_fVwOzkdHUaeQwYnYnOr_zLMkarKY" }
          ]
        },
        { title: "Stok Gudang & Freezer 2026", url: "https://docs.google.com/spreadsheets/d/1Nr6Fb1Fb3VzWTLGbMI2cr9aTgHZgyG3cK2YAjr5ovLM", icon: "fa-solid fa-warehouse", iconColor: "#0F9D58", status: "🔵",
          subLinks: [
            { label: "2025", url: "https://docs.google.com/spreadsheets/d/19tZ6qHSSbhjlWqPBMjtr15gWhV9dOMg5YJIENGuMjA0" },
            { label: "2026", url: "https://docs.google.com/spreadsheets/d/1Nr6Fb1Fb3VzWTLGbMI2cr9aTgHZgyG3cK2YAjr5ovLM" }
          ]
        },
      ]
    },
    {
      category: "TUGAS BULANAN",
      links: [
        { title: "BPJS Ketenagakerjaan", url: "https://sipp.bpjsketenagakerjaan.go.id/", icon: "fa-solid fa-hands-holding-circle", iconColor: "#39B44A", info: "Jatuh tempo tgl 10" },
        { title: "Perhitungan Gaji", url: "https://docs.google.com/spreadsheets/d/1HM_qYI_PaIYqEmEF0ziGfiVdGPRTUB0gpRr71VvYw0s", icon: "fa-solid fa-money-check-dollar", iconColor: "#0F9D58", status: "🔵"},
		{ title: "Rekapan Insentif", url: "https://docs.google.com/spreadsheets/d/1LwNR2_J4AEK-ZEF1bzKiIthQtJ7QZT1BCG1q7eUxiFg", icon: "fa-solid fa-hand-holding-dollar", iconColor: "#0F9D58", status: "🔵"},
		{ title: "Laporan Laba Rugi", url: "https://docs.google.com/spreadsheets/d/1AbY-31jmbghwq0cB8qHYil_5efMOtdMPZiZQ2NylueQ", icon: "fa-solid fa-file-invoice-dollar", iconColor: "#0F9D58", status: "🔵"},
		{ title: "Profit Sharing", url: "https://docs.google.com/spreadsheets/d/18WDqdxnbQP2VNk3Kk665mLmOQ_SRPoWKbsYFZGW8XIE", icon: "fa-solid fa-scale-balanced", iconColor: "#0F9D58", status: "🔵"},
      ]
    },
    {
      category: "TUGAS TAHUNAN",
      links: [
        { title: "THR Idul Fitri", url: "https://docs.google.com/spreadsheets/d/1xlJIfiN_kcQVUadmv-qqkWO_iOvckk9YGnvklfD_nBs", icon: "fa-solid fa-mosque", iconColor: "#0F9D58", info: "7 hari sebelum hari raya" },
        { title: "THR Natal", url: "https://docs.google.com/spreadsheets/d/1AEkhjtBaEqmVT4uQ_YBB00z0JfC9IRaJrPnShrkzuUE", icon: "fa-solid fa-holly-berry", iconColor: "#0F9D58", info: "7 hari sebelum hari raya"},
      ]
    },
      category: "CATATAN",
      links: [
        { title: "Keterangan Status", icon: "<i class="fa-solid fa-circle-info"></i>", iconColor: "#39B44A", info: "🟢 Kasir</br>🔵 Accounting" }
      ]
    }
  ];

  res.status(200).json(data);
}

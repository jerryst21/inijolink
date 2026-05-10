export default function handler(req, res) {
  // Mengambil parameter 'id' dari URL
  const { id } = req.query;

  // DATA UNTUK CV. KAWAN SEJAHTERA BERSAMA (KSB)
  const dataKSB = [
    {
      category: "TUGAS HARIAN",
      links: [
        { title: "Pembukuan", url: "https://greengroup.manager.io/", icon: "fa-solid fa-money-check", iconColor: "#ff4757", status: "🟢" }, 
        { title: "BCA - VPN", url: "https://vpn.klikbca.com/+CSCOE+/logon.html", icon: "fa-solid fa-money-bill-transfer", iconColor: "#1e90ff", status: "🟢" },
        { title: "BNIDIRECT CASH", url: "https://bnidirect.bni.co.id/corp/common/login.do?action=logout", icon: "fa-solid fa-money-bill-transfer", iconColor: "#FFA500", status: "🟢" },
        { title: "QLOLA By BRI", url: "https://qlola.bri.co.id/", icon: "fa-solid fa-money-bill-transfer", iconColor: "#ADE8F4", status: "🟢" },
        { title: "Kopra By Mandiri", url: "https://koprabymandiri.com/", icon: "fa-solid fa-money-bill-transfer", iconColor: "#0096C7", status: "🟢" },
        { title: "Kas Kantor", url: "https://docs.google.com/spreadsheets/d/1GaDZr_7zTJ2CRQ_fVwOzkdHUaeQwYnYnOr_zLMkarKY", icon: "fa-solid fa-cash-register", iconColor: "#0F9D58", status: "🟢",
          subLinks: [
            { label: "2025", url: "https://docs.google.com/spreadsheets/d/1t3RFDYCUSAIz5BlQXPkHeR4GMmIu0DF8gDu9hwYj0to" },
            { label: "2026", url: "https://docs.google.com/spreadsheets/d/1GaDZr_7zTJ2CRQ_fVwOzkdHUaeQwYnYnOr_zLMkarKY" }
          ]
        },
        { title: "Arsip Nota", url: "https://inijo.vercel.app/arsip/arsipxo862.html", icon: "fa-solid fa-box-archive", status: "🟢" }, 
        { title: "Rekap Sales", url: "https://docs.google.com/spreadsheets/d/1GaDZr_7zTJ2CRQ_fVwOzkdHUaeQwYnYnOr_zLMkarKY", icon: "fa-solid fa-chart-line", iconColor: "#0F9D58", status: "🔵",
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
        { title: "BPJS Ketenagakerjaan", url: "https://sipp.bpjsketenagakerjaan.go.id/", icon: "fa-solid fa-hands-holding-circle", iconColor: "#39B44A", info: "Jatuh tempo tgl 10", status: "🔵" },
        { title: "Perhitungan Gaji", url: "https://docs.google.com/spreadsheets/d/1HM_qYI_PaIYqEmEF0ziGfiVdGPRTUB0gpRr71VvYw0s", icon: "fa-solid fa-money-check-dollar", iconColor: "#0F9D58", status: "🔵"},
        { title: "Rekapan Insentif", url: "https://docs.google.com/spreadsheets/d/1LwNR2_J4AEK-ZEF1bzKiIthQtJ7QZT1BCG1q7eUxiFg", icon: "fa-solid fa-hand-holding-dollar", iconColor: "#0F9D58", status: "🔵"},
        { title: "Laporan Laba Rugi", url: "https://docs.google.com/spreadsheets/d/1AbY-31jmbghwq0cB8qHYil_5efMOtdMPZiZQ2NylueQ", icon: "fa-solid fa-file-invoice-dollar", iconColor: "#0F9D58", status: "🔵"},
        { title: "Profit Sharing", url: "https://docs.google.com/spreadsheets/d/18WDqdxnbQP2VNk3Kk665mLmOQ_SRPoWKbsYFZGW8XIE", icon: "fa-solid fa-scale-balanced", iconColor: "#0F9D58", status: "🔵"},
      ]
    },
    {
      category: "TUGAS TAHUNAN",
      links: [
        { title: "THR Idul Fitri", url: "https://docs.google.com/spreadsheets/d/1xlJIfiN_kcQVUadmv-qqkWO_iOvckk9YGnvklfD_nBs", icon: "fa-solid fa-mosque", iconColor: "#0F9D58", info: "7 hari sebelum hari raya", status: "🟢" },
        { title: "THR Natal", url: "https://docs.google.com/spreadsheets/d/1AEkhjtBaEqmVT4uQ_YBB00z0JfC9IRaJrPnShrkzuUE", icon: "fa-solid fa-holly-berry", iconColor: "#0F9D58", info: "7 hari sebelum hari raya", status: "🟢" },
      ]
    },
    {
      category: "CATATAN",
      links: [
        { title: "Keterangan Akses", icon: "fa-solid fa-circle-info", info: "🟢 Kasir</br>🔵 Accounting" },
      ]
    }
  ];

  // DATA UNTUK PT. MUTIARA MITRA ABADI (MMA)
  const dataMMA = [
    {
      category: "TUGAS HARIAN",
      links: [
        { title: "Pembukuan", url: "https://greengroup.manager.io/", icon: "fa-solid fa-money-check", iconColor: "#ff4757", status: "🟢" }, 
        { title: "BCA - VPN", url: "https://vpn.klikbca.com/+CSCOE+/logon.html", icon: "fa-solid fa-money-bill-transfer", iconColor: "#1e90ff", status: "🟢" },
        { title: "BNIDIRECT CASH", url: "https://bnidirect.bni.co.id/corp/common/login.do?action=logout", icon: "fa-solid fa-money-bill-transfer", iconColor: "#FFA500", status: "🟢" },
        { title: "QLOLA By BRI", url: "https://qlola.bri.co.id/", icon: "fa-solid fa-money-bill-transfer", iconColor: "#ADE8F4", status: "🟢" },
        { title: "Kas Kantor Politeknik", url: "https://docs.google.com/spreadsheets/d/1xfA8AzSCyGBEbvMDTAl-Q5FsrqIJFJRAZhuaM4XWIzo", icon: "fa-solid fa-cash-register", iconColor: "#0F9D58", status: "🟢",
          subLinks: [
            { label: "2025", url: "https://docs.google.com/spreadsheets/d/1gmUNGyt9-C4FLZH6U1ZPDnSRHvEAJs7Op4xLQqKeM8k" },
            { label: "2026", url: "https://docs.google.com/spreadsheets/d/1xfA8AzSCyGBEbvMDTAl-Q5FsrqIJFJRAZhuaM4XWIzo" }
          ]
        },
        { title: "Rekapan Penjualan Politeknik 2026", url: "https://docs.google.com/spreadsheets/d/1PcyTO7_xzhxUXQD-Y8X4nIO6_159iSocLP9gFOPH3eE", icon: "fa-solid fa-cash-register", iconColor: "#0F9D58", status: "🟢",
          subLinks: [
            { label: "2025", url: "https://docs.google.com/spreadsheets/d/1E9OO0jeqiELzPrzBUVAg-syOGxbZpNvwyC_z7gwTYtw" },
            { label: "2026", url: "https://docs.google.com/spreadsheets/d/1PcyTO7_xzhxUXQD-Y8X4nIO6_159iSocLP9gFOPH3eE" }
          ]
        },
        { title: "Arsip Nota Politeknik", url: "https://inijotool.vercel.app/arsip/arsippoli77.html", icon: "fa-solid fa-box-archive", status: "🟢" }, 
        { title: "Kas Kantor Ring Road", url: "https://docs.google.com/spreadsheets/d/1Pa8rYFR6m_goigZ__jIGgAu38zvrv8-XFyfrGuNHD-I", icon: "fa-solid fa-cash-register", iconColor: "#0F9D58", status: "🟢",
          subLinks: [
            { label: "2025", url: "https://docs.google.com/spreadsheets/d/1FdM6N8XIDg7DidMdcjL0Hc7DSE7t5kY3P5HWnKX9D3o" },
            { label: "2026", url: "https://docs.google.com/spreadsheets/d/1Pa8rYFR6m_goigZ__jIGgAu38zvrv8-XFyfrGuNHD-I" }
          ]
        },
        { title: "Rekapan Penjualan Ring Road 2026", url: "https://docs.google.com/spreadsheets/d/1hECbBcbJAfb116iN8aMdah3dcioptXrRrUqqswSGkAg", icon: "fa-solid fa-cash-register", iconColor: "#0F9D58", status: "🟢",
          subLinks: [
            { label: "2025", url: "https://docs.google.com/spreadsheets/d/1SHdfcPi_2SDTJmEj-8kkZHoe5rC_UaYV75elTSoaMSM" },
            { label: "2026", url: "https://docs.google.com/spreadsheets/d/1hECbBcbJAfb116iN8aMdah3dcioptXrRrUqqswSGkAg" }
          ]
        },
        { title: "Arsip Nota Ring Road", url: "https://inijotool.vercel.app/arsip/arsiprr78.html", icon: "fa-solid fa-box-archive", status: "🟢" }, 
        { title: "Daftar Aktiva", url: "", icon: "fa-solid fa-box-archive", status: "🟢" }, 
        { title: "Laporan BBM 2026", url: "https://docs.google.com/spreadsheets/d/1LKWRfQantQ6BYfVnDuiuCfxwbG2VXwDQZRdJZuoAh7U", icon: "fa-solid fa-warehouse", iconColor: "#0F9D58", status: "🔵",
          subLinks: [
            { label: "2025", url: "https://docs.google.com/spreadsheets/d/1JH-QSMUvzINLnBf6Aar0rp_wN5Ef2akP5ZxznGZy3Ao" },
            { label: "2026", url: "https://docs.google.com/spreadsheets/d/1LKWRfQantQ6BYfVnDuiuCfxwbG2VXwDQZRdJZuoAh7U" }
          ]
        },
      ]
    },
    {
      category: "TUGAS BULANAN",
      links: [
        { title: "BPJS Ketenagakerjaan", url: "https://sipp.bpjsketenagakerjaan.go.id/", icon: "fa-solid fa-hands-holding-circle", iconColor: "#39B44A", info: "Jatuh tempo tgl 10", status: "🔵" },
        { title: "Perhitungan Gaji", url: "https://docs.google.com/spreadsheets/d/1JPxYByIrLv0PH36lN3FFDWcpVuQ8qDi30juSow0VD7c/edit?gid=703663361#gid=703663361", icon: "fa-solid fa-money-check-dollar", iconColor: "#0F9D58", status: "🔵",
          subLinks: [
            { label: "2025", url: "https://docs.google.com/spreadsheets/d/1r6kmQLs4ZrKdHK_YIaBnTu8T-DFfamP2-Osc8f6ml00" },
            { label: "2026", url: "https://docs.google.com/spreadsheets/d/1JPxYByIrLv0PH36lN3FFDWcpVuQ8qDi30juSow0VD7c" }
          ]
        },
        { title: "Rekapan Rewards 2026", url: "https://docs.google.com/spreadsheets/d/1oxulK6mQgLe4tv2x-pq9M9n2vRiwVA1R8Fkxrcaoqfk", icon: "fa-solid fa-warehouse", iconColor: "#0F9D58", status: "🔵",
          subLinks: [
            { label: "2025", url: "https://docs.google.com/spreadsheets/d/1ufF5-9Jr0UnrIk7gnLwRA8B2BCWqPHCEL744frFG72A" },
            { label: "2026", url: "https://docs.google.com/spreadsheets/d/1oxulK6mQgLe4tv2x-pq9M9n2vRiwVA1R8Fkxrcaoqfk" }
          ]
        },
        { title: "Profit Sharing", url: "", icon: "fa-solid fa-scale-balanced", iconColor: "#0F9D58", status: "🔵"},
        { title: "Laporan Laba Rugi Politeknik 2026", url: "https://docs.google.com/spreadsheets/d/1G0iQZBfWgv5lwCbsA3HNdYWyyDT8kN9Pprcw0f4eDOA", icon: "fa-solid fa-file-invoice-dollar", iconColor: "#0F9D58", status: "🔵",
          subLinks: [
            { label: "2025", url: "https://docs.google.com/spreadsheets/d/1VBn28Ky6vT4rgiHpjazLPsfo1MUQprysrgb6BQRHu_s" },
            { label: "2026", url: "https://docs.google.com/spreadsheets/d/1G0iQZBfWgv5lwCbsA3HNdYWyyDT8kN9Pprcw0f4eDOA" }
          ]
        },
        { title: "Laporan Laba Rugi Ring Road 2026", url: "https://docs.google.com/spreadsheets/d/1oVqpwLKLrsYD_gs9Eo17qTaOwUx6aGx7emFTc5H1-vY", icon: "fa-solid fa-file-invoice-dollar", iconColor: "#0F9D58", status: "🔵",
          subLinks: [
            { label: "2025", url: "https://docs.google.com/spreadsheets/d/1ajziAFT_XD2_mw-1WfcwQp657yaUEtKPhvERFNvVAWk" },
            { label: "2026", url: "https://docs.google.com/spreadsheets/d/1oVqpwLKLrsYD_gs9Eo17qTaOwUx6aGx7emFTc5H1-vY" }
          ]
        },
      ]
    },
    {
      category: "TUGAS TAHUNAN",
      links: [
        { title: "THR Idul Fitri", url: "", icon: "fa-solid fa-mosque", iconColor: "#0F9D58", info: "7 hari sebelum hari raya", status: "🟢" },
        { title: "THR Natal", url: "", icon: "fa-solid fa-holly-berry", iconColor: "#0F9D58", info: "7 hari sebelum hari raya", status: "🟢" },
      ]
    },
    {
      category: "CATATAN",
      links: [
        { title: "Rekening Bank Politeknik", icon: "fa-solid fa-circle-info", info: "BCA 0269237777</br>BNI 327150558</br>BRI 200301000273304" },
		{ title: "Rekening Bank Ring Road", icon: "fa-solid fa-circle-info", info: "BCA 0265188899</br>BNI 3271505580</br>BRI 200301889999567" },
		{ title: "Rekening Bank Oli & Gas", icon: "fa-solid fa-circle-info", info: "BNI 3271505580" },
        { title: "Keterangan Akses", icon: "fa-solid fa-circle-info", info: "🟢 Kasir</br>🔵 Accounting" },
      ]
    }
  ];

  // Logika Filter Eksplisit
  if (id === 'mma') {
    res.status(200).json(dataMMA);
  } else if (id === 'ksb') {
    res.status(200).json(dataKSB);
  } else {
    // Return array kosong jika ID tidak cocok atau tidak diisi
    res.status(200).json([]);
  }
}

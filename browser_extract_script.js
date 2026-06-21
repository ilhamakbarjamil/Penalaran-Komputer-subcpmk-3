
(async () => {
  const rows = [
  {
    "case_id": "case_001",
    "no_perkara": "2184/PID.B/2013/PN.TNG",
    "tanggal_putusan": "07-01-2014",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/920f583c6a4c4c1e857abd142bcaae4c.html",
    "raw_file": "case_001.txt"
  },
  {
    "case_id": "case_002",
    "no_perkara": "1671/Pid.B/2021/PN.Tng",
    "tanggal_putusan": "18-10-2021",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/zaec79c6b87c3daa8982313435383134.html",
    "raw_file": "case_002.txt"
  },
  {
    "case_id": "case_003",
    "no_perkara": "1885/Pid.B/2022/PN.Tng",
    "tanggal_putusan": "10-10-2022",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/zaed970b08fe45feb40e313533353136.html",
    "raw_file": "case_003.txt"
  },
  {
    "case_id": "case_004",
    "no_perkara": "1314/PID.B/2013/PN.TNG",
    "tanggal_putusan": "24-07-2013",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/bd7607df513ced610ce107010c47cc1b.html",
    "raw_file": "case_004.txt"
  },
  {
    "case_id": "case_005",
    "no_perkara": "1493/PID.B/2013/PN.TNG",
    "tanggal_putusan": "27-08-2013",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/adba62392c732ab4baa77debec9bbd72.html",
    "raw_file": "case_005.txt"
  },
  {
    "case_id": "case_006",
    "no_perkara": "310/Pid.B/2019/PN.Tng",
    "tanggal_putusan": "18-03-2019",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/854b1ce2c8150c85537665183232c221.html",
    "raw_file": "case_006.txt"
  },
  {
    "case_id": "case_007",
    "no_perkara": "2686/Pid.B/2018/PN Tng",
    "tanggal_putusan": "30 Januari 2019",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/ae04fe178665082c029a9b8bab0f2e4a.html",
    "raw_file": "case_007.txt"
  },
  {
    "case_id": "case_008",
    "no_perkara": "1581/Pid.B/2011/PN.TNG",
    "tanggal_putusan": "4 Oktober 2011",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/25a935db4781ac365604657c7a16d549.html",
    "raw_file": "case_008.txt"
  },
  {
    "case_id": "case_009",
    "no_perkara": "1022/Pid.B/2010/PN.TNG",
    "tanggal_putusan": "14 Juli 2010",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/02d8373b52a74b64cb2b509e597ab22e.html",
    "raw_file": "case_009.txt"
  },
  {
    "case_id": "case_010",
    "no_perkara": "497 / PID.B / 2014 / PN.TNG.",
    "tanggal_putusan": "19 Mei 2014",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/8759143bae7fc4503fe79b069b2b8b1b.html",
    "raw_file": "case_010.txt"
  },
  {
    "case_id": "case_011",
    "no_perkara": "1885 /Pid.B/2011/PN.TNG",
    "tanggal_putusan": "15 Desember 2011",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/6c202caab5f21bbfbb02c645b1e120b1.html",
    "raw_file": "case_011.txt"
  },
  {
    "case_id": "case_012",
    "no_perkara": "1073/Pid.B/2019/PN Tng",
    "tanggal_putusan": "10 Juli 2019",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/3ef0dd933715a8193d2f3eb06a2f5cf1.html",
    "raw_file": "case_012.txt"
  },
  {
    "case_id": "case_013",
    "no_perkara": "678/ PID.B/ 2011/ PN TNG",
    "tanggal_putusan": "8 Mei 2012",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/18665f313e4f85241b5592b8d5212fa2.html",
    "raw_file": "case_013.txt"
  },
  {
    "case_id": "case_014",
    "no_perkara": "1527/Pid.B/2014/PN.TNG",
    "tanggal_putusan": "16 September 2014",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/a1494e35aeb849e79506ae4ca8c28be2.html",
    "raw_file": "case_014.txt"
  },
  {
    "case_id": "case_015",
    "no_perkara": "834 / Pid.B / 2017 / PN.TNG.",
    "tanggal_putusan": "15 Juni 2017",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/f00d054e938e4c0c46bc04ca0cdc973d.html",
    "raw_file": "case_015.txt"
  },
  {
    "case_id": "case_016",
    "no_perkara": "2000/Pid.B/2017/PN.Tng",
    "tanggal_putusan": "16 Nopember 2017",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/04ad52268ca0dad8d4bb28edf1b88c52.html",
    "raw_file": "case_016.txt"
  },
  {
    "case_id": "case_017",
    "no_perkara": "2497/Pid.B/2018/PN Tng",
    "tanggal_putusan": "10 Januari 2019",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/2ec4a38929c18f44ab0e3893ecdd3020.html",
    "raw_file": "case_017.txt"
  },
  {
    "case_id": "case_018",
    "no_perkara": "2372/Pid.B/2018/PN Tng",
    "tanggal_putusan": "19 Desember 2018",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/1a2dbe4dff7e10c16022d7d40f3b8d54.html",
    "raw_file": "case_018.txt"
  },
  {
    "case_id": "case_019",
    "no_perkara": "329/Pid.B/2019/PN Tng",
    "tanggal_putusan": "1 April 2019",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/1927e380e77376c28fcc56bec49431a4.html",
    "raw_file": "case_019.txt"
  },
  {
    "case_id": "case_020",
    "no_perkara": "976/Pid.B/2022/PN Tng",
    "tanggal_putusan": "10 Agustus 2022",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/zaed1ecc94bf613ebb5c313530353533.html",
    "raw_file": "case_020.txt"
  },
  {
    "case_id": "case_021",
    "no_perkara": "32/Pdt.P/2025/PN Psp",
    "tanggal_putusan": "",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/zaf16cab4e3a9c5cb8ef323032343033.html",
    "raw_file": "case_021.txt"
  },
  {
    "case_id": "case_022",
    "no_perkara": "292/Pid.B/2025/PN Psp",
    "tanggal_putusan": "",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/zaf16cab4c54b6fcbc41323032343030.html",
    "raw_file": "case_022.txt"
  },
  {
    "case_id": "case_023",
    "no_perkara": "272/Pid.B/2025/PN Psp",
    "tanggal_putusan": "",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/zaf16cab4a5d78e89838323032333536.html",
    "raw_file": "case_023.txt"
  },
  {
    "case_id": "case_024",
    "no_perkara": "586/Pid.B/2019/PN Tng",
    "tanggal_putusan": "16 Mei 2019",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/08310eb6ee84116780cee64575f7054e.html",
    "raw_file": "case_024.txt"
  },
  {
    "case_id": "case_025",
    "no_perkara": "2203/PID.B/2014/PN. TNG",
    "tanggal_putusan": "6 Januari 2015",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/84cb49872067c701cfdf1ec9ba18e2d7.html",
    "raw_file": "case_025.txt"
  },
  {
    "case_id": "case_026",
    "no_perkara": "105/Pid.B/2024/PN Tng",
    "tanggal_putusan": "27 Februari 2024",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/zaef333448cd3426a003303334383332.html",
    "raw_file": "case_026.txt"
  },
  {
    "case_id": "case_027",
    "no_perkara": "465/Pid.B/2012/PN. TNG",
    "tanggal_putusan": "12 April 2012",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/5447530578b1a72d2ab822129b791116.html",
    "raw_file": "case_027.txt"
  },
  {
    "case_id": "case_028",
    "no_perkara": "1347 / PID.B / 2014 / PN.TNG.",
    "tanggal_putusan": "20 Agustus 2014",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/a3aedfdaa5c381abd8efe3088559cfb4.html",
    "raw_file": "case_028.txt"
  },
  {
    "case_id": "case_029",
    "no_perkara": "672 / PID.B / 2013 / PN.TNG",
    "tanggal_putusan": "15 Mei 2013",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/af8fac0ea6bf31bb3475f4a607d8f0b7.html",
    "raw_file": "case_029.txt"
  },
  {
    "case_id": "case_030",
    "no_perkara": "395/Pid.B/2023/PN Tng",
    "tanggal_putusan": "9 Mei 2023",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/zaedfadf877aa55c8478313633353437.html",
    "raw_file": "case_030.txt"
  },
  {
    "case_id": "case_031",
    "no_perkara": "46/Pid.B/2024/PN Tng",
    "tanggal_putusan": "5 Maret 2024",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/zaef3327a10bcfc4a212303231373537.html",
    "raw_file": "case_031.txt"
  },
  {
    "case_id": "case_032",
    "no_perkara": "1431/Pid.B/2021/PN Tng",
    "tanggal_putusan": "30 Nopember 2021",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/zaec527fe57c45ac863c313532333030.html",
    "raw_file": "case_032.txt"
  },
  {
    "case_id": "case_033",
    "no_perkara": "1544/Pid.B/2021/PN Tng",
    "tanggal_putusan": "17 Nopember 2021",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/zaec47891274e3d6889b313633303538.html",
    "raw_file": "case_033.txt"
  },
  {
    "case_id": "case_034",
    "no_perkara": "1048/Pid.B/2022/PN Tng",
    "tanggal_putusan": "19 September 2022",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/zaed38c2290e398c9854313535363438.html",
    "raw_file": "case_034.txt"
  },
  {
    "case_id": "case_035",
    "no_perkara": "1952/Pid.B/2022/PN Tng",
    "tanggal_putusan": "20 Desember 2022",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/zaed803e5dbc637a802e313531343436.html",
    "raw_file": "case_035.txt"
  },
  {
    "case_id": "case_036",
    "no_perkara": "1649/Pid.B/2022/PN Tng",
    "tanggal_putusan": "30 Nopember 2022",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/zaed708d0c8782529978313535373432.html",
    "raw_file": "case_036.txt"
  },
  {
    "case_id": "case_037",
    "no_perkara": "1905/Pid.B/2021/PN Tng",
    "tanggal_putusan": "19 Januari 2022",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/zaec7cbf4158b9c8bc31303934323231.html",
    "raw_file": "case_037.txt"
  },
  {
    "case_id": "case_038",
    "no_perkara": "1871/Pid.B/2021/PN Tng",
    "tanggal_putusan": "5 Januari 2022",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/zaec6ed1abbff3e08ad8313631383535.html",
    "raw_file": "case_038.txt"
  },
  {
    "case_id": "case_039",
    "no_perkara": "137/Pid.B/2022/PN Tng",
    "tanggal_putusan": "13 April 2022",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/zaecbafe85947050b5c0313435313236.html",
    "raw_file": "case_039.txt"
  },
  {
    "case_id": "case_040",
    "no_perkara": "893/Pid.B/2022/PN Tng",
    "tanggal_putusan": "30 Juni 2022",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/zaecf918e98122fe867a313533363333.html",
    "raw_file": "case_040.txt"
  }
];

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const cleanText = (text) => {
    return text
      .replace(/\r/g, "\n")
      .replace(/\t/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/[ ]{2,}/g, " ")
      .trim();
  };

  const isSecurityPage = (text) => {
    const lower = text.toLowerCase();
    return (
      lower.includes("cloudflare") ||
      lower.includes("melakukan verifikasi keamanan") ||
      lower.includes("ray id") ||
      lower.includes("bot jahat") ||
      lower.includes("performa dan keamanan")
    );
  };

  const results = [];

  console.log("Mulai mengambil teks dari", rows.length, "URL");

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    console.log(`[${i + 1}/${rows.length}] Memproses ${row.case_id}: ${row.url}`);

    try {
      const response = await fetch(row.url, {
        credentials: "include",
        cache: "no-store"
      });

      const html = await response.text();

      const doc = new DOMParser().parseFromString(html, "text/html");

      doc.querySelectorAll("script, style, nav, footer, header").forEach(el => el.remove());

      let text = "";

      if (doc.body) {
        text = doc.body.innerText || doc.body.textContent || "";
      }

      text = cleanText(text);

      const wordCount = text.length > 0 ? text.split(/\s+/).filter(Boolean).length : 0;

      let status = "berhasil_html";

      if (response.status !== 200) {
        status = "gagal_http_" + response.status;
      } else if (isSecurityPage(text)) {
        status = "gagal_cloudflare";
      } else if (wordCount < 50) {
        status = "teks_pendek";
      }

      results.push({
        case_id: row.case_id,
        no_perkara: row.no_perkara,
        tanggal_putusan: row.tanggal_putusan,
        raw_file: row.raw_file,
        url: row.url,
        status: status,
        http_status: response.status,
        jumlah_kata: wordCount,
        text: text
      });

      console.log(row.case_id, status, wordCount, "kata");

    } catch (err) {
      results.push({
        case_id: row.case_id,
        no_perkara: row.no_perkara,
        tanggal_putusan: row.tanggal_putusan,
        raw_file: row.raw_file,
        url: row.url,
        status: "gagal_error",
        error: String(err),
        jumlah_kata: 0,
        text: ""
      });

      console.error("Gagal:", row.case_id, err);
    }

    await sleep(1500);
  }

  const blob = new Blob([JSON.stringify(results, null, 2)], {
    type: "application/json"
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "ma_putusan_texts.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  console.log("Selesai. File ma_putusan_texts.json sudah dibuat/download.");
})();

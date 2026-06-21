
(async () => {
  const rows = [
  {
    "case_id": "case_001",
    "no_perkara": "1022/Pid.B/2010/PN.TNG",
    "tanggal_putusan": "14 Juli 2010",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/02d8373b52a74b64cb2b509e597ab22e.html",
    "raw_file": "case_001.txt"
  },
  {
    "case_id": "case_002",
    "no_perkara": "497 / PID.B / 2014 / PN.TNG.",
    "tanggal_putusan": "19 Mei 2014",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/8759143bae7fc4503fe79b069b2b8b1b.html",
    "raw_file": "case_002.txt"
  },
  {
    "case_id": "case_003",
    "no_perkara": "1885 /Pid.B/2011/PN.TNG",
    "tanggal_putusan": "15 Desember 2011",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/6c202caab5f21bbfbb02c645b1e120b1.html",
    "raw_file": "case_003.txt"
  },
  {
    "case_id": "case_004",
    "no_perkara": "1073/Pid.B/2019/PN Tng",
    "tanggal_putusan": "10 Juli 2019",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/3ef0dd933715a8193d2f3eb06a2f5cf1.html",
    "raw_file": "case_004.txt"
  },
  {
    "case_id": "case_005",
    "no_perkara": "678/ PID.B/ 2011/ PN TNG",
    "tanggal_putusan": "8 Mei 2012",
    "url": "https://putusan3.mahkamahagung.go.id/direktori/putusan/18665f313e4f85241b5592b8d5212fa2.html",
    "raw_file": "case_005.txt"
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
      lower.includes("enable javascript and cookies") ||
      lower.includes("melakukan verifikasi keamanan") ||
      lower.includes("ray id") ||
      lower.includes("bot jahat")
    );
  };

  const results = [];

  console.log("Mulai mengambil detail HTML batch 1:", rows.length, "kasus");

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    console.log(`[${i + 1}/${rows.length}] Memproses ${row.case_id}`);

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

    await sleep(4000);
  }

  const blob = new Blob([JSON.stringify(results, null, 2)], {
    type: "application/json"
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "ma_putusan_page1_batch1.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  console.log("Selesai. File ma_putusan_page1_batch1.json sudah dibuat/download.");
})();

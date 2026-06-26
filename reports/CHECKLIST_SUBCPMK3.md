# Checklist SubCPMK-3

| Komponen | Status | Catatan |
|---|---|---|
| Jumlah PDF | OK | Ditemukan 40 file PDF. |
| Jumlah TXT | OK | Ditemukan 40 file TXT hasil ekstraksi. |
| Jumlah kasus processed | OK | cases.csv berisi 40 kasus. |
| Duplikat case_id | OK | Duplikat case_id: 0. |
| Split train/test | OK | Train 32, test 8, intersection 0. |
| Query evaluasi | OK | queries.json berisi 8 query. |
| TF-IDF model | OK | Vectorizer dan matrix TF-IDF tersedia. |
| Data leakage utama | OK | Case ID test tidak ada di case base train. |
| Kolom pasal | PERLU CATATAN | Kolom pasal kosong pada 2 kasus; masih wajar karena format PDF berbeda. |
| Kolom lama_pidana | PERLU CATATAN | Lama pidana kosong pada 1 kasus; perlu dijelaskan sebagai keterbatasan ekstraksi regex. |
| Visualisasi | OK | Grafik distribusi label, split data, word count, missing field, combined metrics, confusion matrix, dan relevant retrieved sudah ditambahkan. |

# Analisis Detail Project CBR SubCPMK-3

## 1. Status Umum

Project ini sudah dibangun ulang dari awal menggunakan 40 file PDF putusan. Struktur repository sudah mengikuti pola tugas, yaitu tersedia folder `data`, `notebooks`, `src`, `README.md`, dan `requirements.txt`.

Berdasarkan pengecekan otomatis, project ini **siap dikumpulkan**, tetapi tetap memiliki beberapa catatan akademik yang perlu dijelaskan di README/laporan, terutama ketidakseimbangan label dan beberapa field hasil ekstraksi yang tidak selalu lengkap.

## 2. Checklist Kesesuaian

| Aspek | Status | Keterangan |
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


## 3. Detail Dataset

- Jumlah PDF mentah: 40 file.
- Jumlah hasil ekstraksi teks: 40 file.
- Jumlah kasus pada `cases.csv`: 40 kasus.
- Jumlah data train/case base: 32 kasus.
- Jumlah data test/query evaluasi: 8 kasus.

Distribusi label solusi:

| Label | Jumlah |
|---|---:|
| Pidana Penjara > 12 Bulan | 33 |
| Pidana Penjara 7-12 Bulan | 5 |
| Pidana Penjara <= 6 Bulan | 1 |
| Pidana Tidak Teridentifikasi | 1 |


Catatan: distribusi label tidak seimbang karena mayoritas putusan masuk ke kategori `Pidana Penjara > 12 Bulan`. Hal ini wajar pada data putusan yang dikumpulkan, tetapi perlu dijelaskan karena dapat membuat akurasi terlihat tinggi.

## 4. Pencegahan Data Leakage

Project ini sudah menghindari data leakage utama dengan cara:

1. Data dibagi menjadi train/case base dan test/query evaluasi.
2. `case_id` pada data test tidak dimasukkan ke case base train.
3. TF-IDF vectorizer hanya dibangun dari data train.
4. Query evaluasi dibuat dari `problem_text`, bukan dari `solution_text` atau label putusan.
5. Evaluasi retrieval tidak lagi mencari case yang sama persis, tetapi melihat apakah top-k retrieval mengambil kasus dengan label solusi yang relevan.

Hasil pengecekan intersection train-test: `0` kasus yang overlap.

## 5. Hasil Evaluasi

### Retrieval

| Metrik | Nilai |
|---|---:|
| hit_rate_at_5 | 0.8750 |
| precision_at_5 | 0.6750 |
| recall_at_5 | 0.1298 |
| f1_at_5 | 0.2177 |


Interpretasi retrieval: nilai Hit Rate@5 menunjukkan seberapa sering sistem berhasil menemukan minimal satu kasus relevan dalam 5 hasil teratas. Precision@5 menunjukkan proporsi hasil top-5 yang labelnya sesuai dengan query. Recall@5 cenderung lebih rendah karena jumlah kasus relevan dalam train bisa lebih banyak daripada 5 hasil yang diambil.

### Prediksi Solusi

| Metrik | Nilai |
|---|---:|
| accuracy | 0.8750 |
| precision_macro | 0.4375 |
| recall_macro | 0.5000 |
| f1_macro | 0.4667 |
| precision_weighted | 0.7656 |
| recall_weighted | 0.8750 |
| f1_weighted | 0.8167 |


Interpretasi prediksi: accuracy sebesar 0.8750 menunjukkan sebagian besar query test berhasil diprediksi sesuai labelnya. Namun precision/recall macro lebih rendah karena label tidak seimbang dan data test hanya 8 kasus.

## 6. Visualisasi yang Ditambahkan

Visualisasi tambahan tersedia di folder `data/results/`:

- `label_distribution_bar.png`: distribusi label solusi.
- `train_test_split_bar.png`: pembagian train dan test.
- `word_count_distribution.png`: distribusi jumlah kata hasil ekstraksi PDF.
- `missing_fields_bar.png`: jumlah nilai kosong pada kolom penting.
- `combined_metrics_bar.png`: ringkasan metrik retrieval dan prediksi.
- `confusion_matrix_heatmap.png`: confusion matrix prediksi solusi.
- `relevant_retrieved_per_query.png`: jumlah kasus relevan pada top-5 retrieval per query.

## 7. Bagian yang Perlu Dijelaskan Saat Presentasi

1. Dataset berasal dari 40 putusan PDF, bukan hanya dari halaman list website.
2. PDF diekstrak ke teks, lalu teks dibersihkan agar dapat dipakai sebagai case base.
3. Case representation mengubah putusan menjadi kolom terstruktur seperti nomor perkara, terdakwa, pasal, problem text, solution text, lama pidana, dan label solusi.
4. Retrieval menggunakan TF-IDF dan cosine similarity untuk mencari kasus paling mirip.
5. Reuse menggunakan weighted voting, yaitu label dari kasus-kasus paling mirip diberi bobot berdasarkan similarity score.
6. Evaluasi memakai train/test split agar kasus uji tidak ikut masuk ke case base.
7. Hasil evaluasi tidak 100%, dan ini justru lebih realistis karena sistem tidak mengevaluasi kasus terhadap dirinya sendiri.

## 8. Keterbatasan Project

Project ini sudah lengkap untuk tugas SubCPMK-3, tetapi masih ada keterbatasan:

1. Jumlah data hanya 40 putusan, sehingga ukuran test hanya 8 kasus.
2. Distribusi label tidak seimbang; mayoritas kasus berada pada label `Pidana Penjara > 12 Bulan`.
3. Beberapa PDF memiliki format yang berbeda, sehingga ekstraksi pasal atau lama pidana tidak selalu sempurna.
4. OCR atau ekstraksi teks PDF dapat menghasilkan noise pada beberapa dokumen.
5. Sistem belum memakai model embedding modern seperti IndoBERT, karena fokus tugas adalah implementasi CBR yang jelas dan dapat dijalankan.

## 9. Kesimpulan Kelayakan

Project ini sudah memenuhi inti tugas SubCPMK-3 karena mencakup case base, case representation, retrieval, solution reuse, evaluation, dokumentasi, dan output visualisasi. Secara kelayakan, project ini berada pada kategori **baik dan siap dikumpulkan**, dengan catatan metodologis yang sudah dijelaskan secara terbuka.

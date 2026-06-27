# Case-Based Reasoning Putusan Pidana Umum Pencurian PN Tangerang

Repository ini berisi implementasi **Case-Based Reasoning (CBR)** untuk pencarian kemiripan kasus putusan pengadilan. Data yang digunakan adalah 40 file PDF putusan pidana umum pencurian dari Direktori Putusan Mahkamah Agung..

## Identitas Dataset

- Jenis perkara: Pidana Umum - Pencurian
- Pengadilan: Pengadilan Negeri Tangerang
- Jumlah dokumen PDF: 40 putusan
- Format data mentah: PDF dan hasil ekstraksi TXT
- Metode retrieval: TF-IDF dan cosine similarity
- Metode reuse solusi: weighted voting berdasarkan similarity score
- Skema evaluasi: train/test split 80:20 agar tidak terjadi data leakage

## Struktur Repository

```text
data/
  raw/
    pdf/                 # 40 file PDF putusan
    text/                # hasil ekstraksi teks dari PDF
  processed/
    case_inventory.csv
    cases.csv
    case_base_train.csv
    case_solutions.json
    project_summary.json
    tfidf_vectorizer.joblib
    tfidf_matrix.joblib
  eval/
    test_cases.csv
    queries.json
    retrieval_metrics.csv
    prediction_metrics.csv
    retrieval_eval_detail.csv
    prediction_eval_detail.csv
    failure_analysis.csv
    classification_report.csv
    confusion_matrix.csv
  results/
    retrieval_results_sample.csv
    predictions.csv
    retrieval_metrics_bar.png
    prediction_metrics_bar.png
notebooks/
  01_data_collection.ipynb
  02_case_representation.ipynb
  03_case_retrieval.ipynb
  04_solution_reuse.ipynb
  05_evaluation.ipynb
src/
  preprocessing.py
  retrieval.py
  evaluation.py
requirements.txt
README.md
```

## Alur Pengerjaan

Catatan ekstraksi: sebagian besar PDF dapat diekstrak langsung menjadi teks. Beberapa PDF berbasis gambar/scan dibantu OCR ringan agar tetap dapat digunakan sebagai bagian dari case base.


### 1. Case Base Construction

Tahap pertama adalah mengumpulkan 40 file PDF putusan dan mengekstrak isi PDF menjadi file teks. Hasilnya disimpan di `data/raw/pdf/` dan `data/raw/text/`.

Output utama:

```text
data/processed/case_inventory.csv
data/raw/text/case_001.txt sampai case_040.txt
```

### 2. Case Representation

Setiap putusan direpresentasikan menjadi data terstruktur. Kolom penting yang digunakan antara lain:

- case_id
- no_perkara
- tanggal_putusan
- pengadilan
- jenis_perkara
- terdakwa
- pasal
- tindak_pidana
- problem_text
- solution_text
- lama_pidana
- solution_label

Output utama:

```text
data/processed/cases.csv
```

### 3. Case Retrieval

Retrieval dilakukan dengan TF-IDF dan cosine similarity. Untuk menghindari data leakage, model retrieval hanya dibangun dari data train atau case base, bukan dari seluruh data.

Split data:

- Train / case base: 32 kasus
- Test / query evaluasi: 8 kasus

Output utama:

```text
data/processed/case_base_train.csv
data/eval/test_cases.csv
data/processed/tfidf_vectorizer.joblib
data/processed/tfidf_matrix.joblib
data/eval/queries.json
```

### 4. Case Solution Reuse

Solusi kasus baru diprediksi berdasarkan label solusi dari top-k kasus paling mirip. Sistem menggunakan weighted voting, yaitu label dengan total similarity score terbesar dipilih sebagai prediksi.

Output utama:

```text
data/processed/case_solutions.json
data/results/predictions.csv
```

### 5. Evaluation

Evaluasi dilakukan pada data test. Query evaluasi hanya menggunakan `problem_text`, sehingga tidak memasukkan `solution_text`, amar putusan, atau label hasil putusan.

Metrik retrieval:

- Hit Rate@5
- Precision@5
- Recall@5
- F1@5

Metrik prediksi solusi:

- Accuracy
- Precision
- Recall
- F1-score

Output utama:

```text
data/eval/retrieval_metrics.csv
data/eval/prediction_metrics.csv
data/eval/failure_analysis.csv
data/results/retrieval_metrics_bar.png
data/results/prediction_metrics_bar.png
```

## Cara Menjalankan

### 1. Clone repository

```bash
git clone https://github.com/ilhamakbarjamil/Penalaran-Komputer-subcpmk-3.git
cd Penalaran-Komputer-subcpmk-3
```

### 2. Buat virtual environment

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install dependency

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 4. Jalankan Jupyter Notebook

```bash
jupyter notebook
```

Jalankan notebook secara berurutan:

```text
01_data_collection.ipynb
02_case_representation.ipynb
03_case_retrieval.ipynb
04_solution_reuse.ipynb
05_evaluation.ipynb
```

## Catatan Penting

Project ini sudah menggunakan data putusan dalam bentuk PDF, sehingga lebih kuat dibandingkan hanya memakai teks dari halaman daftar pencarian. Untuk menghindari evaluasi yang terlalu tinggi secara tidak wajar, data dibagi menjadi train/test. Data test tidak dimasukkan ke case base, dan query evaluasi tidak menggunakan bagian amar putusan atau label solusi.

## Ringkasan Output Saat Ini

- Jumlah kasus: 40
- Jumlah train/case base: 32
- Jumlah test/query evaluasi: 8
- Distribusi label: {'Pidana Penjara > 12 Bulan': 33, 'Pidana Penjara 7-12 Bulan': 5, 'Pidana Penjara <= 6 Bulan': 1, 'Pidana Tidak Teridentifikasi': 1}

## Kesimpulan

Sistem CBR ini mampu membangun case base dari putusan PDF, merepresentasikan kasus ke dalam struktur data, melakukan retrieval kasus menggunakan cosine similarity, menggunakan kembali solusi dari kasus lama, dan mengevaluasi hasil retrieval serta prediksi solusi secara terpisah.


## Visualisasi Tambahan

Agar hasil analisis lebih mudah dipahami, project ini juga menambahkan beberapa grafik pada folder `data/results/`:

| File Grafik | Fungsi |
|---|---|
| `label_distribution_bar.png` | Menunjukkan sebaran label solusi putusan. |
| `train_test_split_bar.png` | Menunjukkan pembagian data train/case base dan test/query evaluasi. |
| `word_count_distribution.png` | Menunjukkan sebaran jumlah kata hasil ekstraksi PDF. |
| `missing_fields_bar.png` | Menunjukkan kolom penting yang masih memiliki nilai kosong. |
| `combined_metrics_bar.png` | Membandingkan metrik retrieval dan prediksi solusi. |
| `confusion_matrix_heatmap.png` | Menunjukkan kesalahan dan kebenaran prediksi solusi. |
| `relevant_retrieved_per_query.png` | Menunjukkan jumlah kasus relevan pada top-5 retrieval untuk setiap query. |

## Penjelasan Lebih Detail Per Tahap

### Case Base

Case base dibangun dari 40 file PDF putusan. Setiap PDF disimpan di `data/raw/pdf/`, lalu diekstrak menjadi file teks di `data/raw/text/`. Hasil inventarisasi disimpan dalam `case_inventory.csv`.

### Case Representation

Pada tahap representasi, setiap putusan diubah dari teks panjang menjadi struktur data. Kolom yang paling penting adalah `problem_text` dan `solution_text`. `problem_text` digunakan untuk pencarian kasus, sedangkan `solution_text` digunakan sebagai dasar label solusi.

### Case Retrieval

Retrieval memakai TF-IDF dan cosine similarity. TF-IDF dipilih karena sederhana, mudah dijelaskan, dan sesuai untuk pencarian kemiripan dokumen berbasis teks. Sistem mengambil top-5 kasus paling mirip untuk setiap query.

### Solution Reuse

Solution reuse dilakukan dengan weighted voting. Artinya, label solusi dari kasus yang lebih mirip memiliki bobot lebih besar. Label dengan total similarity score tertinggi dipilih sebagai prediksi solusi untuk query baru.

### Evaluation

Evaluasi memakai data test yang tidak dimasukkan ke case base. Hal ini penting supaya hasil tidak mengalami data leakage. Metrik retrieval dan prediksi solusi disimpan dalam folder `data/eval/`.

## Catatan Kualitas Data

Dari hasil pengecekan, terdapat 2 kasus dengan kolom `pasal` kosong dan 1 kasus dengan kolom `lama_pidana` kosong. Hal ini terjadi karena format PDF putusan tidak selalu sama. Project tetap layak karena kolom utama seperti `case_id`, `no_perkara`, `terdakwa`, `problem_text`, `solution_text`, dan `solution_label` sudah tersedia.

## Laporan Tambahan

Penjelasan detail dan checklist kelayakan tersedia di:

```text
reports/ANALISIS_DETAIL_CBR.md
reports/CHECKLIST_SUBCPMK3.md
```

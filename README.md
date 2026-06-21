# Sistem Case-Based Reasoning untuk Retrieval Putusan Pengadilan

## Deskripsi Proyek

Project ini merupakan implementasi sederhana sistem **Case-Based Reasoning (CBR)** menggunakan Python untuk membantu proses pencarian dan pemanfaatan kembali kasus putusan pengadilan yang memiliki kemiripan dengan kasus baru.

Domain perkara yang digunakan dalam project ini adalah:

- **Jenis perkara:** Pidana Umum - Pencurian
- **Pengadilan:** PN Tangerang
- **Jumlah data:** 40 putusan
- **Sumber data:** Direktori Putusan Mahkamah Agung Republik Indonesia

Project ini mengikuti tahapan utama dalam siklus CBR, yaitu:

1. Membangun Case Base
2. Case Representation
3. Case Retrieval
4. Case Solution Reuse
5. Model Evaluation

Tujuan utama project ini adalah membangun pipeline CBR end-to-end, mulai dari pengumpulan data putusan, representasi kasus, pencarian kasus serupa, penggunaan kembali solusi, hingga evaluasi hasil retrieval dan prediksi solusi.

---

## Struktur Repository

```text
data/
  raw/
    case_001.txt
    case_002.txt
    ...
    case_040.txt

  processed/
    case_inventory.csv
    cases.csv
    case_solutions.json
    tfidf_vectorizer.joblib
    tfidf_matrix.joblib

  eval/
    queries.json
    retrieval_metrics.csv
    prediction_metrics.csv
    retrieval_eval_detail.csv
    prediction_eval_detail.csv
    failure_analysis.csv

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

requirements.txt
README.md
```

---

## Catatan Pengumpulan Data

Data pada project ini dikumpulkan dari halaman Direktori Putusan Mahkamah Agung Republik Indonesia. Pada tahap awal, proses pengambilan data diarahkan untuk memperoleh putusan dengan domain **Pidana Umum - Pencurian** dari **PN Tangerang**.

Dalam proses pengumpulan data, tidak semua halaman putusan menyediakan file PDF atau ZIP yang dapat diunduh. Selain itu, akses otomatis ke halaman detail putusan juga dibatasi oleh mekanisme keamanan seperti verifikasi browser dan Cloudflare. Oleh karena itu, data yang digunakan dalam project ini berasal dari informasi HTML/list yang tersedia pada halaman Direktori Putusan MA.

Teks yang digunakan mencakup informasi seperti nomor perkara, tanggal putusan, pengadilan, jenis perkara, terdakwa, ringkasan/amar yang tersedia, serta informasi solusi yang dapat diekstrak dari halaman tersebut.

Keterbatasan ini dicatat karena sebagian halaman tidak menyediakan teks putusan lengkap dalam bentuk PDF. Namun, data yang tersedia tetap dapat digunakan untuk membangun pipeline CBR dan melakukan simulasi retrieval kasus serupa.

---

## Instalasi

Clone repository terlebih dahulu:

```bash
git clone <repository-url>
cd Penalaran-Komputer-subcpmk-3
```

Buat virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install dependency:

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

Daftarkan kernel Jupyter:

```bash
python -m ipykernel install --user --name cbr-pencurian-pn-tangerang --display-name "CBR Pencurian PN Tangerang"
```

Jalankan Jupyter Notebook:

```bash
jupyter notebook
```

---

## Cara Menjalankan Pipeline

Notebook dijalankan secara berurutan dari tahap pertama hingga evaluasi.

### 1. Data Collection

Notebook:

```text
notebooks/01_data_collection.ipynb
```

Tahap ini digunakan untuk membangun case base awal. Data putusan dikumpulkan dari Direktori Putusan MA dan disimpan dalam bentuk file teks pada folder:

```text
data/raw/
```

Output utama:

```text
data/raw/*.txt
data/processed/case_inventory.csv
```

File `case_inventory.csv` berisi daftar kasus, nomor perkara, tanggal putusan, jenis perkara, sumber URL, nama file raw, status pengambilan data, dan jumlah kata.

---

### 2. Case Representation

Notebook:

```text
notebooks/02_case_representation.ipynb
```

Tahap ini mengubah data raw menjadi struktur kasus yang lebih terorganisir. Setiap kasus direpresentasikan dalam bentuk metadata dan fitur teks.

Output utama:

```text
data/processed/cases.csv
```

Kolom utama yang digunakan antara lain:

- `case_id`
- `no_perkara`
- `tanggal_putusan`
- `pengadilan`
- `jenis_perkara`
- `terdakwa`
- `pasal`
- `amar_lainnya`
- `catatan_amar`
- `solution_text`
- `solution_label`
- `lama_pidana`
- `text_full`

Pada tahap ini, informasi solusi direpresentasikan melalui `solution_text` dan `solution_label`. Label solusi dibuat berdasarkan informasi hukuman yang tersedia, misalnya pidana penjara dengan rentang durasi tertentu.

---

### 3. Case Retrieval

Notebook:

```text
notebooks/03_case_retrieval.ipynb
```

Tahap ini membangun model retrieval untuk mencari kasus lama yang paling mirip dengan query kasus baru.

Metode yang digunakan:

- TF-IDF Vectorization
- Cosine Similarity
- Top-K Retrieval

Output utama:

```text
data/processed/tfidf_vectorizer.joblib
data/processed/tfidf_matrix.joblib
data/results/retrieval_results_sample.csv
data/eval/queries.json
```

Fungsi utama yang digunakan pada tahap ini adalah `retrieve(query, k=5)`, yaitu fungsi untuk mengembalikan lima kasus paling mirip berdasarkan skor cosine similarity.

---

### 4. Case Solution Reuse

Notebook:

```text
notebooks/04_solution_reuse.ipynb
```

Tahap ini menggunakan hasil retrieval untuk mengambil kembali solusi dari kasus-kasus lama yang paling mirip. Solusi yang digunakan berasal dari `solution_text`, `solution_label`, dan informasi lama pidana jika tersedia.

Metode reuse yang digunakan adalah weighted voting berdasarkan skor similarity dari top-k kasus.

Output utama:

```text
data/processed/case_solutions.json
data/results/predictions.csv
```

File `predictions.csv` berisi hasil prediksi solusi untuk query evaluasi, termasuk top-k case ID dan skor similarity.

---

### 5. Model Evaluation

Notebook:

```text
notebooks/05_evaluation.ipynb
```

Tahap ini digunakan untuk mengevaluasi performa retrieval dan prediksi solusi.

Metrik evaluasi yang digunakan:

- Accuracy
- Precision
- Recall
- F1-score
- Hit Rate@5
- Precision@5
- Recall@5
- F1@5

Output utama:

```text
data/eval/retrieval_metrics.csv
data/eval/prediction_metrics.csv
data/eval/retrieval_eval_detail.csv
data/eval/prediction_eval_detail.csv
data/eval/failure_analysis.csv
data/results/retrieval_metrics_bar.png
data/results/prediction_metrics_bar.png
```

---

## Metodologi

### Case Base

Case base dibangun dari 40 putusan pengadilan dalam domain Pidana Umum - Pencurian dari PN Tangerang. Setiap putusan disimpan sebagai file teks pada folder `data/raw/`.

### Case Representation

Setiap kasus direpresentasikan menggunakan metadata dan fitur teks. Informasi yang digunakan mencakup nomor perkara, tanggal putusan, terdakwa, jenis perkara, ringkasan putusan, dan solusi putusan.

### Case Retrieval

Retrieval dilakukan menggunakan TF-IDF dan cosine similarity. Setiap dokumen direpresentasikan sebagai vektor TF-IDF, kemudian query kasus baru dibandingkan dengan seluruh kasus di case base.

### Case Solution Reuse

Solusi dari kasus lama digunakan kembali berdasarkan top-k kasus paling mirip. Prediksi solusi dilakukan dengan weighted voting berdasarkan skor similarity.

### Evaluation

Evaluasi dilakukan untuk mengukur kualitas retrieval dan prediksi solusi. Hasil evaluasi disimpan dalam folder `data/eval/` dan visualisasi metrik disimpan dalam folder `data/results/`.

---

## Keterbatasan Project

Project ini memiliki beberapa keterbatasan:

1. Tidak semua halaman putusan menyediakan file PDF atau ZIP.
2. Sebagian data diperoleh dari HTML/list page, bukan full text PDF putusan.
3. Beberapa informasi seperti pasal dan lama pidana tidak selalu tersedia secara eksplisit.
4. Evaluasi menggunakan query internal yang dibuat dari data kasus, sehingga hasil evaluasi lebih tepat dipahami sebagai validasi teknis pipeline CBR, bukan evaluasi legal yang sepenuhnya independen.

Meskipun demikian, project ini sudah mencakup implementasi lengkap siklus CBR, mulai dari pembangunan case base hingga evaluasi model.

---

## Output Akhir

Output utama dari project ini adalah:

```text
data/processed/cases.csv
data/processed/case_solutions.json
data/results/predictions.csv
data/eval/retrieval_metrics.csv
data/eval/prediction_metrics.csv
```

File-file tersebut menunjukkan bahwa sistem sudah dapat melakukan representasi kasus, retrieval kasus serupa, reuse solusi, dan evaluasi performa.

---

## Kesimpulan

Project ini berhasil membangun sistem Case-Based Reasoning sederhana untuk retrieval putusan pengadilan pada domain Pidana Umum - Pencurian di PN Tangerang. Sistem mampu menyimpan 40 kasus ke dalam case base, merepresentasikan kasus dalam bentuk terstruktur, mencari kasus serupa menggunakan TF-IDF dan cosine similarity, menggunakan kembali solusi dari kasus terdahulu, serta mengevaluasi performa retrieval dan prediksi solusi.


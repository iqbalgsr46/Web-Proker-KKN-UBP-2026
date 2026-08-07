<!--
DOCUMENT METADATA
File       : API_DOCUMENTATION.md
Version    : 1.0.0
Generated  : 2026-08-08
Source     : Dianalisis dari source code project
Verified   : src/app/api/
-->

# API_DOCUMENTATION.md

> **Status Verifikasi**: ✅ Fully Verified
> **Sumber Utama**: `src/app/api/`

---

Dokumen ini menjelaskan endpoint backend internal (API Routes) yang dibangun menggunakan fungsi serverless Next.js.

## Public Endpoints (Tanpa Otorisasi)

### 1. Kumpulan Karya
- `GET /api/submissions`: Mengambil daftar karya (submissions) yang berstatus `APPROVED` untuk ditampilkan di Galeri publik.
- `POST /api/submissions`: Menerima unggahan form kirim karya baru. Secara default akan berstatus `PENDING` di DB.

### 2. Coloring Pages & Analytics
- `GET /api/coloring-pages`: Mengambil daftar lembar mewarnai untuk publik.
- `POST /api/coloring-pages/[id]/increment`: Memperbarui `downloadCount` / mencatat event interaksi pada spesifik Coloring Page, sekaligus berpotensi mencatat analitik scan.

### 3. Autentikasi
- `POST /api/admin/login`: Menerima `email` dan `password`, jika cocok akan merespons dengan menset cookie `admin_token` (JWT).

---

## Admin Endpoints (Otorisasi: Admin JWT Token)
Semua rute berikut diproteksi oleh `src/middleware.ts` dan mensyaratkan token JWT yang valid dalam cookie.

### 1. Manajemen Kategori
- `GET /api/admin/categories`: Mengambil semua kategori (termasuk yang tidak tampil di publik jika ada flag).
- `POST /api/admin/categories`: Membuat kategori baru (hanya Admin).

### 2. Manajemen Lembar Mewarnai (Coloring Pages)
- `POST /api/admin/coloring-pages`: Menambahkan Coloring Page baru (menyimpan referensi file gambar cetak, video, dll).
- `PATCH /api/admin/coloring-pages`: Mengubah detail informasi Coloring Page yang sudah ada.
- `DELETE /api/admin/coloring-pages`: Menghapus Coloring Page (akan memicu Cascade Delete pada tabel turunan).

### 3. Manajemen & Moderasi Karya (Submissions)
- `GET /api/admin/submissions`: Menarik seluruh karya, termasuk yang berstatus `PENDING`, untuk keperluan moderasi.
- `PATCH /api/admin/submissions`: Memperbarui data karya, seringkali untuk melakukan Approval (mengubah status menjadi `APPROVED` atau `REJECTED`).
- `DELETE /api/admin/submissions`: Menghapus entri pengajuan karya dari sistem.

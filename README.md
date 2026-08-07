<!--
DOCUMENT METADATA
File       : README.md
Version    : 1.0.0
Generated  : 2026-08-08
Source     : Dianalisis dari source code project
Verified   : package.json, src/app
-->

# EduColoring Web

> **Status Verifikasi**: ✅ Fully Verified
> **Sumber Utama**: `package.json`, `src/app`

---

## 📌 Pengenalan
EduColoring Web adalah platform edukasi interaktif berbasis web yang dirancang untuk mendukung kegiatan mewarnai anak-anak. Aplikasi ini memadukan pengalaman fisik (lembar mewarnai cetak ber-QR code) dengan pengalaman digital (video referensi, dan galeri karya online).

## 🚀 Fitur Utama
1. **Kumpulan Mewarnai**: Katalog lembar mewarnai digital yang dapat diunduh (sebagai file siap cetak) oleh pengguna.
2. **Integrasi QR Scan & Video Interaktif**: Lembar cetak dilengkapi dengan QR code yang jika di-scan akan mengarahkan pengguna ke halaman spesifik di web untuk menonton video animasi referensi.
3. **Kirim Karya**: Formulir bagi pengguna/orang tua untuk mengunggah foto hasil mewarnai yang telah diselesaikan.
4. **Galeri Karya**: Halaman etalase yang menampilkan kumpulan hasil mewarnai anak-anak yang telah melalui proses kurasi (disetujui).
5. **Dashboard Admin**: Sistem manajemen tertutup untuk pengelola guna mengatur kategori, konten halaman mewarnai, serta meninjau (Approve/Reject) kiriman karya pengguna.

## 🛠 Ringkasan Teknologi
- **Framework Utama**: Next.js 16 (React 19) dengan App Router.
- **Styling & Animasi**: Tailwind CSS v4, GSAP, Framer Motion, dan Three.js (untuk visual 3D interaktif).
- **Backend & Database**: Route API internal Next.js, ORM Prisma, dan database PostgreSQL.

## 📂 Dokumentasi Teknis
Untuk detail teknis lebih lanjut, silakan rujuk ke rangkaian dokumentasi berikut (berdasarkan urutan prioritas `DOCS_MANIFEST.md`):
- `PROJECT_OVERVIEW.md` - Konsep arsitektur dan logika sistem
- `TECH_STACK.md` - Detail library dan toolchain
- `FOLDER_STRUCTURE.md` - Peta direktori proyek
- `INSTALLATION.md` - Panduan setup lokal dan konfigurasi environment
- `DATABASE_SCHEMA.md` & `ERD.md` - Struktur dan relasi data
- `API_DOCUMENTATION.md` - Spesifikasi endpoint

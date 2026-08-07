<!--
DOCUMENT METADATA
File       : PROJECT_OVERVIEW.md
Version    : 1.0.0
Generated  : 2026-08-08
Source     : Dianalisis dari source code project
Verified   : src/app, prisma/schema.prisma
-->

# PROJECT_OVERVIEW.md

> **Status Verifikasi**: ✅ Fully Verified
> **Sumber Utama**: `src/app`, `prisma/schema.prisma`

---

## Ringkasan Eksekutif
EduColoring Web adalah platform yang menjembatani aktivitas mewarnai tradisional (fisik) dengan interaksi digital. Anak-anak atau guru dapat mengunduh lembar mewarnai dalam bentuk **file gambar siap cetak**, mewarnainya, lalu memindai (scan) QR code pada lembar fisik tersebut untuk berinteraksi lebih lanjut secara digital, seperti menonton video panduan 3D/animasi. Setelah selesai, karya dapat diunggah ke website untuk dikurasi oleh admin dan ditampilkan pada halaman Galeri publik.

## Arsitektur Sistem Utama
Aplikasi dibangun menggunakan pola arsitektur **Monolith (Frontend & Backend digabung)** dengan Next.js App Router:
- **Client/Frontend**: Menggunakan Server Components dan Client Components dari React 19. Memanfaatkan GSAP, Three.js, dan TailwindCSS untuk memberikan kesan visual yang interaktif (Premium Gloss, Glassmorphism).
- **Backend/API Layer**: Endpoint API dibuat di `src/app/api` untuk diakses oleh client atau via HTTP request standar.
- **Database Layer**: Menggunakan PostgreSQL (dihosting di Supabase) yang diakses menggunakan Prisma ORM.

## Daftar Fitur dan Kegunaannya
1. **Public View**:
   - `Halaman Utama (Landing)`: Berisi pengenalan dan navigasi.
   - `Kategori & Kumpulan Mewarnai`: Halaman katalog untuk mencari dan memfilter lembar mewarnai.
   - `Mewarnai (Detail Page)`: Menampilkan preview, tombol unduh file gambar, dan video referensi.
   - `Scan`: Modul khusus untuk memproses URL QR code dan mencatat analitik pemindaian.
   - `Kirim Karya`: Form unggah gambar hasil karya pengguna.
   - `Galeri`: Menampilkan karya dengan status `APPROVED`.

2. **Admin View (`/admin`)**:
   - Autentikasi berbasis form dan JWT.
   - Manajemen *Category* (CRUD).
   - Manajemen *Coloring Pages* (CRUD URL Gambar Cetak, Video, Thumbnail).
   - Moderasi *Submissions* (Approve/Reject karya masuk).

## Alur Data (Data Flow) Singkat

Berikut adalah visualisasi alur interaksi pengguna dari mengunduh hingga karya mereka tampil di galeri:

```mermaid
---
title: Alur Data Penggunaan EduColoring Web
---
flowchart TD
    A([Mulai]) --> B[Pengguna Mengunduh Gambar Cetak]
    B --> C[Pengguna Mewarnai Secara Fisik]
    C --> D{Apakah scan QR code?}
    D -- Ya --> E[Sistem mencatat ScanAnalytic]
    E --> F[Tampil Video Referensi Animasi]
    D -- Tidak --> G[Pengguna mengirim hasil karya (Kirim Karya)]
    F --> G
    
    G --> H[Data Karya tersimpan di DB status: PENDING]
    H --> I[Admin meninjau karya di Dashboard]
    I --> J{Keputusan Moderasi}
    J -- Reject --> K[Status menjadi REJECTED (Tidak Tampil)]
    J -- Approve --> L[Status menjadi APPROVED]
    
    L --> M([Karya Tampil di Halaman Galeri Publik])
```

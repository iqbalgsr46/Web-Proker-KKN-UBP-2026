<!--
DOCUMENT METADATA
File       : FOLDER_STRUCTURE.md
Version    : 1.0.0
Generated  : 2026-08-08
Source     : Dianalisis dari source code project
Verified   : Root directory, src/
-->

# FOLDER_STRUCTURE.md

> **Status Verifikasi**: ✅ Fully Verified
> **Sumber Utama**: Struktur root dan `src/`

---

## Peta Direktori Tingkat Tinggi

```text
educoloring-web/
├── docs/                 # Dokumentasi proyek (file markdown ini)
├── prisma/               # Konfigurasi database dan ORM
│   ├── schema.prisma     # Definisi model database
│   └── seed.ts           # Skrip seeder inisial database
├── public/               # Aset statis yang diakses publik (gambar, favicon)
├── src/                  # Kode sumber utama aplikasi
│   ├── app/              # Next.js App Router (Routing dan Halaman)
│   ├── components/       # Komponen React yang dapat digunakan ulang
│   ├── lib/              # Fungsi utilitas, helper, dan inisialisasi library
│   ├── registry/         # Konfigurasi registry internal atau desain sistem tambahan
│   └── middleware.ts     # Middleware Next.js (proteksi rute API & admin)
├── .env                  # Variabel environment (koneksi DB, JWT secret, Supabase)
├── package.json          # Metadata proyek dan dependensi npm
├── next.config.ts        # Konfigurasi compiler Next.js
├── tailwind.config.js    # (Jika ada) Konfigurasi desain token Tailwind (biasanya di v4 ada di globals.css)
└── tsconfig.json         # Konfigurasi TypeScript
```

## Detail Direktori `src/app` (Routing)

Next.js App Router menggunakan folder untuk menentukan rute. Berikut adalah struktur fitur utama:

```text
src/app/
├── admin/                # Rute: /admin (Dashboard manajemen tertutup)
├── api/                  # Rute: /api (Endpoint backend)
│   ├── admin/            # -> Endpoint CRUD untuk Admin
│   ├── coloring-pages/   # -> Endpoint analitik dan query list halaman mewarnai
│   └── submissions/      # -> Endpoint untuk mengirim dan mengambil karya publik
├── galeri/               # Rute: /galeri (Menampilkan karya approved)
├── kategori/             # Rute: /kategori (List berdasarkan kategori)
├── kirim-karya/          # Rute: /kirim-karya (Formulir pengiriman karya)
├── kumpulan-mewarnai/    # Rute: /kumpulan-mewarnai (Katalog semua lembar mewarnai)
├── mewarnai/             # Rute: /mewarnai/[slug] (Halaman detail lembar mewarnai)
├── scan/                 # Rute: /scan (Redirect & analitik ketika QR di-scan)
├── tentang/              # Rute: /tentang (Halaman informasi project)
├── globals.css           # File styling utama (Tailwind v4 base imports & custom properties)
└── layout.tsx            # Root layout aplikasi (membungkus seluruh rute)
```

## Detail Direktori `src/components` (UI)

```text
src/components/
├── admin/                # Komponen khusus panel Admin (tabel, form, sidebar admin)
├── game/                 # Komponen terkait elemen interaktif atau canvas
├── shared/               # Komponen yang dibagikan antar fitur (Navbar, Footer, Blob Background)
└── ui/                   # Komponen desain dasar (Tombol, Input, Modal, GlassCard)
```

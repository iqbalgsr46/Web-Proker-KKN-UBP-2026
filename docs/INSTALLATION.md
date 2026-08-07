<!--
DOCUMENT METADATA
File       : INSTALLATION.md
Version    : 1.0.0
Generated  : 2026-08-08
Source     : Dianalisis dari source code project
Verified   : package.json
-->

# INSTALLATION.md

> **Status Verifikasi**: ✅ Fully Verified
> **Sumber Utama**: `package.json`

---

## 1. Persyaratan Sistem (Prerequisites)
Sebelum menjalankan proyek ini, pastikan Anda telah menginstal:
- **Node.js**: Versi 20.x atau lebih baru.
- **npm** (Node Package Manager).
- **PostgreSQL Database** (Lokal, atau dapat menggunakan layanan seperti Supabase).

## 2. Kloning Repositori
```bash
git clone <url-repo-anda>
cd educoloring-web
```

## 3. Instalasi Dependensi
Jalankan perintah berikut di dalam direktori proyek:
```bash
npm install
```
*(Catatan: Langkah ini secara otomatis akan menjalankan `npm run postinstall` yang berisi `prisma generate` untuk membangun klien ORM).*

## 4. Konfigurasi Environment
Salin file `.env.example` ke `.env` (atau buat file `.env` baru berdasarkan dokumen `ENVIRONMENT_VARIABLES.md`), lalu isi nilai yang sesuai:
- `DATABASE_URL`
- `DIRECT_URL`
- `JWT_SECRET`
- dll.

## 5. Menjalankan Migrasi Database
Jika Anda menggunakan database baru, buat tabel-tabelnya dengan menjalankan:
```bash
npx prisma db push
# atau
npx prisma migrate dev
```

*(Opsional)* Anda juga dapat mengisi data awal dengan menjalankan seed:
```bash
npx prisma db seed
```

## 6. Menjalankan Server Pengembangan (Development)
Jalankan perintah:
```bash
npm run dev
```
Buka browser dan akses `http://localhost:3000`. Server pengembangan akan melakukan hot-reloading setiap ada perubahan file.

## 7. Melakukan Build (Produksi)
Untuk mem-build proyek secara optimal:
```bash
npm run build
npm run start
```

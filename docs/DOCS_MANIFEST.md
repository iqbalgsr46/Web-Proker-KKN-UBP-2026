<!--
DOCUMENT METADATA
File       : DOCS_MANIFEST.md
Version    : 1.0.0
Generated  : 2026-08-08
Source     : Dianalisis dari source code project
Verified   : package.json, prisma/schema.prisma, src/
-->

# DOCS_MANIFEST.md

> **Status Verifikasi**: ✅ Fully Verified
> **Sumber Utama**: `package.json`, `prisma/schema.prisma`, `src/`

---

## Status Dokumentasi Project

| # | File | Status | Sumber Verifikasi | Catatan |
|---|------|--------|-------------------|---------|
| 1 | DOCS_MANIFEST.md | ✅ Selesai | `package.json`, `src/` | - |
| 2 | README.md | ✅ Selesai | `package.json`, `src/` | Ditulis di direktori root |
| 3 | PROJECT_OVERVIEW.md | ✅ Selesai | `src/app`, `prisma/schema.prisma` | - |
| 4 | TECH_STACK.md | ✅ Selesai | `package.json` | - |
| 5 | FOLDER_STRUCTURE.md | ✅ Selesai | Root directory, `src/` | - |
| 6 | SYSTEM_ARCHITECTURE.md | ✅ Selesai | `src/app`, `src/middleware.ts` | - |
| 7 | INSTALLATION.md | ✅ Selesai | `package.json` | - |
| 8 | ENVIRONMENT_VARIABLES.md | ✅ Selesai | `.env` | - |
| 9 | DATABASE_SCHEMA.md | ✅ Selesai | `prisma/schema.prisma` | - |
| 10 | ERD.md | ✅ Selesai | `prisma/schema.prisma` | - |
| 11 | API_DOCUMENTATION.md | ✅ Selesai | `src/app/api/` | - |
| 12 | AUTHENTICATION.md | ✅ Selesai | `src/middleware.ts` | - |
| 13 | PAGE_DOCUMENTATION.md | ✅ Selesai | `src/app/` | - |
| 14 | COMPONENT_DOCUMENTATION.md | ✅ Selesai | `src/components/` | - |

## Temuan Penting yang Perlu Konsistensi
- Aplikasi menggunakan arsitektur **Next.js 16 App Router**.
- Fitur backend beroperasi melalui **API Routes** (`src/app/api`).
- Database menggunakan **PostgreSQL** dengan ORM **Prisma**.
- Animasi frontend mengandalkan **GSAP**, **Framer Motion**, dan **Three.js**, dengan styling **Tailwind CSS v4**.
- Sistem Autentikasi hanya untuk role **Admin**, ditangani via custom JWT di `src/middleware.ts`.

## Glosarium Teknis Project
- **Coloring Page (Lembar Mewarnai)**: Halaman atau entitas utama yang berisi file gambar siap cetak, video referensi, dan QR code.
- **Submission (Karya)**: Hasil pengerjaan mewarnai anak-anak yang diunggah untuk dikurasi oleh admin (Status: PENDING, APPROVED, REJECTED).
- **Scan Analytic**: Rekaman data metrik ketika pengguna memindai QR code pada lembar pewarnaan cetak.
- **Category**: Pengelompokan logis dari daftar Coloring Page.

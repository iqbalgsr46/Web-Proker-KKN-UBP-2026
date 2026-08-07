<!--
DOCUMENT METADATA
File       : DATABASE_SCHEMA.md
Version    : 1.0.0
Generated  : 2026-08-08
Source     : Dianalisis dari source code project
Verified   : prisma/schema.prisma
-->

# DATABASE_SCHEMA.md

> **Status Verifikasi**: ✅ Fully Verified
> **Sumber Utama**: `prisma/schema.prisma`

---

Berikut adalah rincian skema database berdasarkan definisi model Prisma.

## 1. Tabel `Admin`
Menyimpan data kredensial untuk login admin.
| Kolom | Tipe Data | Constraint | Deskripsi |
|-------|-----------|------------|-----------|
| `id` | String | PK, cuid | Primary key unik |
| `name` | String | - | Nama admin |
| `email` | String | Unique | Email login |
| `password` | String | - | Hashed password |
| `createdAt` | DateTime | default(now) | Waktu pembuatan |
| `updatedAt` | DateTime | @updatedAt | Waktu update terakhir |

## 2. Tabel `Category`
Kategori untuk mengelompokkan lembar mewarnai.
| Kolom | Tipe Data | Constraint | Deskripsi |
|-------|-----------|------------|-----------|
| `id` | String | PK, cuid | Primary key |
| `name` | String | - | Nama kategori |
| `slug` | String | Unique | Slug URL-friendly |
| `description` | String? | Nullable | Deskripsi opsional |
| `imageUrl` | String? | Nullable | URL gambar ikon kategori |
| `createdAt` | DateTime | default(now) | - |
| `updatedAt` | DateTime | @updatedAt | - |

## 3. Tabel `ColoringPage`
Katalog utama lembar mewarnai.
| Kolom | Tipe Data | Constraint | Deskripsi |
|-------|-----------|------------|-----------|
| `id` | String | PK, cuid | - |
| `categoryId`| String | FK | Merujuk ke `Category.id` |
| `title` | String | - | Judul gambar |
| `slug` | String | Unique | Slug URL |
| `description`| String? | Nullable | - |
| `objective` | String? | Nullable | Tujuan edukasi |
| `pdfUrl` | String? | Nullable | URL file gambar siap cetak A4 |
| `thumbnailUrl`| String | - | Gambar pratinjau |
| `videoUrl` | String | - | URL video referensi interaktif |
| `qrCodeUrl` | String? | Nullable | URL hasil generate image QR Code |
| `downloadCount`| Int | default(0) | Jumlah unduhan/view |
| `createdAt` | DateTime | default(now) | - |
| `updatedAt` | DateTime | @updatedAt | - |

## 4. Tabel `ScanAnalytic`
Mencatat data analitik setiap kali QR code sebuah Coloring Page di-scan.
| Kolom | Tipe Data | Constraint | Deskripsi |
|-------|-----------|------------|-----------|
| `id` | String | PK, cuid | - |
| `coloringPageId`| String | FK (Cascade) | Merujuk ke `ColoringPage.id` |
| `userAgent` | String? | Nullable | Info browser/device yang scan |
| `scannedAt` | DateTime | default(now) | Timestamp scan |

## 5. Tabel `Submission`
Karya yang dikirimkan oleh pengguna/orang tua.
| Kolom | Tipe Data | Constraint | Deskripsi |
|-------|-----------|------------|-----------|
| `id` | String | PK, cuid | - |
| `coloringPageId`| String | FK (Cascade) | Merujuk ke `ColoringPage.id` |
| `submitterName`| String | - | Nama orang tua / guru pengirim |
| `childName` | String | - | Nama anak |
| `imageUrl` | String | - | URL foto/hasil pengerjaan |
| `status` | String | default("PENDING")| Status: PENDING, APPROVED, REJECTED, ARCHIVED |
| `createdAt` | DateTime | default(now) | - |

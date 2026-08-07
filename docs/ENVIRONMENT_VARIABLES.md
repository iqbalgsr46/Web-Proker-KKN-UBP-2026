<!--
DOCUMENT METADATA
File       : ENVIRONMENT_VARIABLES.md
Version    : 1.0.0
Generated  : 2026-08-08
Source     : Dianalisis dari source code project
Verified   : .env
-->

# ENVIRONMENT_VARIABLES.md

> **Status Verifikasi**: ✅ Fully Verified
> **Sumber Utama**: `.env`

---

File `.env` di direktori root digunakan untuk menyimpan konfigurasi sensitif. Berikut adalah daftar variabel yang diperlukan beserta fungsinya:

| Variabel | Deskripsi | Contoh Nilai / Format |
|----------|-----------|-----------------------|
| `DATABASE_URL` | URL koneksi ke PostgreSQL via pooler (mode transaksi). Sangat penting untuk Next.js serverless route. | `postgresql://user:pass@host:6543/db?pgbouncer=true` |
| `DIRECT_URL` | URL koneksi ke PostgreSQL langsung (session-mode). Digunakan oleh Prisma untuk menjalankan migration (`prisma migrate`). | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | Secret key (string) untuk penandatanganan dan verifikasi JSON Web Tokens yang digunakan untuk login Admin. | `kkn_educoloring_super_secret_admin_key` |
| `NEXT_PUBLIC_SUPABASE_URL` | Endpoint URL dari proyek Supabase Anda (bisa dibaca oleh browser/client side). | `https://[ID].supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Kunci anonim (API Key) Supabase untuk keperluan akses publik (bisa dibaca oleh browser/client side). | `sb_publishable_...` |

> ⚠️ **Penting**: Jangan pernah mem-commit file `.env` asli Anda ke dalam version control. Selalu gunakan `.env.example` sebagai referensi struktur.

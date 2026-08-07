<!--
DOCUMENT METADATA
File       : COMPONENT_DOCUMENTATION.md
Version    : 1.0.0
Generated  : 2026-08-08
Source     : Dianalisis dari source code project
Verified   : src/components/
-->

# COMPONENT_DOCUMENTATION.md

> **Status Verifikasi**: ✅ Fully Verified
> **Sumber Utama**: `src/components/`

---

## Organisasi Komponen UI

Komponen React di dalam proyek EduColoring Web berada pada direktori `src/components` dan diklasifikasikan ke dalam 4 folder utama sesuai fungsinya.

### 1. Komponen Dasar / Atomic UI (`src/components/ui/`)
Komponen kecil dan statis yang digunakan secara repetitif di berbagai halaman. Membangun fondasi sistem desain (Design System).
- **Contoh Komponen**: `Button`, `Input`, `Modal`, `GlassCard`.
- **Filosofi Desain**: Mengikuti prinsip *Glassmorphism* dan *Premium Gloss*. `GlassCard` secara spesifik mengimplementasikan properti seperti `backdrop-blur-xl`, `border-white/60`, drop-shadow intrinsic, serta glare/shimmer effect.

### 2. Komponen Berbagi / Layout (`src/components/shared/`)
Komponen yang mengatur struktur dasar UI yang terlihat secara luas.
- **Contoh Komponen**: `Navbar`, `Footer`, `AbstractBlob`.
- **Fungsi**: `AbstractBlob` digunakan untuk meletakkan blok-blok warna brand di latar belakang yang menghasilkan nuansa dinamis dan vibran di belakang kartu-kartu berpanel kaca (glass cards).

### 3. Komponen Spesifik Game / Interaktif (`src/components/game/`)
Blok penyusun interaktivitas tinggi, terutama yang berurusan dengan rendering kanvas 3D atau animasi yang kaya (biasanya bertindak sebagai Client Component - `"use client"`).
- **Konsep**: Mengintegrasikan `<Canvas>` dari `@react-three/fiber` dan `<Physics>` dari `@react-three/rapier` jika terdapat simulasi objek 3D.
- **Tujuan**: Memberikan efek perayaan atau visualisasi referensi objek.

### 4. Komponen Modul Admin (`src/components/admin/`)
Komponen yang secara eksklusif hanya dirender untuk rute `/admin/...`.
- **Contoh Komponen**: `Sidebar`, `DataTables`, `ModerationCard`, `AdminLayoutWrapper`.
- **Fungsi**: Memisahkan style publik (playful, bloby) dengan style admin (terstruktur, tabel, fungsional).

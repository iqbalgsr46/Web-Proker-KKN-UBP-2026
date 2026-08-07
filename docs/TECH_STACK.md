<!--
DOCUMENT METADATA
File       : TECH_STACK.md
Version    : 1.0.0
Generated  : 2026-08-08
Source     : Dianalisis dari source code project
Verified   : package.json
-->

# TECH_STACK.md

> **Status Verifikasi**: ✅ Fully Verified
> **Sumber Utama**: `package.json`

---

## 1. Core Framework & Language
- **Bahasa Pemrograman**: TypeScript (dengan Node.js v20+)
- **Framework Aplikasi**: Next.js 16.2.12
- **UI Library**: React 19.2.4 & React DOM 19.2.4

## 2. Frontend Styling & Animation
Sesuai arahan *"WOW Design Guidelines"* (Glassmorphism, Blob abstrak, Premium Gloss):
- **Styling**: Tailwind CSS v4 (melalui `@tailwindcss/postcss`)
- **Utility Styling**: `clsx` & `tailwind-merge` untuk merakit class tailwind dinamis.
- **2D Animations**: `framer-motion` (v12.43.0), `gsap` (v3.15.0).
- **3D Render & Animations**: 
  - `three` (v0.185.1)
  - `@react-three/fiber` (v9.7.0) & `@react-three/drei` (v10.7.7)
  - `@react-three/rapier` (v2.2.0) - Physics engine untuk 3D.
  - `ogl` (v1.0.11) & `meshline` (v3.3.1).
- **Interaksi Mikro**: `canvas-confetti` (efek perayaan), `lenis` (smooth scrolling).
- **Icons**: `lucide-react`

## 3. Backend & Data Management
- **ORM (Object Relational Mapping)**: Prisma Client & Prisma CLI (v7.9.1)
- **Database Engine**: PostgreSQL (via adapter `@prisma/adapter-pg` dan `pg` v8.22.0)
- **Authentication**: `jose` (v6.2.7) untuk pembuatan dan verifikasi JWT token secara ringan di level Middleware.
- **Security**: `bcryptjs` (v3.0.3) untuk hashing password Admin.
- **Storage/BaaS**: Supabase SDK (`@supabase/supabase-js` v2.111.0) untuk manajemen storage/blob.

## 4. Utilities
- **QR Code Generator**: `qrcode` (v1.5.4) untuk pembuatan image QR pada lembar gambar cetak.
- **Image Processing**: `sharp` (v0.35.3) digunakan Next.js untuk optimasi gambar.
- **Code Quality**: ESLint v9.

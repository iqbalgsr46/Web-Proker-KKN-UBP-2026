<!--
DOCUMENT METADATA
File       : ERD.md
Version    : 1.0.0
Generated  : 2026-08-08
Source     : Dianalisis dari source code project
Verified   : prisma/schema.prisma
-->

# ERD.md

> **Status Verifikasi**: ✅ Fully Verified
> **Sumber Utama**: `prisma/schema.prisma`

---

## Entity Relationship Diagram

Diagram berikut merepresentasikan relasi antar tabel pada sistem database EduColoring Web.

```mermaid
erDiagram
    Category ||--o{ ColoringPage : "has many"
    ColoringPage ||--o{ ScanAnalytic : "tracked via"
    ColoringPage ||--o{ Submission : "receives"

    Admin {
        String id PK
        String name
        String email UK
        String password
        DateTime createdAt
        DateTime updatedAt
    }

    Category {
        String id PK
        String name
        String slug UK
        String description
        String imageUrl
        DateTime createdAt
        DateTime updatedAt
    }

    ColoringPage {
        String id PK
        String categoryId FK
        String title
        String slug UK
        String description
        String objective
        String pdfUrl
        String thumbnailUrl
        String videoUrl
        String qrCodeUrl
        Int downloadCount
        DateTime createdAt
        DateTime updatedAt
    }

    ScanAnalytic {
        String id PK
        String coloringPageId FK "Cascade onDelete"
        String userAgent
        DateTime scannedAt
    }

    Submission {
        String id PK
        String coloringPageId FK "Cascade onDelete"
        String submitterName
        String childName
        String imageUrl
        String status
        DateTime createdAt
    }
```

## Keterangan Relasi
1. **Category (1) -> (N) ColoringPage**: Satu kategori (misalnya "Hewan") dapat memiliki banyak halaman mewarnai. Field penghubung: `ColoringPage.categoryId`.
2. **ColoringPage (1) -> (N) ScanAnalytic**: Setiap halaman mewarnai dapat discan berkali-kali, menghasilkan banyak baris analitik. Jika `ColoringPage` dihapus, `ScanAnalytic` terkait akan terhapus otomatis (`Cascade`).
3. **ColoringPage (1) -> (N) Submission**: Satu halaman mewarnai dapat diselesaikan oleh banyak anak. Jika `ColoringPage` dihapus, `Submission` terkait akan terhapus (`Cascade`).
4. **Admin**: Merupakan tabel independen yang tidak memiliki relasi Foreign Key (FK) secara langsung dengan entitas lain, murni untuk fungsi manajemen sesi.

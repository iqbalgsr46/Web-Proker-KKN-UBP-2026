import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const MAX_GALLERY = 30; // Batas maksimal karya yang tampil di galeri

// GET: Ambil semua submissions untuk admin (realtime polling)
export async function GET() {
  try {
    const submissions = await prisma.submission.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        coloringPage: { select: { title: true } },
      },
    });

    const approvedCount = await prisma.submission.count({
      where: { status: "APPROVED" },
    });

    return NextResponse.json({
      success: true,
      data: submissions,
      galleryCount: approvedCount,
      galleryMax: MAX_GALLERY,
    });
  } catch (error) {
    console.error("Admin submissions GET error:", error);
    return NextResponse.json({ error: "Gagal memuat data." }, { status: 500 });
  }
}

// PATCH: Update submission status (approve/reject) dengan rotasi galeri otomatis
export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !["APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
    }

    // Jika menyetujui karya, cek apakah galeri sudah penuh
    if (status === "APPROVED") {
      const approvedCount = await prisma.submission.count({
        where: { status: "APPROVED" },
      });

      // Jika galeri sudah penuh, arsipkan karya paling lama
      if (approvedCount >= MAX_GALLERY) {
        const oldest = await prisma.submission.findFirst({
          where: { status: "APPROVED" },
          orderBy: { createdAt: "asc" },
        });

        if (oldest) {
          await prisma.submission.update({
            where: { id: oldest.id },
            data: { status: "ARCHIVED" },
          });
        }
      }
    }

    const submission = await prisma.submission.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, submission });
  } catch (error) {
    console.error("Submission update error:", error);
    return NextResponse.json({ error: "Gagal memperbarui karya." }, { status: 500 });
  }
}

// DELETE: Hapus submission
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
    }

    await prisma.submission.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submission delete error:", error);
    return NextResponse.json({ error: "Gagal menghapus karya." }, { status: 500 });
  }
}

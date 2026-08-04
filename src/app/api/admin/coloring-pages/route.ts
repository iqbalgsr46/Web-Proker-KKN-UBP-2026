import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST: Buat coloring page baru
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, slug, description, objective, pdfUrl, thumbnailUrl, videoUrl, categoryId } = data;

    if (!title || !slug || !pdfUrl || !categoryId) {
      return NextResponse.json({ error: "Data wajib tidak lengkap." }, { status: 400 });
    }

    const newPage = await prisma.coloringPage.create({
      data: {
        title,
        slug,
        description,
        objective,
        pdfUrl,
        thumbnailUrl: thumbnailUrl || "",
        videoUrl: videoUrl || "",
        categoryId,
      },
    });

    return NextResponse.json({ success: true, data: newPage });
  } catch (error) {
    console.error("ColoringPage create error:", error);
    return NextResponse.json({ error: "Gagal menyimpan data ke database." }, { status: 500 });
  }
}

// DELETE: Hapus coloring page
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
    }

    await prisma.coloringPage.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ColoringPage delete error:", error);
    return NextResponse.json({ error: "Gagal menghapus lembar mewarnai." }, { status: 500 });
  }
}
// PATCH: Update coloring page
export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    const { id, title, description, objective, videoUrl, categoryId } = data;

    if (!id) {
      return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
    }

    const updatedPage = await prisma.coloringPage.update({
      where: { id },
      data: {
        title,
        description,
        objective,
        videoUrl,
        categoryId,
      },
    });

    return NextResponse.json({ success: true, data: updatedPage });
  } catch (error) {
    console.error("ColoringPage update error:", error);
    return NextResponse.json({ error: "Gagal memperbarui data ke database." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET: Ambil karya yang sudah disetujui untuk galeri publik
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "APPROVED";
    const limit = parseInt(searchParams.get("limit") || "30");

    const submissions = await prisma.submission.findMany({
      where: { status },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        coloringPage: { select: { title: true, slug: true } },
      },
    });

    return NextResponse.json({ success: true, data: submissions });
  } catch (error) {
    console.error("Public submissions GET error:", error);
    return NextResponse.json({ error: "Gagal memuat karya." }, { status: 500 });
  }
}

// POST: Guru/orang tua mengirimkan karya anak (publik, tanpa login)
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { submitterName, childName, coloringPageId, imageUrl } = data;

    if (!submitterName || !childName || !coloringPageId || !imageUrl) {
      return NextResponse.json(
        { error: "Semua field wajib diisi: nama pengirim, nama anak, lembar mewarnai, dan foto karya." },
        { status: 400 }
      );
    }

    // Validasi bahwa coloringPageId valid
    const page = await prisma.coloringPage.findUnique({
      where: { id: coloringPageId },
    });

    if (!page) {
      return NextResponse.json(
        { error: "Lembar mewarnai tidak ditemukan." },
        { status: 404 }
      );
    }

    const submission = await prisma.submission.create({
      data: {
        submitterName,
        childName,
        coloringPageId,
        imageUrl,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, data: submission });
  } catch (error) {
    console.error("Public submissions POST error:", error);
    return NextResponse.json({ error: "Gagal mengirim karya." }, { status: 500 });
  }
}

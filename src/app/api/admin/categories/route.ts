import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "Gagal memuat kategori" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data.name) {
      return NextResponse.json({ error: "Nama kategori wajib diisi." }, { status: 400 });
    }

    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const newCategory = await prisma.category.create({
      data: {
        name: data.name,
        slug: slug,
        description: data.description || "",
      }
    });
    return NextResponse.json({ success: true, data: newCategory });
  } catch (error) {
    return NextResponse.json({ error: "Gagal membuat kategori" }, { status: 500 });
  }
}

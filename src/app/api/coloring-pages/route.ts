import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET: Fetch all public coloring pages
export async function GET() {
  try {
    const pages = await prisma.coloringPage.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
    
    return NextResponse.json({ success: true, data: pages });
  } catch (error) {
    console.error("Failed to fetch coloring pages:", error);
    return NextResponse.json({ error: "Gagal mengambil data lembar mewarnai." }, { status: 500 });
  }
}

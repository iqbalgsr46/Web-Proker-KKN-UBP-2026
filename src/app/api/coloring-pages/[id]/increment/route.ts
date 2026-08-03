import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id: idOrSlug } = params;
    const body = await req.json();
    const { type } = body;

    // Cari berdasarkan ID atau Slug
    const page = await prisma.coloringPage.findFirst({
      where: {
        OR: [
          { id: idOrSlug },
          { slug: idOrSlug }
        ]
      }
    });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    if (type === "download") {
      await prisma.coloringPage.update({
        where: { id: page.id },
        data: { downloadCount: { increment: 1 } },
      });
    } else if (type === "scan") {
      await prisma.scanAnalytic.create({
        data: {
          coloringPageId: page.id,
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Increment error:", error);
    return NextResponse.json(
      { error: "Failed to increment" },
      { status: 500 }
    );
  }
}

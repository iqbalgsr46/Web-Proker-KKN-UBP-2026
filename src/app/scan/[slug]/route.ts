import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const params = await context.params;
    const { slug } = params;

    const page = await prisma.coloringPage.findUnique({
      where: { slug },
    });

    if (!page) {
      return NextResponse.redirect(new URL("/kumpulan-mewarnai", request.url));
    }

    // Catat analytics scan
    try {
      await prisma.scanAnalytic.create({
        data: {
          coloringPageId: page.id,
          userAgent: request.headers.get("user-agent") || "unknown",
        },
      });
    } catch (analyticError) {
      console.error("Gagal mencatat scan analytic:", analyticError);
      // Lanjutkan saja meski analitik gagal
    }

    // Redirect ke video URL aslinya
    if (page.videoUrl) {
      let finalUrl = page.videoUrl.trim();
      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = 'https://' + finalUrl;
      }
      return NextResponse.redirect(finalUrl);
    }

    // Fallback jika tidak ada video url
    return NextResponse.redirect(new URL("/kumpulan-mewarnai", request.url));
  } catch (error) {
    console.error("Scan redirect error:", error);
    return NextResponse.redirect(new URL("/kumpulan-mewarnai", request.url));
  }
}

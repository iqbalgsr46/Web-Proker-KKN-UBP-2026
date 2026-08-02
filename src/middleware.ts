import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Lindungi semua route yang berawalan /admin
  if (pathname.startsWith("/admin")) {
    // Kecualikan rute login agar tidak terjadi redirect loop
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      // Jika tidak ada token, arahkan ke halaman login
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Verifikasi token
    const verifiedToken = await verifyToken(token);

    if (!verifiedToken) {
      // Token tidak valid atau kadaluarsa
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("admin_token");
      return response;
    }

    // Jika berhasil diverifikasi, biarkan lanjut
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  // Jalankan middleware ini hanya pada route admin
  matcher: ["/admin/:path*"],
};

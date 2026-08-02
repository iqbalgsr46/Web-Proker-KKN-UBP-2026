import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH: Update submission status (approve/reject)
export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !["APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
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

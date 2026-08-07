import { StatCard } from "@/components/admin/StatCard";
import { Download, Image, ScanLine, Clock, Paintbrush } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const metadata = {
  title: "Dashboard | EduColoring Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Query data real dari database
  const [
    totalDownloads,
    totalScans,
    pendingSubmissions,
    totalApproved,
    totalColoringPages,
    recentSubmissions,
  ] = await Promise.all([
    // Total unduhan (sum semua downloadCount)
    prisma.coloringPage.aggregate({ _sum: { downloadCount: true } }),
    // Total scan QR
    prisma.scanAnalytic.count(),
    // Karya menunggu persetujuan
    prisma.submission.count({ where: { status: "PENDING" } }),
    // Karya disetujui
    prisma.submission.count({ where: { status: "APPROVED" } }),
    // Total lembar mewarnai
    prisma.coloringPage.count(),
    // 5 karya terbaru
    prisma.submission.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        coloringPage: { select: { title: true } },
      },
    }),
  ]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Ringkasan Aktivitas</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Pantau perkembangan dan partisipasi anak-anak di EduColoring.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 mb-8 md:mb-12">
        <StatCard 
          title="Lembar Mewarnai" 
          value={totalColoringPages} 
          icon={Paintbrush} 
          description="Total lembar"
        />
        <StatCard 
          title="Total Unduhan PDF" 
          value={totalDownloads._sum.downloadCount ?? 0} 
          icon={Download} 
          description="Semua waktu"
        />
        <StatCard 
          title="Total Scan QR Code" 
          value={totalScans} 
          icon={ScanLine} 
          description="Semua waktu"
        />
        <StatCard 
          title="Menunggu Persetujuan" 
          value={pendingSubmissions} 
          icon={Clock} 
          trend={pendingSubmissions > 0 ? "up" : "neutral"}
          description="Perlu ditinjau"
        />
        <StatCard 
          title="Karya Disetujui" 
          value={totalApproved} 
          icon={Image} 
          description="Total karya"
        />
      </div>

      {/* Recent Submissions */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Karya Terbaru</h2>
          <a href="/admin/karya" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">
            Lihat Semua
          </a>
        </div>
        
        {recentSubmissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 md:py-12 text-center border-2 border-dashed border-gray-100 rounded-2xl">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
              <Image className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium max-w-sm text-sm">
              Belum ada karya yang dikirimkan oleh anak-anak.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile: Card List */}
            <div className="md:hidden flex flex-col gap-3">
              {recentSubmissions.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-gray-900 text-sm truncate">{sub.childName}</p>
                    <p className="text-xs text-gray-500 truncate">{sub.coloringPage.title}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ml-3 flex-shrink-0 ${
                    sub.status === "APPROVED" ? "bg-green-100 text-green-700" :
                    sub.status === "REJECTED" ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {sub.status === "APPROVED" ? "Disetujui" :
                     sub.status === "REJECTED" ? "Ditolak" : "Menunggu"}
                  </span>
                </div>
              ))}
            </div>

            {/* Desktop: Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50/50 text-gray-500">
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 font-semibold">Nama Anak</th>
                    <th className="py-3 px-4 font-semibold">Pengirim</th>
                    <th className="py-3 px-4 font-semibold">Lembar</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSubmissions.map((sub) => (
                    <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-4 font-medium text-gray-900">{sub.childName}</td>
                      <td className="py-3 px-4 text-gray-600">{sub.submitterName}</td>
                      <td className="py-3 px-4 text-gray-600">{sub.coloringPage.title}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          sub.status === "APPROVED" ? "bg-green-100 text-green-700" :
                          sub.status === "REJECTED" ? "bg-red-100 text-red-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {sub.status === "APPROVED" ? "Disetujui" :
                           sub.status === "REJECTED" ? "Ditolak" : "Menunggu"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500">
                        {new Date(sub.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

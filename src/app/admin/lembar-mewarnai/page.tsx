import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, FileText, Download, Eye } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { EditButton } from "@/components/admin/EditButton";

export const metadata = {
  title: "Lembar Mewarnai | EduColoring Admin",
};

export const dynamic = "force-dynamic";

export default async function LembarMewarnaiPage() {
  const coloringPages = await prisma.coloringPage.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: { select: { name: true } },
      _count: { select: { submissions: true, scans: true } },
    },
  });

  const categories = await prisma.category.findMany();

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight">
            Lembar <span className="text-google-blue">Mewarnai</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium text-xs md:text-sm">
            Kelola semua lembar mewarnai yang tersedia.
          </p>
        </div>
        {coloringPages.length > 0 && (
          <a
            href="/admin/lembar-mewarnai/tambah"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#202124] text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-all shadow-sm w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            Tambah Lembar
          </a>
        )}
      </div>

      {coloringPages.length === 0 ? (
        <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 mx-auto">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Belum Ada Lembar Mewarnai</h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
            Mulai tambahkan lembar mewarnai pertama untuk anak-anak.
          </p>
          <a
            href="/admin/lembar-mewarnai/tambah"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-google-blue text-white font-bold text-sm rounded-xl hover:opacity-90 transition-all"
          >
            <Plus className="w-4 h-4" />
            Tambah Sekarang
          </a>
        </div>
      ) : (
        <>
          {/* Mobile: Card Layout */}
          <div className="md:hidden flex flex-col gap-3">
            {coloringPages.map((page) => (
              <div key={page.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-20 h-20 rounded-xl bg-white border border-gray-200 overflow-hidden flex-shrink-0">
                    {page.thumbnailUrl ? (
                      <img src={page.thumbnailUrl} alt={page.title} className="w-full h-full object-contain p-1" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-50">
                        <FileText className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm truncate">{page.title}</h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-bold mt-1">
                      {page.category.name}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" /> {page.downloadCount}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> {page._count.scans}
                    </span>
                    <span>{page._count.submissions} karya</span>
                  </div>
                  <div className="flex gap-2">
                    <EditButton page={page} categories={categories} />
                    <DeleteButton id={page.id} type="coloring-page" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Table Layout */}
          <div className="hidden md:block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left py-4 px-6 font-bold text-gray-500 text-xs uppercase tracking-wider">Judul</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-500 text-xs uppercase tracking-wider">Kategori</th>
                    <th className="text-center py-4 px-6 font-bold text-gray-500 text-xs uppercase tracking-wider">Unduhan</th>
                    <th className="text-center py-4 px-6 font-bold text-gray-500 text-xs uppercase tracking-wider">Scan</th>
                    <th className="text-center py-4 px-6 font-bold text-gray-500 text-xs uppercase tracking-wider">Karya</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-500 text-xs uppercase tracking-wider">Tanggal</th>
                    <th className="text-right py-4 px-6 font-bold text-gray-500 text-xs uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {coloringPages.map((page) => (
                    <tr key={page.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-24 rounded-xl bg-white border border-gray-200 overflow-hidden flex-shrink-0">
                            {page.thumbnailUrl ? (
                              <img src={page.thumbnailUrl} alt={page.title} className="w-full h-full object-contain p-1" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                <FileText className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <span className="font-bold text-gray-900 truncate max-w-[200px]">{page.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold">
                          {page.category.name}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center gap-1 text-gray-600">
                          <Download className="w-3.5 h-3.5" />
                          {page.downloadCount}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center gap-1 text-gray-600">
                          <Eye className="w-3.5 h-3.5" />
                          {page._count.scans}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center font-medium text-gray-600">
                        {page._count.submissions}
                      </td>
                      <td className="py-4 px-6 text-gray-500">
                        {new Date(page.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          <EditButton page={page} categories={categories} />
                          <DeleteButton id={page.id} type="coloring-page" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import { SubmissionActions } from "@/components/admin/SubmissionActions";
import { Palette } from "lucide-react";

export const metadata = {
  title: "Karya Masuk | EduColoring Admin",
};

export const dynamic = "force-dynamic";

export default async function KaryaPage() {
  const submissions = await prisma.submission.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      coloringPage: { select: { title: true } },
    },
  });

  const pendingCount = submissions.filter(s => s.status === "PENDING").length;
  const approvedCount = submissions.filter(s => s.status === "APPROVED").length;
  const rejectedCount = submissions.filter(s => s.status === "REJECTED").length;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight">
          Karya <span className="text-google-blue">Masuk</span>
        </h1>
        <p className="text-gray-500 mt-1 font-medium text-xs md:text-sm">
          Tinjau dan kelola karya mewarnai yang dikirimkan anak-anak.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 md:gap-2 mb-4 md:mb-6 flex-wrap">
        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-bold">
          Semua <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-md text-xs">{submissions.length}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-yellow-50 text-yellow-700 text-sm font-bold">
          Menunggu <span className="bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-md text-xs">{pendingCount}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-50 text-green-700 text-sm font-bold">
          Disetujui <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-md text-xs">{approvedCount}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-700 text-sm font-bold">
          Ditolak <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-md text-xs">{rejectedCount}</span>
        </span>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Palette className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Belum Ada Karya Masuk</h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            Karya mewarnai dari anak-anak akan muncul di sini setelah mereka mengirimkan hasil karya mereka.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {submissions.map((sub) => (
            <div key={sub.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
              {/* Image Preview */}
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                <img
                  src={sub.imageUrl}
                  alt={`Karya ${sub.childName}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm ${
                    sub.status === "APPROVED" ? "bg-green-500 text-white" :
                    sub.status === "REJECTED" ? "bg-red-500 text-white" :
                    "bg-yellow-400 text-yellow-900"
                  }`}>
                    {sub.status === "APPROVED" ? "Disetujui" :
                     sub.status === "REJECTED" ? "Ditolak" : "Menunggu"}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-0.5">{sub.childName}</h3>
                <p className="text-xs text-gray-500 mb-1">Oleh: {sub.submitterName}</p>
                <p className="text-xs text-gray-400">
                  {sub.coloringPage.title} &bull; {new Date(sub.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric", month: "short", year: "numeric"
                  })}
                </p>

                {/* Action Buttons */}
                {sub.status === "PENDING" && (
                  <SubmissionActions submissionId={sub.id} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

const DOCS = [
  { title: "Divisi Pendidikan", desc: "Mengajar dan mewarnai bersama anak-anak PAUD & SD.", img: "/images/kkn_students_placeholder.png" },
  { title: "Divisi Lingkungan", desc: "Program pilah sampah dan penanaman pohon di balai desa.", img: "/images/kkn_students_placeholder.png" },
  { title: "Divisi Kesehatan", desc: "Sosialisasi gizi seimbang untuk balita bersama ibu PKK.", img: "/images/kkn_students_placeholder.png" },
  { title: "Divisi Ekonomi Kreatif", desc: "Pendampingan UMKM lokal dalam pengemasan produk desa.", img: "/images/kkn_students_placeholder.png" },
  { title: "Malam Perpisahan", desc: "Puncak festival seni anak dan penyerahan karya mewarnai.", img: "/images/kkn_students_placeholder.png" },
];

export function DocumentationCards() {
  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {DOCS.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2.5rem] shadow-2xl overflow-hidden aspect-[16/9] relative group"
        >
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 sm:p-12 pt-24 sm:pt-32 flex flex-col items-start text-left">
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-1 sm:mb-2 leading-none drop-shadow-md">
              {item.title}
            </h3>
            <p className="text-sm sm:text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

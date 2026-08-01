import React from 'react';

const partners = [
  { name: "Universitas Nusantara", role: "Logo Kampus", icon: "🏫", color: "text-google-blue" },
  { name: "Fakultas Ilmu Komputer", role: "Logo Fakultas", icon: "🎓", color: "text-google-red" },
  { name: "Kecamatan Sukamaju", role: "Logo Kecamatan", icon: "🏛️", color: "text-google-yellow" },
  { name: "Kabupaten Karawang", role: "Logo Kabupaten", icon: "🏙️", color: "text-google-green" },
  { name: "Tim KKN 2026", role: "Logo KKN", icon: "🤝", color: "text-google-blue" },
];

export const LogoMarquee = () => {
  return (
    <div className="w-full max-w-[100vw] overflow-hidden py-12 mt-20 md:mt-32 relative flex">
      {/* Mask Image for fade effect on left and right */}
      <div 
        className="w-full flex gap-6 py-8"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        {/* Set 1 */}
        <div className="flex animate-marquee gap-6 shrink-0 min-w-full justify-around items-center">
          {partners.map((partner, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-4 md:gap-6 bg-white px-6 py-4 md:px-10 md:py-6 rounded-2xl shadow-md min-w-[260px] md:min-w-[350px] group cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              {/* Fake Logo Icon */}
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-50 flex items-center justify-center text-2xl md:text-4xl shrink-0 ${partner.color} shadow-inner group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300`}>
                {partner.icon}
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-black text-gray-900 text-base md:text-lg whitespace-nowrap leading-tight">
                  {partner.name}
                </span>
                <span className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider mt-0.5 md:mt-1">
                  {partner.role}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Set 2 (Duplicate for seamless loop) */}
        <div className="flex animate-marquee gap-6 shrink-0 min-w-full justify-around items-center" aria-hidden="true">
          {partners.map((partner, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-4 md:gap-6 bg-white px-6 py-4 md:px-10 md:py-6 rounded-2xl shadow-md min-w-[260px] md:min-w-[350px] group cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              {/* Fake Logo Icon */}
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-50 flex items-center justify-center text-2xl md:text-4xl shrink-0 ${partner.color} shadow-inner group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300`}>
                {partner.icon}
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-black text-gray-900 text-base md:text-lg whitespace-nowrap leading-tight">
                  {partner.name}
                </span>
                <span className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider mt-0.5 md:mt-1">
                  {partner.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

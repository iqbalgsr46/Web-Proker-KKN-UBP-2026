export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  withShimmer?: boolean;
}

export function GlassCard({ children, className = "", withShimmer = false, ...props }: GlassCardProps) {
  return (
    <div 
      className={`relative rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-12 z-10 ${className}`}
      {...props}
    >
      {/* Outer shadow untuk memberikan jarak dari background */}
      <div className="absolute inset-0 rounded-[inherit] shadow-[0_20px_50px_rgba(0,0,0,0.1)] pointer-events-none" />

      {/* Layer kaca utama (Pure Glass) */}
      <div className="absolute inset-0 rounded-[inherit] overflow-hidden backdrop-blur-2xl border border-white/60 shadow-[inset_0_0_30px_rgba(255,255,255,0.7)] pointer-events-none bg-white/50">
        
        {/* Garis putih tipis bercahaya di tepi atas */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />
        
        {/* Soft Glare / Reflection (Sangat Transparan) */}
        <div className="absolute top-[-25%] left-[-10%] right-[-10%] h-[60%] bg-gradient-to-b from-white/20 to-transparent rounded-[100%] pointer-events-none" />
        
        {/* Premium Glossy Shimmer Animation (Hanya jika withShimmer true) */}
        {withShimmer && (
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-premium-shimmer pointer-events-none opacity-[0.85] transform-gpu will-change-transform" />
        )}
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

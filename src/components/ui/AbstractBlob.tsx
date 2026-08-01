import React, { useId } from 'react';

type BlobProps = {
  color?: "blue" | "red" | "yellow" | "green";
  type?: "hexagon" | "cross-spark" | "circle-spark" | "cross" | "spark" | "gemini-spark";
  className?: string;
  /** When true, renders as relative (for use inside flex/grid containers). Default = absolute for background use. */
  relative?: boolean;
};

export const AbstractBlob = React.memo(function AbstractBlob({ color = "blue", type = "hexagon", className = "", relative = false }: BlobProps) {
  const rawId = useId();
  const maskId = `mask-${rawId.replace(/:/g, "")}`;

  const colorMap = {
    blue: "#4285F4",
    red: "#EA4335",
    yellow: "#FBBC04",
    green: "#34A853",
  };

  const hex = colorMap[color];

  // Path AI Spark — 4-point star persis logo Google Gemini
  const sparkPath = "M 50 10 C 50 35 35 50 10 50 C 35 50 50 65 50 90 C 50 65 65 50 90 50 C 65 50 50 35 50 10 Z";

  const renderShape = () => {
    switch (type) {
      case "hexagon": // Hijau — segi enam dengan lubang bintang di tengah
        return (
          <path 
            d={`M 26 8 L 74 8 L 96 50 L 74 92 L 26 92 L 4 50 Z ${sparkPath}`} 
            fill={hex} 
            fillRule="evenodd" 
          />
        );

      case "spark": // Biru — bintang 4 sudut solid (Gemini Spark)
        return <path d={sparkPath} fill={hex} />;

      case "circle-spark": // Kuning — lingkaran dengan lubang bintang di tengah
        const circlePath = "M 50 4 A 46 46 0 1 0 50 96 A 46 46 0 1 0 50 4 Z";
        return (
          <path 
            d={`${circlePath} ${sparkPath}`} 
            fill={hex} 
            fillRule="evenodd" 
          />
        );

      case "cross": // Merah — palang plus solid
        return (
          <g fill={hex}>
            <rect x="32" y="5" width="36" height="90" rx="18" />
            <rect x="5" y="32" width="90" height="36" rx="18" />
          </g>
        );

      case "cross-spark": // Kuning — palang plus dengan lubang bintang (tetap pakai mask karena rounded rect)
        return (
          <>
            <defs>
              <mask id={maskId}>
                <rect width="100" height="100" fill="white" />
                <path d={sparkPath} fill="black" />
              </mask>
            </defs>
            <g mask={`url(#${maskId})`} fill={hex}>
              <rect x="32" y="5" width="36" height="90" rx="18" />
              <rect x="5" y="32" width="90" height="36" rx="18" />
            </g>
          </>
        );

      case "gemini-spark": // Biru — bintang tebal kaya dengan lubang bintang di tengah
        const largeSparkPath = "M 50 0 C 50 25 25 50 0 50 C 25 50 50 75 50 100 C 50 75 75 50 100 50 C 75 50 50 25 50 0 Z";
        return (
          <path 
            d={`${largeSparkPath} ${sparkPath}`} 
            fill={hex} 
            fillRule="evenodd" 
          />
        );

      default:
        return null;
    }
  };

  const posClass = relative ? "relative" : "absolute";

  return (
    <div className={`${posClass} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {renderShape()}
      </svg>
    </div>
  );
});

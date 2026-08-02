import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  description,
  trend,
  trendValue
}: StatCardProps) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden group">
      {/* Subtle Background Decoration */}
      <div className="absolute -right-6 -top-6 w-20 md:w-24 h-20 md:h-24 bg-gray-50 rounded-full group-hover:bg-google-blue/5 transition-colors duration-500" />
      
      <div className="flex items-start justify-between relative z-10">
        <div className="min-w-0">
          <p className="text-xs md:text-sm font-bold text-gray-500 mb-0.5 md:mb-1 truncate">{title}</p>
          <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">{value}</h3>
        </div>
        <div className="w-9 h-9 md:w-12 md:h-12 bg-gray-50 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0 ml-2">
          <Icon className="w-4 h-4 md:w-6 md:h-6 text-gray-700" />
        </div>
      </div>

      {(description || trendValue) && (
        <div className="mt-2 md:mt-4 flex items-center gap-1.5 md:gap-2 relative z-10 flex-wrap">
          {trendValue && (
            <span className={`text-xs font-bold px-1.5 md:px-2 py-0.5 rounded-md ${
              trend === "up" ? "bg-green-100 text-green-700" :
              trend === "down" ? "bg-red-100 text-red-700" :
              "bg-gray-100 text-gray-700"
            }`}>
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "−"} {trendValue}
            </span>
          )}
          {description && (
            <span className="text-xs text-gray-500 font-medium truncate">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}

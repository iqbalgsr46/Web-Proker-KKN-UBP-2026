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
    <div className="bg-white p-4 md:p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col relative">
      <div className="flex items-start justify-between relative z-10">
        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-500 mb-1 truncate">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{value}</h3>
        </div>
        <div className="w-10 h-10 bg-gray-50 rounded-md border border-gray-100 flex items-center justify-center flex-shrink-0 ml-2">
          <Icon className="w-5 h-5 text-gray-600" />
        </div>
      </div>

      {(description || trendValue) && (
        <div className="mt-4 flex items-center gap-2 relative z-10 flex-wrap">
          {trendValue && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${
              trend === "up" ? "bg-green-50 text-green-700" :
              trend === "down" ? "bg-red-50 text-red-700" :
              "bg-gray-50 text-gray-700"
            }`}>
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "−"} {trendValue}
            </span>
          )}
          {description && (
            <span className="text-xs text-gray-500 truncate">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}

import { Card } from "./ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  footer?: string;
}

export function DashboardCard({ title, icon: Icon, children, className = "", footer }: DashboardCardProps) {
  return (
    <Card className={`bg-[#F1FAEE] border-[#102A43]/20 p-6 rounded-lg shadow-md ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        {Icon && <Icon className="w-5 h-5 text-[#00B4D8]" />}
        <h3 className="text-[#0A192F]">{title}</h3>
      </div>
      <div className="text-[#0A192F]">{children}</div>
      {footer && <div className="text-[#0A192F]/60 text-sm mt-4">{footer}</div>}
    </Card>
  );
}

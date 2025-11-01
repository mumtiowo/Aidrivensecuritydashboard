import { 
  LayoutDashboard, 
  AlertTriangle, 
  Monitor, 
  Activity, 
  FolderOpen, 
  Share2, 
  Settings 
} from "lucide-react";
import { motion } from "motion/react";

interface SidebarProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "alerts", label: "Alerts", icon: AlertTriangle },
  { id: "endpoints", label: "Endpoints", icon: Monitor },
  { id: "analytics", label: "Behavior Analytics", icon: Activity },
  { id: "cases", label: "Cases", icon: FolderOpen },
  { id: "federated", label: "Federated AI", icon: Share2 },
  { id: "settings", label: "Settings", icon: Settings }
];

export function Sidebar({ activeScreen, onNavigate }: SidebarProps) {
  return (
    <div className="w-64 bg-[#102A43] h-screen p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-[#00B4D8] to-[#06D6A0] rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" 
                stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" fill="currentColor"/>
            </svg>
          </div>
          <motion.div
            className="absolute inset-0 bg-[#00B4D8] rounded-lg"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <div>
          <div className="text-white">Sentinel</div>
          <div className="text-[#00B4D8] text-xs">AI Security</div>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-[#00B4D8]/20 text-[#00B4D8] border border-[#00B4D8]/30"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="text-white/40 text-xs text-center pt-6 border-t border-white/10">
        © Sentinel 2025
        <br />
        Privacy-Preserving AI Security
      </div>
    </div>
  );
}

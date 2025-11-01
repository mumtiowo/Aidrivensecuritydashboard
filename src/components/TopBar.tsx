import { Search, User } from "lucide-react";
import { Input } from "./ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface TopBarProps {
  title: string;
  onLogout?: () => void;
}

export function TopBar({ title, onLogout }: TopBarProps) {
  return (
    <div className="bg-[#0A192F] border-b border-[#102A43] px-8 py-4 flex items-center justify-between">
      <h1 className="text-white text-xl">{title}</h1>

      <div className="flex items-center gap-4">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            placeholder="Search by user, alert, or endpoint..."
            className="pl-10 bg-[#102A43] border-[#102A43] text-white placeholder:text-white/40"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-10 h-10 rounded-full bg-[#00B4D8]/20 border border-[#00B4D8]/30 flex items-center justify-center hover:bg-[#00B4D8]/30 transition-all">
              <User className="w-5 h-5 text-[#00B4D8]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#102A43] border-[#00B4D8]/30 text-white">
            <DropdownMenuItem className="hover:bg-[#00B4D8]/20">Settings</DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-[#00B4D8]/20"
              onClick={onLogout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

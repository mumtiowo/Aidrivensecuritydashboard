import { Badge } from "./ui/badge";

interface RiskBadgeProps {
  score: number;
  showScore?: boolean;
  className?: string;
}

export function RiskBadge({ score, showScore = false, className = "" }: RiskBadgeProps) {
  const getRiskLevel = (score: number) => {
    if (score >= 0.8) return { level: "High", color: "bg-[#F94144] hover:bg-[#F94144]" };
    if (score >= 0.6) return { level: "Medium", color: "bg-[#F9C74F] hover:bg-[#F9C74F] text-gray-900" };
    return { level: "Low", color: "bg-[#06D6A0] hover:bg-[#06D6A0] text-gray-900" };
  };

  const { level, color } = getRiskLevel(score);

  return (
    <Badge className={`${color} ${className}`}>
      {level} {showScore && `(${score.toFixed(2)})`}
    </Badge>
  );
}

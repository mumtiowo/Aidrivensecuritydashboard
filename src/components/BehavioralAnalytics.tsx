import { sentinelData } from "../data/sentinelData";
import { DashboardCard } from "./DashboardCard";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { RiskBadge } from "./RiskBadge";
import { Button } from "./ui/button";
import { LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown } from "lucide-react";

export function BehavioralAnalytics() {
  const { users, activity_volume, user_trends, radar_data } = sentinelData.behavioral_analytics;

  return (
    <div className="space-y-6">
      {/* User Risk Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {users.map((user, index) => (
          <motion.div
            key={user.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="bg-[#F1FAEE] rounded-lg p-6 border border-[#102A43]/10 hover:border-[#00B4D8]/30 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-12 h-12 bg-gradient-to-br from-[#00B4D8] to-[#06D6A0] text-white">
                  <AvatarFallback className="bg-transparent">{user.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-[#0A192F]">{user.name}</div>
                  <div className="flex items-center gap-2 text-sm">
                    <RiskBadge score={user.risk_score} showScore />
                    <span className={`flex items-center gap-1 ${user.trend.includes('↑') ? 'text-[#F94144]' : 'text-[#06D6A0]'}`}>
                      {user.trend.includes('↑') ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {user.trend}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-[#0A192F]/70 mb-3">
                Last anomaly: {user.last_anomaly}
              </div>
              <Button size="sm" variant="outline" className="w-full border-[#00B4D8] text-[#00B4D8] hover:bg-[#00B4D8]/10">
                View Full Behavior Log
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activity Volume Over Time */}
      <DashboardCard title="User Activity Volume Over Time">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={activity_volume} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#0A192F20" />
            <XAxis dataKey="date" stroke="#0A192F" />
            <YAxis stroke="#0A192F" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0A192F',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px'
              }}
            />
            <Line
              type="monotone"
              dataKey="actions"
              stroke="#00B4D8"
              strokeWidth={3}
              dot={{ fill: '#00B4D8', r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardCard>

      {/* Risk Trends by User */}
      <DashboardCard title="Risk Score Trends by User">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={user_trends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#0A192F20" />
            <XAxis dataKey="date" stroke="#0A192F" />
            <YAxis stroke="#0A192F" domain={[0, 1]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0A192F',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="Alex T." stroke="#F94144" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="Sara W." stroke="#F9C74F" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="Noah R." stroke="#06D6A0" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="Aria M." stroke="#00B4D8" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </DashboardCard>

      {/* Risk Profile by Activity Type (Radar) */}
      <DashboardCard title="Risk Profile by Activity Type">
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radar_data}>
            <PolarGrid stroke="#0A192F20" />
            <PolarAngleAxis dataKey="category" stroke="#0A192F" />
            <PolarRadiusAxis angle={90} domain={[0, 1]} stroke="#0A192F" />
            <Radar name="Engineering" dataKey="Engineering" stroke="#F94144" fill="#F94144" fillOpacity={0.3} />
            <Radar name="Finance" dataKey="Finance" stroke="#F9C74F" fill="#F9C74F" fillOpacity={0.3} />
            <Radar name="Marketing" dataKey="Marketing" stroke="#00B4D8" fill="#00B4D8" fillOpacity={0.3} />
            <Radar name="IT" dataKey="IT" stroke="#06D6A0" fill="#06D6A0" fillOpacity={0.3} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0A192F',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px'
              }}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </DashboardCard>

      {/* Neural Network Background Animation */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <svg className="w-full h-full">
          {[...Array(20)].map((_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 100 + "%"}
              cy={Math.random() * 100 + "%"}
              r="2"
              fill="#00B4D8"
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

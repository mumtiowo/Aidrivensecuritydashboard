import { DashboardCard } from "./DashboardCard";
import { ShieldCheck, Activity, Monitor, TrendingUp } from "lucide-react";
import { sentinelData } from "../data/sentinelData";
import { Button } from "./ui/button";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, BarChart, Bar } from "recharts";
import { motion } from "motion/react";

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { summary, realtime_feed, risk_heatmap, endpoint_health } = sentinelData.dashboard;

  // Prepare data for bubble chart
  const bubbleData = risk_heatmap.map((item, index) => ({
    x: index * 25,
    y: item.risk_score * 100,
    z: item.incidents * 3,
    name: item.department,
    risk: item.risk_score
  }));

  const getRiskColor = (risk: number) => {
    if (risk >= 0.8) return "#F94144";
    if (risk >= 0.6) return "#F9C74F";
    return "#06D6A0";
  };

  return (
    <div className="space-y-6">
      {/* Top Row - Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="System Summary"
          icon={ShieldCheck}
          footer={`Last synced: ${summary.last_synced}`}
        >
          <div className="space-y-3">
            <div>
              <div className="text-[#0A192F] mb-1">{summary.actions_blocked_today} Actions Blocked Today</div>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F94144]"></div>
                <span>{summary.high_risk} High</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F9C74F]"></div>
                <span>{summary.medium_risk} Med</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#06D6A0]"></div>
                <span>{summary.low_risk} Low</span>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Live Activity Feed" icon={Activity}>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {realtime_feed.map((item, index) => (
              <motion.div
                key={index}
                className="text-sm text-[#0A192F]/80 py-1 border-l-2 border-[#00B4D8] pl-2"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Endpoint Overview" icon={Monitor}>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[#06D6A0]">Active:</span>
              <span>{endpoint_health.active}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#F94144]">Offline:</span>
              <span>{endpoint_health.offline}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#F9C74F]">Pending Updates:</span>
              <span>{endpoint_health.pending_updates}</span>
            </div>
            <div className="mt-3">
              <div className="h-2 bg-[#0A192F]/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00B4D8] to-[#06D6A0]"
                  initial={{ width: 0 }}
                  animate={{ width: "96%" }}
                  transition={{ duration: 1 }}
                />
              </div>
              <p className="text-xs text-[#0A192F]/60 mt-1">96% uptime</p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Federated Learning" icon={TrendingUp}>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Endpoints:</span>
              <span>{sentinelData.federated_learning.total_endpoints}</span>
            </div>
            <div className="flex justify-between">
              <span>Global Model:</span>
              <span>{sentinelData.federated_learning.global_model}</span>
            </div>
            <div className="flex justify-between">
              <span>Training Round:</span>
              <span>{sentinelData.federated_learning.current_round}</span>
            </div>
            <div className="mt-3 px-3 py-2 bg-[#06D6A0]/10 rounded-lg text-xs text-center">
              GDPR & HIPAA Compliant
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Risk Heatmap */}
      <DashboardCard title="Risk Distribution by Department">
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#0A192F20" />
            <XAxis type="number" dataKey="x" domain={[0, 100]} hide />
            <YAxis type="number" dataKey="y" domain={[0, 100]} label={{ value: 'Risk Score', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              content={({ payload }) => {
                if (payload && payload[0]) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-[#0A192F] text-white p-3 rounded-lg shadow-lg">
                      <p className="font-bold">{data.name}</p>
                      <p>Risk: {data.risk.toFixed(2)}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter data={bubbleData} fill="#00B4D8">
              {bubbleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getRiskColor(entry.risk)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardCard>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button
          onClick={() => onNavigate("alerts")}
          className="bg-[#00B4D8] hover:bg-[#00B4D8]/90 text-white"
        >
          View All Alerts
        </Button>
        <Button
          onClick={() => onNavigate("endpoints")}
          variant="outline"
          className="border-[#00B4D8] text-[#00B4D8] hover:bg-[#00B4D8]/10"
        >
          Add Endpoint
        </Button>
        <Button
          variant="outline"
          className="border-[#00B4D8] text-[#00B4D8] hover:bg-[#00B4D8]/10"
        >
          Export Report
        </Button>
      </div>
    </div>
  );
}

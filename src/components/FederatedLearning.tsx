import { sentinelData } from "../data/sentinelData";
import { DashboardCard } from "./DashboardCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Shield, Lock, Database, Network } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "./ui/badge";

export function FederatedLearning() {
  const { total_endpoints, current_round, global_model, differential_privacy, text, progress_data } =
    sentinelData.federated_learning;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DashboardCard title="Total Endpoints" icon={Network}>
          <div className="text-[#0A192F]">{total_endpoints}</div>
        </DashboardCard>

        <DashboardCard title="Current Round" icon={Database}>
          <div className="text-[#0A192F]">{current_round}</div>
        </DashboardCard>

        <DashboardCard title="Global Model" icon={Shield}>
          <div className="text-[#0A192F]">{global_model}</div>
        </DashboardCard>

        <DashboardCard title="Differential Privacy" icon={Lock}>
          <div className="text-[#0A192F]">{differential_privacy}</div>
        </DashboardCard>
      </div>

      {/* Privacy Explanation */}
      <div className="bg-gradient-to-br from-[#00B4D8]/10 to-[#06D6A0]/10 rounded-lg p-8 border-l-4 border-[#00B4D8]">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="w-6 h-6 text-[#00B4D8]" />
          <h3 className="text-[#0A192F]">Privacy-Preserving AI</h3>
        </div>
        <p className="text-[#0A192F]/80 mb-4">{text}</p>
        <Badge className="bg-[#06D6A0] hover:bg-[#06D6A0] text-gray-900">
          GDPR & HIPAA Compliant
        </Badge>
      </div>

      {/* Federated Learning Flow Diagram */}
      <DashboardCard title="Federated Learning Architecture">
        <div className="py-8">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            {/* Step 1 */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#00B4D8] to-[#06D6A0] rounded-full flex items-center justify-center mb-3">
                <Database className="w-10 h-10 text-white" />
              </div>
              <div className="text-sm text-center text-[#0A192F]">
                Local Model
                <br />
                <span className="text-xs text-[#0A192F]/60">On Device</span>
              </div>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <svg width="80" height="20">
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3, 0 6" fill="#00B4D8" />
                  </marker>
                </defs>
                <line
                  x1="0"
                  y1="10"
                  x2="70"
                  y2="10"
                  stroke="#00B4D8"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              </svg>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#00B4D8] to-[#06D6A0] rounded-full flex items-center justify-center mb-3">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <div className="text-sm text-center text-[#0A192F]">
                Encryption
                <br />
                <span className="text-xs text-[#0A192F]/60">Parameters</span>
              </div>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <svg width="80" height="20">
                <line
                  x1="0"
                  y1="10"
                  x2="70"
                  y2="10"
                  stroke="#00B4D8"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              </svg>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#00B4D8] to-[#06D6A0] rounded-full flex items-center justify-center mb-3">
                <Network className="w-10 h-10 text-white" />
              </div>
              <div className="text-sm text-center text-[#0A192F]">
                Aggregation
                <br />
                <span className="text-xs text-[#0A192F]/60">Cloud Server</span>
              </div>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <svg width="80" height="20">
                <line
                  x1="0"
                  y1="10"
                  x2="70"
                  y2="10"
                  stroke="#00B4D8"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              </svg>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#00B4D8] to-[#06D6A0] rounded-full flex items-center justify-center mb-3">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="text-sm text-center text-[#0A192F]">
                Global Model
                <br />
                <span className="text-xs text-[#0A192F]/60">Update</span>
              </div>
            </motion.div>
          </div>
        </div>
      </DashboardCard>

      {/* Training Progress Chart */}
      <DashboardCard title="Federated Learning Progress">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progress_data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#0A192F20" />
            <XAxis dataKey="round" stroke="#0A192F" label={{ value: "Training Round", position: "insideBottom", offset: -5 }} />
            <YAxis yAxisId="left" stroke="#0A192F" label={{ value: "Accuracy", angle: -90, position: "insideLeft" }} />
            <YAxis yAxisId="right" orientation="right" stroke="#0A192F" label={{ value: "Endpoints", angle: 90, position: "insideRight" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0A192F",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="accuracy"
              stroke="#00B4D8"
              strokeWidth={3}
              dot={{ fill: "#00B4D8", r: 6 }}
              name="Global Accuracy"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="endpoints"
              stroke="#06D6A0"
              strokeWidth={3}
              dot={{ fill: "#06D6A0", r: 6 }}
              name="Participating Endpoints"
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardCard>

      {/* Animated Endpoint Merging Visualization */}
      <div className="bg-[#F1FAEE] rounded-lg p-8">
        <h3 className="text-[#0A192F] mb-6 text-center">Live Endpoint Synchronization</h3>
        <div className="relative h-64 flex items-center justify-center">
          {/* Central Shield */}
          <motion.div
            className="absolute z-10"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 360],
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
          >
            <Shield className="w-16 h-16 text-[#00B4D8]" />
          </motion.div>

          {/* Orbiting Endpoints */}
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * 2 * Math.PI;
            const radius = 100;
            
            return (
              <motion.div
                key={i}
                className="absolute"
                animate={{
                  x: Math.cos(angle + (Date.now() / 1000)) * radius,
                  y: Math.sin(angle + (Date.now() / 1000)) * radius,
                }}
                transition={{
                  duration: 0,
                  repeat: Infinity,
                }}
              >
                <motion.div
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00B4D8] to-[#06D6A0]"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.25,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

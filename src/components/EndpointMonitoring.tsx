import { sentinelData } from "../data/sentinelData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Monitor, Apple, HardDrive } from "lucide-react";
import { motion } from "motion/react";

export function EndpointMonitoring() {
  const endpoints = sentinelData.endpoints;

  const getOSIcon = (os: string) => {
    if (os === "Windows") return <Monitor className="w-4 h-4" />;
    if (os === "macOS") return <Apple className="w-4 h-4" />;
    return <HardDrive className="w-4 h-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-[#06D6A0] hover:bg-[#06D6A0] text-gray-900";
      case "Warning":
        return "bg-[#F9C74F] hover:bg-[#F9C74F] text-gray-900";
      case "Offline":
        return "bg-[#F94144] hover:bg-[#F94144]";
      default:
        return "bg-[#00B4D8] hover:bg-[#00B4D8]";
    }
  };

  return (
    <div className="space-y-6">
      {/* Endpoints Table */}
      <div className="bg-[#F1FAEE] rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#102A43] hover:bg-[#102A43]">
              <TableHead className="text-white">Device</TableHead>
              <TableHead className="text-white">OS</TableHead>
              <TableHead className="text-white">Last Seen</TableHead>
              <TableHead className="text-white">Model Version</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {endpoints.map((endpoint, index) => (
              <motion.tr
                key={endpoint.device}
                className="hover:bg-[#00B4D8]/10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <TableCell className="text-[#0A192F]">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-[#00B4D8]" />
                    {endpoint.device}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-[#0A192F]">
                    {getOSIcon(endpoint.os)}
                    {endpoint.os}
                  </div>
                </TableCell>
                <TableCell className="text-[#0A192F]">{endpoint.last_seen}</TableCell>
                <TableCell className="text-[#0A192F]">{endpoint.model_version}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(endpoint.status)}>{endpoint.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#00B4D8] text-[#00B4D8] hover:bg-[#00B4D8]/10"
                    >
                      Restart
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#F94144] text-[#F94144] hover:bg-[#F94144]/10"
                    >
                      Deactivate
                    </Button>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Endpoint Network Visualization */}
      <div className="bg-[#F1FAEE] rounded-lg p-8">
        <h3 className="text-[#0A192F] mb-6 text-center">Endpoint Network Topology</h3>
        <div className="relative h-96 flex items-center justify-center">
          {/* Central Sentinel Node */}
          <motion.div
            className="absolute z-10"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-[#00B4D8] to-[#06D6A0] rounded-full flex items-center justify-center shadow-2xl">
                <div className="text-white text-center">
                  <div>Sentinel</div>
                  <div className="text-xs">Cloud</div>
                </div>
              </div>
              <motion.div
                className="absolute inset-0 bg-[#00B4D8] rounded-full blur-xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>

          {/* Endpoint Nodes */}
          {endpoints.map((endpoint, index) => {
            const angle = (index / endpoints.length) * 2 * Math.PI;
            const radius = 160;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            const statusColor =
              endpoint.status === "Active"
                ? "#06D6A0"
                : endpoint.status === "Warning"
                ? "#F9C74F"
                : "#F94144";

            return (
              <motion.div
                key={endpoint.device}
                className="absolute"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Connection Line */}
                <svg
                  className="absolute pointer-events-none"
                  style={{
                    left: -x,
                    top: -y,
                    width: Math.abs(x) * 2,
                    height: Math.abs(y) * 2,
                  }}
                >
                  <motion.line
                    x1={x > 0 ? 0 : Math.abs(x) * 2}
                    y1={y > 0 ? 0 : Math.abs(y) * 2}
                    x2={x > 0 ? Math.abs(x) * 2 : 0}
                    y2={y > 0 ? Math.abs(y) * 2 : 0}
                    stroke={statusColor}
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </svg>

                {/* Endpoint Circle */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    boxShadow: [
                      `0 0 10px ${statusColor}`,
                      `0 0 20px ${statusColor}`,
                      `0 0 10px ${statusColor}`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xs text-center cursor-pointer"
                    style={{ backgroundColor: statusColor }}
                  >
                    {endpoint.device.split("-")[0]}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { sentinelData } from "../data/sentinelData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { RiskBadge } from "./RiskBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { LoadingBrain } from "./LoadingBrain";
import { AlertTriangle } from "lucide-react";
import { motion } from "motion/react";

export function AlertsCenter() {
  const [selectedAlert, setSelectedAlert] = useState<typeof sentinelData.alerts[0] | null>(null);
  const [riskFilter, setRiskFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredAlerts = sentinelData.alerts.filter((alert) => {
    const riskLevel =
      alert.risk_score >= 0.8 ? "high" : alert.risk_score >= 0.6 ? "medium" : "low";
    
    if (riskFilter !== "all" && riskLevel !== riskFilter) return false;
    if (statusFilter !== "all" && alert.status.toLowerCase() !== statusFilter) return false;
    
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "blocked":
        return "bg-[#F94144] hover:bg-[#F94144]";
      case "warned":
        return "bg-[#F9C74F] hover:bg-[#F9C74F] text-gray-900";
      default:
        return "bg-[#00B4D8] hover:bg-[#00B4D8]";
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-4 items-center bg-[#F1FAEE] p-4 rounded-lg">
        <div className="flex-1">
          <label className="text-sm text-[#0A192F] mb-1 block">Risk Level</label>
          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="bg-white border-[#0A192F]/20">
              <SelectValue placeholder="All Risks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risks</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label className="text-sm text-[#0A192F] mb-1 block">Status</label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-white border-[#0A192F]/20">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
              <SelectItem value="warned">Warned</SelectItem>
              <SelectItem value="audited">Audited</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label className="text-sm text-[#0A192F] mb-1 block">Date Range</label>
          <Select defaultValue="today">
            <SelectTrigger className="bg-white border-[#0A192F]/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="bg-[#F1FAEE] rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#102A43] hover:bg-[#102A43]">
              <TableHead className="text-white">Timestamp</TableHead>
              <TableHead className="text-white">User</TableHead>
              <TableHead className="text-white">Action Type</TableHead>
              <TableHead className="text-white">Risk Score</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">AI Explanation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlerts.map((alert, index) => (
              <motion.tr
                key={alert.id}
                className="cursor-pointer hover:bg-[#00B4D8]/10 transition-colors"
                onClick={() => setSelectedAlert(alert)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <TableCell className="text-[#0A192F]">{alert.timestamp}</TableCell>
                <TableCell className="text-[#0A192F]">{alert.user}</TableCell>
                <TableCell className="text-[#0A192F]">{alert.action_type}</TableCell>
                <TableCell>
                  <RiskBadge score={alert.risk_score} showScore />
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(alert.status)}>{alert.status}</Badge>
                </TableCell>
                <TableCell className="text-[#0A192F]">
                  <div className="flex items-center gap-2">
                    <LoadingBrain className="w-4 h-4" />
                    <span className="text-sm">{alert.ai_explanation}</span>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Alert Detail Sheet */}
      <Sheet open={selectedAlert !== null} onOpenChange={() => setSelectedAlert(null)}>
        <SheetContent className="bg-[#F1FAEE] border-l border-[#102A43]/20 w-[600px]">
          {selectedAlert && (
            <>
              <SheetHeader>
                <SheetTitle className="text-[#0A192F] flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#F94144]" />
                  Alert #{selectedAlert.id} — {selectedAlert.action_type}
                </SheetTitle>
                <SheetDescription className="text-[#0A192F]/60">
                  Detected at {selectedAlert.timestamp}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* User & Risk Info */}
                <div className="bg-white p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[#0A192F]">User:</span>
                    <span className="text-[#0A192F]">{selectedAlert.user}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#0A192F]">Risk Score:</span>
                    <RiskBadge score={selectedAlert.risk_score} showScore />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#0A192F]">Status:</span>
                    <Badge className={getStatusColor(selectedAlert.status)}>
                      {selectedAlert.status}
                    </Badge>
                  </div>
                </div>

                {/* Screenshot Preview (Blurred) */}
                <div>
                  <h4 className="text-[#0A192F] mb-2">Evidence Preview</h4>
                  <div className="relative bg-[#0A192F]/10 rounded-lg p-8 text-center">
                    <div className="absolute inset-0 backdrop-blur-xl bg-white/30 rounded-lg flex items-center justify-center">
                      <div className="text-[#0A192F]/60">
                        [Sensitive Content Redacted]
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Explanation */}
                <div className="bg-gradient-to-br from-[#00B4D8]/10 to-[#06D6A0]/10 p-4 rounded-lg border-l-4 border-[#00B4D8]">
                  <div className="flex items-center gap-2 mb-2">
                    <LoadingBrain />
                    <h4 className="text-[#0A192F]">AI Explanation</h4>
                  </div>
                  <p className="text-[#0A192F]/80 text-sm">{selectedAlert.details}</p>
                  <p className="text-xs text-[#0A192F]/60 mt-2">
                    Explanation generated using SHAP attribution — highlights what triggered detection.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-[#06D6A0] hover:bg-[#06D6A0]/90 text-white">
                    Acknowledge
                  </Button>
                  <Button className="flex-1 bg-[#F9C74F] hover:bg-[#F9C74F]/90 text-gray-900">
                    Escalate
                  </Button>
                  <Button className="flex-1 bg-[#00B4D8] hover:bg-[#00B4D8]/90 text-white">
                    Resolve
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

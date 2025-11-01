import { useState } from "react";
import { sentinelData } from "../data/sentinelData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { RiskBadge } from "./RiskBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { FileDown, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export function CaseManagement() {
  const [selectedCase, setSelectedCase] = useState<typeof sentinelData.cases[0] | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [comment, setComment] = useState("");

  const filteredCases = sentinelData.cases.filter((c) => {
    if (statusFilter === "all") return true;
    return c.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-[#F94144] hover:bg-[#F94144]";
      case "under review":
        return "bg-[#F9C74F] hover:bg-[#F9C74F] text-gray-900";
      case "resolved":
        return "bg-[#06D6A0] hover:bg-[#06D6A0] text-gray-900";
      default:
        return "bg-[#00B4D8] hover:bg-[#00B4D8]";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "high":
        return "bg-[#F94144] hover:bg-[#F94144]";
      case "medium":
        return "bg-[#F9C74F] hover:bg-[#F9C74F] text-gray-900";
      case "low":
        return "bg-[#06D6A0] hover:bg-[#06D6A0] text-gray-900";
      default:
        return "bg-[#00B4D8] hover:bg-[#00B4D8]";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Case List */}
      <div className="lg:col-span-2 space-y-6">
        {/* Filters */}
        <div className="bg-[#F1FAEE] p-4 rounded-lg">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-white border-[#0A192F]/20">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cases</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="under review">Under Review</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cases Table */}
        <div className="bg-[#F1FAEE] rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#102A43] hover:bg-[#102A43]">
                <TableHead className="text-white">Case ID</TableHead>
                <TableHead className="text-white">User</TableHead>
                <TableHead className="text-white">Risk</TableHead>
                <TableHead className="text-white">Opened On</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Analyst</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCases.map((caseItem, index) => (
                <motion.tr
                  key={caseItem.case_id}
                  className={`cursor-pointer hover:bg-[#00B4D8]/10 transition-colors ${
                    selectedCase?.case_id === caseItem.case_id ? "bg-[#00B4D8]/20" : ""
                  }`}
                  onClick={() => setSelectedCase(caseItem)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TableCell className="text-[#0A192F]">#{caseItem.case_id}</TableCell>
                  <TableCell className="text-[#0A192F]">{caseItem.user}</TableCell>
                  <TableCell>
                    <Badge className={getRiskColor(caseItem.risk)}>{caseItem.risk}</Badge>
                  </TableCell>
                  <TableCell className="text-[#0A192F]">{caseItem.opened_on}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(caseItem.status)}>{caseItem.status}</Badge>
                  </TableCell>
                  <TableCell className="text-[#0A192F]">{caseItem.analyst}</TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Case Details Panel */}
      <div className="lg:col-span-1">
        {selectedCase ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card className="bg-[#F1FAEE] border-[#102A43]/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#0A192F]">Case #{selectedCase.case_id}</h3>
                <Badge className={getStatusColor(selectedCase.status)}>
                  {selectedCase.status}
                </Badge>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#0A192F]/70">User:</span>
                  <span className="text-[#0A192F]">{selectedCase.user}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#0A192F]/70">Risk Level:</span>
                  <Badge className={getRiskColor(selectedCase.risk)}>{selectedCase.risk}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#0A192F]/70">Opened:</span>
                  <span className="text-[#0A192F]">{selectedCase.opened_on}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#0A192F]/70">Analyst:</span>
                  <span className="text-[#0A192F]">{selectedCase.analyst}</span>
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-6">
                <h4 className="text-[#0A192F] mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Timeline
                </h4>
                <div className="space-y-3">
                  {selectedCase.timeline.map((event, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-3 items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="mt-1">
                        {index === selectedCase.timeline.length - 1 ? (
                          <CheckCircle2 className="w-4 h-4 text-[#06D6A0]" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-[#00B4D8]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-[#0A192F]/60">{event.time}</div>
                        <div className="text-sm text-[#0A192F]">{event.event}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* AI Summary */}
              <div className="bg-gradient-to-br from-[#00B4D8]/10 to-[#06D6A0]/10 p-4 rounded-lg border-l-4 border-[#00B4D8] mb-6">
                <h4 className="text-[#0A192F] mb-2">AI-Generated Summary</h4>
                <p className="text-sm text-[#0A192F]/80">{selectedCase.summary}</p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Textarea
                  placeholder="Add a comment or note..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="bg-white border-[#0A192F]/20 text-[#0A192F]"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#00B4D8] text-[#00B4D8] hover:bg-[#00B4D8]/10"
                  >
                    Assign Analyst
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#06D6A0] hover:bg-[#06D6A0]/90 text-gray-900"
                  >
                    Mark as Resolved
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-[#00B4D8] text-[#00B4D8] hover:bg-[#00B4D8]/10"
                >
                  <FileDown className="w-4 h-4 mr-2" />
                  Export PDF Case Report
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <Card className="bg-[#F1FAEE] border-[#102A43]/20 p-6">
            <div className="text-center text-[#0A192F]/60 py-12">
              Select a case to view details
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

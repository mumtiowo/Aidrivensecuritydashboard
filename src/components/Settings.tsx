import { useState } from "react";
import { sentinelData } from "../data/sentinelData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card } from "./ui/card";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Shield, Lock, Webhook, Users } from "lucide-react";

export function Settings() {
  const [riskThreshold, setRiskThreshold] = useState([sentinelData.settings.policies.risk_threshold]);
  const [sensitivity, setSensitivity] = useState(sentinelData.settings.policies.sensitivity);
  const [screenshotAction, setScreenshotAction] = useState(sentinelData.settings.policies.actions.screenshots);
  const [clipboardAction, setClipboardAction] = useState(sentinelData.settings.policies.actions.clipboard);
  const [usbAction, setUsbAction] = useState(sentinelData.settings.policies.actions.usb_upload);
  const [onDeviceInference, setOnDeviceInference] = useState(sentinelData.settings.privacy.on_device_inference);
  const [federatedLearning, setFederatedLearning] = useState(sentinelData.settings.privacy.federated_learning_participation);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="policy" className="w-full">
        <TabsList className="bg-[#F1FAEE] border border-[#102A43]/20">
          <TabsTrigger value="policy" className="data-[state=active]:bg-[#00B4D8] data-[state=active]:text-white">
            <Shield className="w-4 h-4 mr-2" />
            Policy Rules
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-[#00B4D8] data-[state=active]:text-white">
            <Lock className="w-4 h-4 mr-2" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-[#00B4D8] data-[state=active]:text-white">
            <Webhook className="w-4 h-4 mr-2" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="admins" className="data-[state=active]:bg-[#00B4D8] data-[state=active]:text-white">
            <Users className="w-4 h-4 mr-2" />
            Admin Management
          </TabsTrigger>
        </TabsList>

        {/* Policy Rules Tab */}
        <TabsContent value="policy">
          <Card className="bg-[#F1FAEE] border-[#102A43]/20 p-6">
            <h3 className="text-[#0A192F] mb-6">Configure Detection Policies</h3>

            {/* Risk Threshold Slider */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-3">
                  <Label className="text-[#0A192F]">Risk Threshold</Label>
                  <span className="text-sm text-[#00B4D8]">{riskThreshold[0].toFixed(2)}</span>
                </div>
                <Slider
                  value={riskThreshold}
                  onValueChange={setRiskThreshold}
                  min={0.1}
                  max={1.0}
                  step={0.05}
                  className="[&_[role=slider]]:bg-[#00B4D8] [&_[role=slider]]:border-[#00B4D8]"
                />
                <p className="text-xs text-[#0A192F]/60 mt-2">
                  Actions with risk scores above this threshold will trigger alerts
                </p>
              </div>

              {/* Sensitivity Level */}
              <div>
                <Label className="text-[#0A192F] mb-3 block">Model Sensitivity</Label>
                <div className="flex gap-3">
                  {["Low", "Medium", "High"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSensitivity(level)}
                      className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                        sensitivity === level
                          ? "border-[#00B4D8] bg-[#00B4D8]/10 text-[#00B4D8]"
                          : "border-[#0A192F]/20 text-[#0A192F]/60 hover:border-[#00B4D8]/30"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Type Policies */}
              <div className="space-y-4">
                <h4 className="text-[#0A192F]">Response Actions by Type</h4>
                
                <PolicyToggle
                  label="Screenshots"
                  value={screenshotAction}
                  onChange={setScreenshotAction}
                />
                
                <PolicyToggle
                  label="Clipboard Access"
                  value={clipboardAction}
                  onChange={setClipboardAction}
                />
                
                <PolicyToggle
                  label="USB Uploads"
                  value={usbAction}
                  onChange={setUsbAction}
                />
              </div>

              <Button className="w-full bg-[#00B4D8] hover:bg-[#00B4D8]/90 text-white">
                Save Policy Changes
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy">
          <Card className="bg-[#F1FAEE] border-[#102A43]/20 p-6">
            <h3 className="text-[#0A192F] mb-6">Privacy Settings</h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                <div className="flex-1">
                  <Label className="text-[#0A192F]">On-device Inference Only</Label>
                  <p className="text-sm text-[#0A192F]/60 mt-1">
                    All model inference happens locally; no data leaves the machine
                  </p>
                </div>
                <Switch
                  checked={onDeviceInference}
                  onCheckedChange={setOnDeviceInference}
                  className="data-[state=checked]:bg-[#00B4D8]"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                <div className="flex-1">
                  <Label className="text-[#0A192F]">Participate in Federated Learning</Label>
                  <p className="text-sm text-[#0A192F]/60 mt-1">
                    Contribute encrypted model updates to improve global accuracy
                  </p>
                </div>
                <Switch
                  checked={federatedLearning}
                  onCheckedChange={setFederatedLearning}
                  className="data-[state=checked]:bg-[#00B4D8]"
                />
              </div>

              <div className="bg-gradient-to-br from-[#00B4D8]/10 to-[#06D6A0]/10 p-4 rounded-lg border-l-4 border-[#00B4D8]">
                <p className="text-sm text-[#0A192F]/80">
                  Sentinel is designed with privacy-first principles. All sensitive data processing occurs locally on endpoints.
                  Only anonymized, encrypted parameters are shared for model improvement.
                </p>
              </div>

              <Button className="w-full bg-[#00B4D8] hover:bg-[#00B4D8]/90 text-white">
                Save Privacy Settings
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <Card className="bg-[#F1FAEE] border-[#102A43]/20 p-6">
            <h3 className="text-[#0A192F] mb-6">SIEM & Webhook Integrations</h3>

            <div className="space-y-4">
              <div>
                <Label className="text-[#0A192F] mb-2 block">Splunk Webhook URL</Label>
                <Input
                  defaultValue={sentinelData.settings.integrations.splunk_webhook}
                  className="bg-white border-[#0A192F]/20 text-[#0A192F]"
                  placeholder="https://splunk.sentinel/api/webhook"
                />
              </div>

              <div>
                <Label className="text-[#0A192F] mb-2 block">Datadog Webhook URL</Label>
                <Input
                  defaultValue={sentinelData.settings.integrations.datadog_webhook}
                  className="bg-white border-[#0A192F]/20 text-[#0A192F]"
                  placeholder="https://datadog.sentinel/ingest"
                />
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="text-[#0A192F] mb-2">Connected Services</h4>
                <div className="flex gap-2">
                  <Badge className="bg-[#06D6A0] hover:bg-[#06D6A0] text-gray-900">Splunk</Badge>
                  <Badge className="bg-[#06D6A0] hover:bg-[#06D6A0] text-gray-900">Datadog</Badge>
                </div>
              </div>

              <Button className="w-full bg-[#00B4D8] hover:bg-[#00B4D8]/90 text-white">
                Save Integration Settings
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Admin Management Tab */}
        <TabsContent value="admins">
          <Card className="bg-[#F1FAEE] border-[#102A43]/20 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[#0A192F]">Administrator Accounts</h3>
              <Button className="bg-[#00B4D8] hover:bg-[#00B4D8]/90 text-white">
                Add Admin
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="bg-[#102A43] hover:bg-[#102A43]">
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Role</TableHead>
                  <TableHead className="text-white">Access Level</TableHead>
                  <TableHead className="text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sentinelData.settings.admins.map((admin) => (
                  <TableRow key={admin.name}>
                    <TableCell className="text-[#0A192F]">{admin.name}</TableCell>
                    <TableCell className="text-[#0A192F]">{admin.role}</TableCell>
                    <TableCell>
                      <Badge className={admin.access === "Full" ? "bg-[#06D6A0] hover:bg-[#06D6A0] text-gray-900" : "bg-[#F9C74F] hover:bg-[#F9C74F] text-gray-900"}>
                        {admin.access}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#F94144] text-[#F94144] hover:bg-[#F94144]/10"
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface PolicyToggleProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function PolicyToggle({ label, value, onChange }: PolicyToggleProps) {
  const actions = ["Block", "Warn", "Audit"];

  return (
    <div className="bg-white p-4 rounded-lg">
      <Label className="text-[#0A192F] mb-3 block">{label}</Label>
      <div className="flex gap-2">
        {actions.map((action) => (
          <button
            key={action}
            onClick={() => onChange(action)}
            className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
              value === action
                ? action === "Block"
                  ? "border-[#F94144] bg-[#F94144]/10 text-[#F94144]"
                  : action === "Warn"
                  ? "border-[#F9C74F] bg-[#F9C74F]/10 text-[#F9C74F]"
                  : "border-[#00B4D8] bg-[#00B4D8]/10 text-[#00B4D8]"
                : "border-[#0A192F]/20 text-[#0A192F]/60 hover:border-[#00B4D8]/30"
            }`}
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}

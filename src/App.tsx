import { useState } from "react";
import { Login } from "./components/Login";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { Dashboard } from "./components/Dashboard";
import { AlertsCenter } from "./components/AlertsCenter";
import { BehavioralAnalytics } from "./components/BehavioralAnalytics";
import { EndpointMonitoring } from "./components/EndpointMonitoring";
import { FederatedLearning } from "./components/FederatedLearning";
import { CaseManagement } from "./components/CaseManagement";
import { Settings } from "./components/Settings";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeScreen, setActiveScreen] = useState("dashboard");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveScreen("dashboard");
  };

  const getScreenTitle = () => {
    switch (activeScreen) {
      case "dashboard":
        return "Dashboard";
      case "alerts":
        return "Alerts Center";
      case "endpoints":
        return "Endpoint Monitoring";
      case "analytics":
        return "Behavioral Analytics";
      case "cases":
        return "Case Management";
      case "federated":
        return "Federated Learning";
      case "settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-[#0A192F] overflow-hidden">
      <Sidebar activeScreen={activeScreen} onNavigate={setActiveScreen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar title={getScreenTitle()} onLogout={handleLogout} />
        
        <main className="flex-1 overflow-y-auto bg-[#0A192F] p-8">
          {activeScreen === "dashboard" && <Dashboard onNavigate={setActiveScreen} />}
          {activeScreen === "alerts" && <AlertsCenter />}
          {activeScreen === "analytics" && <BehavioralAnalytics />}
          {activeScreen === "endpoints" && <EndpointMonitoring />}
          {activeScreen === "federated" && <FederatedLearning />}
          {activeScreen === "cases" && <CaseManagement />}
          {activeScreen === "settings" && <Settings />}
        </main>
      </div>

      <Toaster />
    </div>
  );
}

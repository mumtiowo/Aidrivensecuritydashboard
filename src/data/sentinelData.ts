export const sentinelData = {
  dashboard: {
    summary: {
      actions_blocked_today: 24,
      high_risk: 5,
      medium_risk: 12,
      low_risk: 7,
      last_synced: "5 mins ago"
    },
    realtime_feed: [
      "🧠 AI blocked screenshot with API key (Alex T.)",
      "⚠️ Large upload to Google Drive detected (Sara W.)",
      "✅ Clipboard scan passed (DevOps machine)",
      "🚫 Blocked USB transfer of confidential.pdf (Noah R.)",
      "🔍 AI flagged camera photo of screen (Aria M.)"
    ],
    risk_heatmap: [
      { department: "Engineering", risk_score: 0.92, incidents: 15, trigger: "Screenshots with API keys" },
      { department: "Marketing", risk_score: 0.71, incidents: 9, trigger: "External email attachments" },
      { department: "Finance", risk_score: 0.83, incidents: 12, trigger: "Unusual cloud uploads" },
      { department: "Legal", risk_score: 0.65, incidents: 5, trigger: "File copy to USB" }
    ],
    endpoint_health: {
      active: 43,
      offline: 2,
      pending_updates: 5
    }
  },

  alerts: [
    {
      id: 20341,
      timestamp: "10:42 PM",
      user: "Alex T.",
      action_type: "Screenshot",
      risk_score: 0.89,
      status: "Blocked",
      ai_explanation: "Screenshot contained API keys",
      details: "Model detected visual tokens resembling code credentials. Confidence: 0.89 | Class: 'Sensitive Code Snippet'"
    },
    {
      id: 20340,
      timestamp: "9:15 PM",
      user: "Sara W.",
      action_type: "Cloud Upload",
      risk_score: 0.76,
      status: "Warned",
      ai_explanation: "Unusual upload of 1.8GB to Google Drive",
      details: "Upload size 18× higher than user's 30-day baseline. Possible exfiltration attempt."
    },
    {
      id: 20339,
      timestamp: "7:08 PM",
      user: "Noah R.",
      action_type: "USB Transfer",
      risk_score: 0.81,
      status: "Blocked",
      ai_explanation: "File name matched internal confidential pattern",
      details: "Attempted transfer of confidential.pdf containing sensitive financial data."
    },
    {
      id: 20338,
      timestamp: "5:50 PM",
      user: "Aria M.",
      action_type: "Photo Detected",
      risk_score: 0.65,
      status: "Audited",
      ai_explanation: "Phone camera detected facing screen with code",
      details: "Visual detection system identified mobile device camera pointing at monitor displaying source code."
    }
  ],

  behavioral_analytics: {
    users: [
      {
        name: "Sara W.",
        risk_score: 0.82,
        trend: "↑ 14%",
        last_anomaly: "3AM mass file export",
        avatar: "SW"
      },
      {
        name: "Alex T.",
        risk_score: 0.89,
        trend: "↑ 21%",
        last_anomaly: "Repeated screenshots of internal dashboard",
        avatar: "AT"
      },
      {
        name: "Noah R.",
        risk_score: 0.77,
        trend: "↓ 5%",
        last_anomaly: "Normal behavior restored",
        avatar: "NR"
      },
      {
        name: "Aria M.",
        risk_score: 0.65,
        trend: "↑ 8%",
        last_anomaly: "Unusual late-night activity",
        avatar: "AM"
      }
    ],
    activity_volume: [
      { date: "Oct 28", actions: 42 },
      { date: "Oct 29", actions: 54 },
      { date: "Oct 30", actions: 76 },
      { date: "Oct 31", actions: 65 },
      { date: "Nov 1", actions: 88 }
    ],
    user_trends: [
      { date: "Oct 28", "Alex T.": 0.86, "Sara W.": 0.78, "Noah R.": 0.65, "Aria M.": 0.69 },
      { date: "Oct 29", "Alex T.": 0.89, "Sara W.": 0.82, "Noah R.": 0.67, "Aria M.": 0.71 },
      { date: "Oct 30", "Alex T.": 0.88, "Sara W.": 0.84, "Noah R.": 0.66, "Aria M.": 0.70 },
      { date: "Oct 31", "Alex T.": 0.91, "Sara W.": 0.86, "Noah R.": 0.69, "Aria M.": 0.72 },
      { date: "Nov 1", "Alex T.": 0.89, "Sara W.": 0.82, "Noah R.": 0.68, "Aria M.": 0.70 }
    ],
    radar_data: [
      { category: "Clipboard", Engineering: 0.41, Finance: 0.37, Marketing: 0.46, Legal: 0.33, IT: 0.52 },
      { category: "USB", Engineering: 0.28, Finance: 0.55, Marketing: 0.39, Legal: 0.64, IT: 0.71 },
      { category: "Cloud", Engineering: 0.67, Finance: 0.83, Marketing: 0.74, Legal: 0.48, IT: 0.69 },
      { category: "Screenshots", Engineering: 0.92, Finance: 0.72, Marketing: 0.51, Legal: 0.45, IT: 0.77 },
      { category: "Code", Engineering: 0.88, Finance: 0.60, Marketing: 0.49, Legal: 0.52, IT: 0.63 }
    ]
  },

  endpoints: [
    {
      device: "ENG-LAPTOP-07",
      os: "Windows",
      last_seen: "2 mins ago",
      model_version: "v1.2.3",
      status: "Active"
    },
    {
      device: "MKT-MAC-02",
      os: "macOS",
      last_seen: "12 mins ago",
      model_version: "v1.2.1",
      status: "Warning"
    },
    {
      device: "FIN-LINUX-04",
      os: "Linux",
      last_seen: "Offline for 26 mins",
      model_version: "v1.1.8",
      status: "Offline"
    },
    {
      device: "HR-WINDOWS-11",
      os: "Windows",
      last_seen: "5 mins ago",
      model_version: "v1.2.3",
      status: "Active"
    },
    {
      device: "LEGAL-MAC-05",
      os: "macOS",
      last_seen: "1 min ago",
      model_version: "v1.2.3",
      status: "Active"
    }
  ],

  federated_learning: {
    total_endpoints: 120,
    current_round: "24 / 50",
    global_model: "v3.0",
    differential_privacy: "σ = 0.8",
    text: "Your data never leaves your device. Sentinel uses federated learning to aggregate knowledge while preserving user privacy.",
    progress_data: [
      { round: 1, endpoints: 12, accuracy: 0.71, noise: 1.2 },
      { round: 5, endpoints: 25, accuracy: 0.75, noise: 1.1 },
      { round: 10, endpoints: 46, accuracy: 0.78, noise: 1.0 },
      { round: 15, endpoints: 63, accuracy: 0.81, noise: 0.9 },
      { round: 20, endpoints: 92, accuracy: 0.84, noise: 0.85 },
      { round: 24, endpoints: 120, accuracy: 0.87, noise: 0.8 }
    ]
  },

  cases: [
    {
      case_id: 412,
      user: "Sara W.",
      risk: "High",
      opened_on: "Nov 1, 2025",
      status: "Open",
      analyst: "J. Raymond",
      summary: "Mass upload to Dropbox detected (4GB). AI flagged deviation 18× above normal activity baseline.",
      timeline: [
        { time: "11:05 AM", event: "Detected unusual upload (4GB, Dropbox)" },
        { time: "11:07 AM", event: "Blocked and logged" },
        { time: "11:09 AM", event: "Manager Notified" }
      ]
    },
    {
      case_id: 398,
      user: "Alex T.",
      risk: "Medium",
      opened_on: "Oct 30, 2025",
      status: "Under Review",
      analyst: "M. Ortega",
      summary: "Multiple screenshots captured from internal dashboard after office hours.",
      timeline: [
        { time: "9:42 PM", event: "First screenshot detected" },
        { time: "9:45 PM", event: "Pattern of 5 screenshots identified" },
        { time: "9:50 PM", event: "Alert escalated to manager" }
      ]
    },
    {
      case_id: 385,
      user: "Noah R.",
      risk: "Low",
      opened_on: "Oct 28, 2025",
      status: "Resolved",
      analyst: "J. Raymond",
      summary: "USB transfer flagged but verified as legitimate backup operation.",
      timeline: [
        { time: "2:15 PM", event: "USB transfer detected" },
        { time: "2:20 PM", event: "User contacted for verification" },
        { time: "2:45 PM", event: "Verified and marked as legitimate" }
      ]
    }
  ],

  settings: {
    policies: {
      risk_threshold: 0.7,
      sensitivity: "Medium",
      actions: {
        screenshots: "Block",
        clipboard: "Warn",
        usb_upload: "Audit"
      }
    },
    privacy: {
      on_device_inference: true,
      federated_learning_participation: true
    },
    integrations: {
      splunk_webhook: "https://splunk.sentinel/api/webhook",
      datadog_webhook: "https://datadog.sentinel/ingest"
    },
    admins: [
      { name: "J. Raymond", role: "Security Analyst", access: "Full" },
      { name: "M. Ortega", role: "Compliance Officer", access: "Read-Only" },
      { name: "K. Chen", role: "Security Manager", access: "Full" }
    ]
  }
};

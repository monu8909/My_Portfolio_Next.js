"use client";

import { useState } from "react";
import {
  Search,
  Bell,
  Moon,
  Sun,
  Menu,
  ChevronDown,
  ChevronRight,
  User,
  Settings,
  LogOut,
  BarChart3,
  LineChart,
  PieChart as PieChartIcon,
  AreaChart,
  Activity,
} from "lucide-react";

interface DashboardNavbarProps {
  sidebarCollapsed: boolean;
}

const chartTypes = [
  {
    id: "revenue",
    name: "Revenue Overview",
    description: "Area chart with revenue & users",
    icon: AreaChart,
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "sales",
    name: "Sales by Category",
    description: "Pie chart distribution",
    icon: PieChartIcon,
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "weekly",
    name: "Weekly Performance",
    description: "Bar chart by day",
    icon: BarChart3,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "trend",
    name: "Revenue Trend",
    description: "Line chart trend",
    icon: LineChart,
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "analytics",
    name: "Analytics View",
    description: "Combined analytics",
    icon: Activity,
    color: "from-pink-500 to-rose-600",
  },
];

export default function DashboardNavbar({ sidebarCollapsed }: DashboardNavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedChart, setSelectedChart] = useState<string | null>(null);

  const notifications = [
    { id: 1, title: "New user registered", time: "2 min ago", type: "user" },
    { id: 2, title: "Payment received: $2,450", time: "15 min ago", type: "payment" },
    { id: 3, title: "Server load is high", time: "1 hour ago", type: "alert" },
  ];

  return (
    <header
      className={`fixed top-0 right-0 h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 transition-all duration-300 z-40 ${
        sidebarCollapsed ? "left-16" : "left-64"
      }`}
    >
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-400">
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 md:w-80 pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <div className="relative">
            <button
              onClick={() => {
                setShowCharts(!showCharts);
                setShowNotifications(false);
                setShowProfile(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                showCharts
                  ? "bg-violet-500/20 text-violet-400"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="hidden md:inline text-sm font-medium">Charts</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showCharts ? "rotate-180" : ""}`} />
            </button>

            {showCharts && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowCharts(false)} />
                <div className="absolute left-0 mt-2 w-96 bg-slate-800 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden z-40">
                  <div className="px-4 py-3 border-b border-slate-700/50 flex items-center justify-between">
                    <h3 className="font-semibold text-white">Chart Types</h3>
                    <span className="text-xs text-slate-500">{chartTypes.length} charts</span>
                  </div>
                  
                  <div className="p-2 max-h-96 overflow-y-auto">
                    {chartTypes.map((chart) => {
                      const Icon = chart.icon;
                      return (
                        <button
                          key={chart.id}
                          onClick={() => {
                            setSelectedChart(chart.id);
                            setShowCharts(false);
                          }}
                          className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
                            selectedChart === chart.id
                              ? "bg-violet-500/20 border border-violet-500/30"
                              : "hover:bg-slate-700/50 border border-transparent"
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${chart.color} flex items-center justify-center shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-white">{chart.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{chart.description}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-600" />
                        </button>
                      );
                    })}
                  </div>

                  <div className="px-4 py-3 border-t border-slate-700/50 bg-slate-800/50">
                    <button className="w-full text-sm text-violet-400 hover:text-violet-300 transition-colors">
                      View all charts →
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowCharts(false);
                setShowProfile(false);
              }}
              className={`p-2 rounded-lg transition-colors relative ${
                showNotifications
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {showNotifications && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowNotifications(false)} />
                <div className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden z-40">
                  <div className="px-4 py-3 border-b border-slate-700/50">
                    <h3 className="font-semibold text-white">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="px-4 py-3 hover:bg-slate-700/50 border-b border-slate-700/30 last:border-0 transition-colors cursor-pointer"
                      >
                        <p className="text-sm text-slate-200">{notif.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 bg-slate-800/50 border-t border-slate-700/50">
                    <button className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowCharts(false);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-800/50 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">MR</span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">Monu Rajput</p>
                <p className="text-xs text-slate-500">Admin</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-500 hidden md:block transition-transform ${showProfile ? "rotate-180" : ""}`} />
            </button>

            {showProfile && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowProfile(false)} />
                <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden z-40">
                  <div className="px-4 py-3 border-b border-slate-700/50">
                    <p className="text-sm font-medium text-white">Monu Rajput</p>
                    <p className="text-xs text-slate-500">monu@example.com</p>
                  </div>
                  <div className="py-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors">
                      <User className="w-4 h-4" />
                      <span className="text-sm">My Profile</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Settings</span>
                    </button>
                  </div>
                  <div className="py-2 border-t border-slate-700/50">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Sign out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

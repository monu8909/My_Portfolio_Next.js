"use client";

import { useState, useEffect } from "react";
import {
  DollarSign,
  Users,
  ShoppingBag,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import StatsCard from "@/components/dashboard/StatsCard";
import { RevenueChart, SalesChart, WeeklyChart, LineChartComponent } from "@/components/dashboard/Charts";
import { ActivityTable, TopProducts } from "@/components/dashboard/ActivityTable";

const statsData = [
  {
    title: "Total Revenue",
    value: "$89,450",
    change: 12.5,
    icon: <DollarSign className="w-5 h-5 text-white" />,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "Active Users",
    value: "12,847",
    change: 8.2,
    icon: <Users className="w-5 h-5 text-white" />,
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    title: "Total Orders",
    value: "3,642",
    change: -2.4,
    icon: <ShoppingBag className="w-5 h-5 text-white" />,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "Conversion Rate",
    value: "24.5%",
    change: 5.7,
    icon: <TrendingUp className="w-5 h-5 text-white" />,
    gradient: "from-amber-500 to-orange-600",
  },
];

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("overview");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <DashboardSidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      <DashboardNavbar sidebarCollapsed={sidebarCollapsed} />

      <main
        className={`pt-16 min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <div className="p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
            <p className="text-slate-400">
              Welcome back! Here&apos;s what&apos;s happening with your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <RevenueChart />
            <SalesChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <WeeklyChart />
            <div className="space-y-6">
              <TopProducts />
              <div className="rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Quick Actions
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                      Common tasks and shortcuts
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Add User", icon: "👤", color: "from-blue-500/20 to-cyan-500/20 border-blue-500/20" },
                    { label: "New Order", icon: "📦", color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/20" },
                    { label: "Generate Report", icon: "📊", color: "from-violet-500/20 to-purple-500/20 border-violet-500/20" },
                    { label: "View Analytics", icon: "📈", color: "from-amber-500/20 to-orange-500/20 border-amber-500/20" },
                  ].map((action, index) => (
                    <button
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br ${action.color} border transition-all hover:scale-[1.02] hover:shadow-lg`}
                    >
                      <span className="text-2xl">{action.icon}</span>
                      <span className="text-sm font-medium text-white">
                        {action.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <ActivityTable />
            </div>
            <div className="space-y-6">
              <LineChartComponent />
              <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Revenue Goal
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-400">Monthly Target</span>
                      <span className="text-white font-medium">$100,000</span>
                    </div>
                    <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                        style={{ width: "89%" }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">89% achieved</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-400">Yearly Target</span>
                      <span className="text-white font-medium">$1,000,000</span>
                    </div>
                    <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                        style={{ width: "65%" }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">65% achieved</p>
                  </div>
                </div>
                <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        On track! Great job!
                      </p>
                      <p className="text-xs text-emerald-400">
                        +15% from last month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

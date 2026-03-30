"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  Bell,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Wallet,
  CreditCard,
  FileText,
  PieChart as PieChartIcon,
  LineChart,
  AreaChart,
} from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { id: "charts", label: "Charts", icon: BarChart3, href: "/dashboard/charts" },
  { id: "users", label: "Users", icon: Users, href: "/dashboard/users" },
  { id: "orders", label: "Orders", icon: ShoppingCart, href: "/dashboard/orders" },
  { id: "revenue", label: "Revenue", icon: Wallet, href: "/dashboard/revenue" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
  { id: "transactions", label: "Transactions", icon: CreditCard, href: "/dashboard/transactions" },
  { id: "reports", label: "Reports", icon: FileText, href: "/dashboard/reports" },
];

const chartTypes = [
  { id: "area", label: "Area Charts", icon: AreaChart, href: "/dashboard/charts?type=area" },
  { id: "bar", label: "Bar Charts", icon: BarChart3, href: "/dashboard/charts?type=bar" },
  { id: "line", label: "Line Charts", icon: LineChart, href: "/dashboard/charts?type=line" },
  { id: "pie", label: "Pie Charts", icon: PieChartIcon, href: "/dashboard/charts?type=pie" },
];

const bottomMenuItems = [
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "help", label: "Help Center", icon: HelpCircle },
];

export default function DashboardSidebar({
  collapsed,
  setCollapsed,
  activeItem,
  setActiveItem,
}: SidebarProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedItem === id) {
      setExpandedItem(null);
    } else {
      setExpandedItem(id);
    }
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800/50 transition-all duration-300 z-50 flex flex-col ${
        collapsed ? "w-16" : "w-64"
      }`}
      style={{
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800/50">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-semibold text-white">MonuDash</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-sm">M</span>
          </div>
        )}
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            const isExpanded = expandedItem === item.id;
            const hasSubmenu = item.id === "charts";

            return (
              <li key={item.id}>
                {item.href && !hasSubmenu ? (
                  <Link
                    href={item.href}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                      isActive
                        ? "bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-400"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-r-full" />
                    )}
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        isActive ? "text-violet-400" : "text-slate-500 group-hover:text-slate-300"
                      }`}
                    />
                    {!collapsed && (
                      <span className="font-medium text-sm">{item.label}</span>
                    )}
                    {collapsed && (
                      <div className="absolute left-full ml-2 px-3 py-1.5 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl">
                        {item.label}
                      </div>
                    )}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        if (hasSubmenu) {
                          toggleExpand(item.id);
                        }
                        setActiveItem(item.id);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                        isActive
                          ? "bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-400"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-r-full" />
                      )}
                      <Icon
                        className={`w-5 h-5 flex-shrink-0 ${
                          isActive ? "text-violet-400" : "text-slate-500 group-hover:text-slate-300"
                        }`}
                      />
                      {!collapsed && (
                        <>
                          <span className="font-medium text-sm flex-1">{item.label}</span>
                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${
                              isExpanded ? "rotate-90" : ""
                            }`}
                          />
                        </>
                      )}
                      {collapsed && (
                        <div className="absolute left-full ml-2 px-3 py-1.5 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl">
                          {item.label}
                        </div>
                      )}
                    </button>
                    
                    {!collapsed && hasSubmenu && isExpanded && (
                      <ul className="ml-6 mt-2 space-y-1 border-l border-slate-700/50 pl-4">
                        {chartTypes.map((chart) => {
                          const ChartIcon = chart.icon;
                          return (
                            <li key={chart.id}>
                              <Link
                                href={chart.href}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800/50 transition-colors"
                              >
                                <ChartIcon className="w-4 h-4" />
                                <span className="text-sm">{chart.label}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="py-4 border-t border-slate-800/50">
        <ul className="space-y-1 px-2">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-400"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0 text-slate-500 group-hover:text-slate-300" />
                  {!collapsed && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-3 py-1.5 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl">
                      {item.label}
                    </div>
                  )}
                </button>
              </li>
            );
          })}
          <li>
            <button
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 group"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium text-sm">Logout</span>}
            </button>
          </li>
        </ul>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-200 shadow-lg"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </aside>
  );
}

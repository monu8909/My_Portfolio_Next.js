"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Filter,
  Download,
  Maximize2,
  X,
  BarChart3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  AreaChart as AreaChartIcon,
  Activity,
  TrendingUp,
  Calendar,
  RefreshCw,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const chartTypes = [
  {
    id: "revenue",
    name: "Revenue Overview",
    description: "Area chart with revenue & users",
    icon: AreaChartIcon,
    color: "from-violet-500 to-purple-600",
    gradient: "rgba(139, 92, 246, 0.3)",
  },
  {
    id: "sales",
    name: "Sales by Category",
    description: "Pie chart distribution",
    icon: PieChartIcon,
    color: "from-cyan-500 to-blue-600",
    gradient: "rgba(6, 182, 212, 0.3)",
  },
  {
    id: "weekly",
    name: "Weekly Performance",
    description: "Bar chart by day",
    icon: BarChart3,
    color: "from-emerald-500 to-teal-600",
    gradient: "rgba(16, 185, 129, 0.3)",
  },
  {
    id: "trend",
    name: "Revenue Trend",
    description: "Line chart trend",
    icon: LineChartIcon,
    color: "from-amber-500 to-orange-600",
    gradient: "rgba(245, 158, 11, 0.3)",
  },
  {
    id: "analytics",
    name: "Analytics View",
    description: "Combined analytics",
    icon: Activity,
    color: "from-pink-500 to-rose-600",
    gradient: "rgba(236, 72, 153, 0.3)",
  },
];

const revenueData = [
  { month: "Jan", revenue: 4200, users: 2400 },
  { month: "Feb", revenue: 3800, users: 1398 },
  { month: "Mar", revenue: 5100, users: 4800 },
  { month: "Apr", revenue: 4600, users: 3800 },
  { month: "May", revenue: 5800, users: 4300 },
  { month: "Jun", revenue: 6200, users: 5100 },
  { month: "Jul", revenue: 7500, users: 5800 },
  { month: "Aug", revenue: 6800, users: 5400 },
  { month: "Sep", revenue: 7200, users: 6100 },
  { month: "Oct", revenue: 8100, users: 6800 },
  { month: "Nov", revenue: 8900, users: 7400 },
  { month: "Dec", revenue: 9500, users: 8200 },
];

const salesData = [
  { name: "Electronics", value: 4000, color: "#8b5cf6" },
  { name: "Clothing", value: 3000, color: "#06b6d4" },
  { name: "Food", value: 2000, color: "#10b981" },
  { name: "Books", value: 1500, color: "#f59e0b" },
  { name: "Others", value: 1000, color: "#ec4899" },
];

const weeklyData = [
  { day: "Mon", sales: 2400, orders: 1200 },
  { day: "Tue", sales: 3200, orders: 1800 },
  { day: "Wed", sales: 2800, orders: 1500 },
  { day: "Thu", sales: 3600, orders: 2100 },
  { day: "Fri", sales: 4200, orders: 2400 },
  { day: "Sat", sales: 3800, orders: 2200 },
  { day: "Sun", sales: 2900, orders: 1600 },
];

const trendData = [
  { week: "W1", value: 3200 },
  { week: "W2", value: 3800 },
  { week: "W3", value: 3500 },
  { week: "W4", value: 4200 },
  { week: "W5", value: 4800 },
  { week: "W6", value: 5200 },
];

const analyticsData = [
  { hour: "00", visits: 400, pageViews: 2400 },
  { hour: "04", visits: 300, pageViews: 1398 },
  { hour: "08", visits: 600, pageViews: 4800 },
  { hour: "12", visits: 800, pageViews: 6200 },
  { hour: "16", visits: 700, pageViews: 5100 },
  { hour: "20", visits: 900, pageViews: 7500 },
];

interface ChartPreviewProps {
  chart: typeof chartTypes[0];
  onViewFull: () => void;
}

function ChartPreview({ chart, onViewFull }: ChartPreviewProps) {
  const Icon = chart.icon;

  return (
    <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden hover:border-slate-600/50 transition-all group">
      <div className="relative h-64 bg-slate-900/50">
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-20 h-20 text-slate-700 group-hover:text-slate-600 transition-colors" />
        </div>
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onViewFull}
            className="p-2 rounded-lg bg-slate-800/90 backdrop-blur-sm text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${chart.color} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">{chart.name}</h3>
            <p className="text-xs text-slate-500">{chart.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FullChartModalProps {
  chartId: string;
  onClose: () => void;
}

function FullChartModal({ chartId, onClose }: FullChartModalProps) {
  const chart = chartTypes.find((c) => c.id === chartId);
  const Icon = chart?.icon || AreaChartIcon;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 shadow-xl">
          <p className="text-slate-400 text-sm mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {entry.name}: ${entry.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${chart?.color} flex items-center justify-center`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">{chart?.name}</h2>
              <p className="text-sm text-slate-500">{chart?.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 h-[500px]">
          {chartId === "revenue" && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenueFull" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorUsersFull" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#8b5cf6" strokeWidth={2} fill="url(#colorRevenueFull)" />
                <Area type="monotone" dataKey="users" name="Users" stroke="#06b6d4" strokeWidth={2} fill="url(#colorUsersFull)" />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {chartId === "sales" && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={140}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {salesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 shadow-xl">
                          <p className="text-white font-medium">{data.name}</p>
                          <p className="text-violet-400">${data.value.toLocaleString()}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}

          {chartId === "weekly" && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="sales" name="Sales" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="orders" name="Orders" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {chartId === "trend" && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" name="Revenue" stroke="#f59e0b" strokeWidth={3} dot={{ fill: "#f59e0b", strokeWidth: 2, r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          )}

          {chartId === "analytics" && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorVisitsFull" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area type="monotone" dataKey="visits" name="Visits" stroke="#ec4899" strokeWidth={2} fill="url(#colorVisitsFull)" />
                <Area type="monotone" dataKey="pageViews" name="Page Views" stroke="#8b5cf6" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ChartsGallery() {
  const [selectedChart, setSelectedChart] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const filteredCharts = chartTypes.filter((chart) => {
    if (filter === "all") return true;
    if (filter === "area") return chart.id === "revenue" || chart.id === "analytics";
    if (filter === "bar") return chart.id === "weekly";
    if (filter === "pie") return chart.id === "sales";
    if (filter === "line") return chart.id === "trend";
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Charts Gallery</h1>
            <p className="text-slate-400">Explore all available chart types and visualizations</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-colors">
            <Download className="w-4 h-4" />
            Export All
          </button>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-sm text-slate-400">Filter:</span>
          </div>
          <div className="flex gap-2">
            {[
              { id: "all", label: "All" },
              { id: "area", label: "Area" },
              { id: "bar", label: "Bar" },
              { id: "pie", label: "Pie" },
              { id: "line", label: "Line" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f.id
                    ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                    : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-800"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCharts.map((chart) => (
            <ChartPreview
              key={chart.id}
              chart={chart}
              onViewFull={() => setSelectedChart(chart.id)}
            />
          ))}
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Interactive Charts</h2>
              <p className="text-slate-400">Click on any chart to view full-size with interactive tooltips</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Calendar, label: "Real-time data", value: "Live updates" },
              { icon: Activity, label: "Responsive", value: "Any screen size" },
              { icon: BarChart3, label: "Exportable", value: "PNG, SVG, CSV" },
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/30">
                <feature.icon className="w-5 h-5 text-violet-400" />
                <div>
                  <p className="text-sm font-medium text-white">{feature.label}</p>
                  <p className="text-xs text-slate-500">{feature.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedChart && (
        <FullChartModal chartId={selectedChart} onClose={() => setSelectedChart(null)} />
      )}
    </div>
  );
}

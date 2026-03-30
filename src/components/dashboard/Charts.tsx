"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

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

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

function ChartCard({ title, subtitle, children, className = "" }: ChartCardProps) {
  return (
    <div className={`rounded-2xl bg-slate-800/50 border border-slate-700/50 p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 shadow-xl">
        <p className="text-slate-400 text-sm mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

function BarTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 shadow-xl">
        <p className="text-slate-400 text-sm mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export function RevenueChart() {
  return (
    <ChartCard
      title="Revenue Overview"
      subtitle="Monthly revenue and user growth"
      className="col-span-2"
    >
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: 20 }}
              iconType="circle"
              formatter={(value) => <span className="text-slate-300 text-sm">{value}</span>}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#8b5cf6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="users"
              name="Users"
              stroke="#06b6d4"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUsers)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function SalesChart() {
  return (
    <ChartCard title="Sales by Category" subtitle="Distribution of sales">
      <div className="h-72 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={salesData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
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
                      <p className="text-violet-400 text-sm">${data.value.toLocaleString()}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              iconType="circle"
              formatter={(value) => <span className="text-slate-300 text-sm">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function WeeklyChart() {
  return (
    <ChartCard title="Weekly Performance" subtitle="Sales and orders by day">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData} barGap={8}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<BarTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: 20 }}
              iconType="circle"
              formatter={(value) => <span className="text-slate-300 text-sm">{value}</span>}
            />
            <Bar dataKey="sales" name="Sales" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
            <Bar dataKey="orders" name="Orders" fill="#06b6d4" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function LineChartComponent() {
  return (
    <ChartCard
      title="Revenue Trend"
      subtitle="Last 6 months performance"
      className="col-span-1"
    >
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData.slice(6)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "#8b5cf6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

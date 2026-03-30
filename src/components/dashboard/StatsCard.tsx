"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  gradient?: string;
}

export default function StatsCard({
  title,
  value,
  change,
  icon,
  gradient = "from-violet-500 to-purple-600",
}: StatsCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-slate-800/50 border border-slate-700/50 p-6 hover:border-slate-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/5">
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
          {icon}
        </div>
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            isPositive
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
        <p className="text-sm text-slate-400">{title}</p>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs">
        <span className={isPositive ? "text-emerald-400" : "text-red-400"}>
          {isPositive ? "+" : ""}
          {change}% from last month
        </span>
      </div>

      <div
        className="absolute -bottom-1 -right-1 w-20 h-20 rounded-full bg-gradient-to-br from-violet-500/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  );
}

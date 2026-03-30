"use client";

import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

const recentActivity = [
  {
    id: 1,
    user: "Sarah Chen",
    email: "sarah@example.com",
    action: "New order placed",
    amount: "$2,450",
    status: "completed",
    time: "2 min ago",
    avatar: "SC",
  },
  {
    id: 2,
    user: "Michael Park",
    email: "michael@example.com",
    action: "Subscription renewed",
    amount: "$99",
    status: "completed",
    time: "15 min ago",
    avatar: "MP",
  },
  {
    id: 3,
    user: "Emma Wilson",
    email: "emma@example.com",
    action: "Payment failed",
    amount: "$1,200",
    status: "failed",
    time: "1 hour ago",
    avatar: "EW",
  },
  {
    id: 4,
    user: "James Lee",
    email: "james@example.com",
    action: "New user registered",
    amount: "-",
    status: "pending",
    time: "2 hours ago",
    avatar: "JL",
  },
  {
    id: 5,
    user: "Lisa Anderson",
    email: "lisa@example.com",
    action: "Invoice paid",
    amount: "$3,800",
    status: "completed",
    time: "3 hours ago",
    avatar: "LA",
  },
];

const topProducts = [
  { id: 1, name: "MacBook Pro M3", sales: 124, revenue: "$186,000", trend: "+12%" },
  { id: 2, name: "iPhone 15 Pro", sales: 98, revenue: "$97,000", trend: "+8%" },
  { id: 3, name: "AirPods Pro", sales: 156, revenue: "$46,800", trend: "+15%" },
  { id: 4, name: "iPad Air", sales: 67, revenue: "$40,200", trend: "+5%" },
];

interface ActionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

function ActionMenu({ onEdit, onDelete }: ActionMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-1 w-40 bg-slate-800 border border-slate-700/50 rounded-xl shadow-xl z-20 overflow-hidden">
            <button
              onClick={() => {
                onEdit();
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
            >
              <Eye className="w-4 h-4" />
              View Details
            </button>
            <button
              onClick={() => {
                onEdit();
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function getStatusBadge(status: string) {
  const styles = {
    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    failed: "bg-red-500/10 text-red-400 border-red-500/20",
    processing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };
  return styles[status as keyof typeof styles] || styles.pending;
}

export function ActivityTable() {
  return (
    <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
          <p className="text-sm text-slate-400 mt-0.5">Latest transactions and events</p>
        </div>
        <button className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                User
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Action
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Time
              </th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {recentActivity.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-700/20 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/20 flex items-center justify-center">
                      <span className="text-xs font-semibold text-violet-400">
                        {item.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{item.user}</p>
                      <p className="text-xs text-slate-500">{item.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-300">{item.action}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-white">{item.amount}</span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-500">{item.time}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <ActionMenu onEdit={() => {}} onDelete={() => {}} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function TopProducts() {
  return (
    <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Top Products</h3>
          <p className="text-sm text-slate-400 mt-0.5">Best selling items</p>
        </div>
        <button className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
          View all
        </button>
      </div>

      <div className="p-6 space-y-4">
        {topProducts.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-700/30 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center">
                <span className="text-sm font-bold text-slate-400">#{index + 1}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">{product.name}</p>
                <p className="text-xs text-slate-500">{product.sales} sales</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-white">{product.revenue}</p>
              <p className="text-xs text-emerald-400">{product.trend}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

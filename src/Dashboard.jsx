import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { Target, CheckCircle2, StickyNote, Bookmark, Activity } from 'lucide-react';
import { getMonthSummaryTitle } from './utils/roadmapState';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl">
      <p className="font-semibold text-slate-200 mb-2">{label}</p>
      <div className="flex flex-col gap-1">
        <span className="text-indigo-400 text-sm">Tamamlanan: {payload[0].value} görev</span>
        <span className="text-slate-400 text-sm">Toplam: {payload[0].payload.Toplam} görev</span>
      </div>
      <div className="mt-2 pt-2 border-t border-slate-700/50">
        <span className="text-xs font-medium text-emerald-400">İlerleme: %{payload[0].payload.percentage}</span>
      </div>
    </div>
  );
}

export default function Dashboard({ data, weeklyNotes, weeklyLinks }) {
  const stats = useMemo(() => {
    const chartData = data.map((month) => {
      const monthTotal = month.weeks.reduce((total, week) => total + week.todos.length, 0);
      const monthCompleted = month.weeks.reduce(
        (total, week) => total + week.todos.filter((todo) => todo.completed).length,
        0
      );

      return {
        name: getMonthSummaryTitle(month.title),
        Tamamlanan: monthCompleted,
        Toplam: monthTotal,
        percentage: monthTotal > 0 ? Math.round((monthCompleted / monthTotal) * 100) : 0
      };
    });

    const totals = chartData.reduce(
      (acc, month) => ({
        totalTodos: acc.totalTodos + month.Toplam,
        completedTodos: acc.completedTodos + month.Tamamlanan
      }),
      { totalTodos: 0, completedTodos: 0 }
    );

    return {
      totalTodos: totals.totalTodos,
      completedTodos: totals.completedTodos,
      completionRate: totals.totalTodos > 0 ? Math.round((totals.completedTodos / totals.totalTodos) * 100) : 0,
      totalNotes: Object.values(weeklyNotes).filter((note) => note.trim().length > 0).length,
      totalLinks: Object.values(weeklyLinks).reduce((acc, linksArray) => acc + linksArray.length, 0),
      chartData
    };
  }, [data, weeklyNotes, weeklyLinks]);

  return (
    <div className="max-w-5xl mx-auto pb-12 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-100 flex items-center gap-3">
          <Activity className="text-indigo-500" size={32} />
          İstatistikler ve Performans
        </h1>
        <p className="text-slate-400 mt-2 text-sm md:text-base">
          Yol haritandaki genel gidişatı, aldığın notları ve eklediğin kaynakları buradan takip edebilirsin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-500/30 transition-all">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-indigo-500/20 p-2 rounded-lg">
              <Target size={18} className="text-indigo-400" />
            </div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Genel İlerleme</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-100">%{stats.completionRate}</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-emerald-500/20 p-2 rounded-lg">
              <CheckCircle2 size={18} className="text-emerald-400" />
            </div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Tamamlanan Görev</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-100">{stats.completedTodos}</span>
            <span className="text-sm text-slate-500 font-medium">/ {stats.totalTodos}</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-amber-500/30 transition-all">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-amber-500/20 p-2 rounded-lg">
              <StickyNote size={18} className="text-amber-400" />
            </div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Alınan Notlar</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-100">{stats.totalNotes}</span>
            <span className="text-sm text-slate-500 font-medium mb-1">hafta</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <Bookmark size={18} className="text-blue-400" />
            </div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Kaydedilen Kaynak</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-100">{stats.totalLinks}</span>
            <span className="text-sm text-slate-500 font-medium mb-1">link</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-200 mb-6 flex items-center gap-2">
          Aylara Göre Tamamlanan Görevler
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1e293b' }} />
              <Bar dataKey="Tamamlanan" radius={[6, 6, 0, 0]} maxBarSize={50} animationDuration={1500}>
                {stats.chartData.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.percentage === 100 ? '#10b981' : '#6366f1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-center gap-6 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-indigo-500"></div> Devam eden ay
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-emerald-500"></div> Tamamlanan ay
          </div>
        </div>
      </div>
    </div>
  );
}

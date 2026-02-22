'use client';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Nav } from '@/components/nav';
import { api } from '@/lib/api';

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  useEffect(() => { api.get('/analytics/overview').then((r) => setData(r.data)); }, []);

  return (
    <main className="mx-auto max-w-5xl p-8">
      <Nav />
      <h1 className="mb-6 text-3xl font-bold">Analytics</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="h-72 rounded border bg-white p-4">
          <h2 className="mb-2">Clicks by Day</h2>
          <ResponsiveContainer width="100%" height="90%"><LineChart data={data?.byDay || []}><XAxis dataKey="dateBucket" hide /><YAxis /><Tooltip /><Line dataKey="totalClicks" stroke="#4f46e5" /></LineChart></ResponsiveContainer>
        </div>
        <div className="h-72 rounded border bg-white p-4">
          <h2 className="mb-2">Conversions by Day</h2>
          <ResponsiveContainer width="100%" height="90%"><BarChart data={data?.byDay || []}><XAxis dataKey="dateBucket" hide /><YAxis /><Tooltip /><Bar dataKey="conversions" fill="#14b8a6" /></BarChart></ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

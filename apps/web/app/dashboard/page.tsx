'use client';
import { useEffect, useState } from 'react';
import { Nav } from '@/components/nav';
import { api } from '@/lib/api';

export default function DashboardPage() {
  const [overview, setOverview] = useState<any>(null);
  useEffect(() => {
    api.get('/analytics/overview').then((r) => setOverview(r.data));
  }, []);

  return (
    <main className="mx-auto max-w-5xl p-8">
      <Nav />
      <h1 className="mb-6 text-3xl font-bold">Dashboard Overview</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card title="Total DMs sent" value={overview?.totals?.dmsSent ?? 0} />
        <Card title="Total Clicks" value={overview?.totals?.clicks ?? 0} />
        <Card title="Active Triggers" value={overview?.totals?.activeTriggers ?? 0} />
      </div>
    </main>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return <div className="rounded-xl border bg-white p-4"><p className="text-sm text-slate-500">{title}</p><p className="text-2xl font-semibold">{value}</p></div>;
}

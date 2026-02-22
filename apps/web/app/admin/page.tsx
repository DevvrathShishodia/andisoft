'use client';
import { useEffect, useState } from 'react';
import { Nav } from '@/components/nav';
import { api } from '@/lib/api';

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);
  useEffect(() => { api.get('/admin/overview').then((r) => setStats(r.data)); }, []);

  return (
    <main className="mx-auto max-w-5xl p-8">
      <Nav />
      <h1 className="mb-6 text-3xl font-bold">Super Admin</h1>
      <pre className="rounded border bg-slate-900 p-4 text-green-300">{JSON.stringify(stats, null, 2)}</pre>
    </main>
  );
}

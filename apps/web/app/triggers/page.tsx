'use client';
import { useEffect, useState } from 'react';
import { Nav } from '@/components/nav';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';

export default function TriggersPage() {
  const [triggers, setTriggers] = useState<any[]>([]);

  useEffect(() => {
    api.get('/triggers').then((r) => setTriggers(r.data));
  }, []);

  async function createDemoTrigger() {
    await api.post('/triggers', {
      instagramAccountId: prompt('Instagram account ID'),
      name: 'Demo Trigger',
      keyword: 'price',
      scope: 'GLOBAL',
      template: 'Thanks for your interest! Here is the link: {{link}}',
      priority: 100,
      enabled: true,
      steps: [
        { stepOrder: 1, delayHours: 0, delayDays: 0, message: 'Immediate DM response' },
        { stepOrder: 2, delayHours: 4, delayDays: 0, message: 'Follow-up after 4 hours' },
        { stepOrder: 3, delayHours: 0, delayDays: 2, message: 'Final follow-up after 2 days' }
      ]
    });
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <Nav />
      <div className="mb-4 flex items-center justify-between"><h1 className="text-3xl font-bold">Trigger Management</h1><Button onClick={createDemoTrigger}>Create Trigger</Button></div>
      <div className="space-y-3">{triggers.map((t) => <div key={t.id} className="rounded border bg-white p-4"><p className="font-semibold">{t.name}</p><p>Keyword: {t.keyword}</p><p>Steps: {t.triggerSteps.length}</p></div>)}</div>
    </main>
  );
}

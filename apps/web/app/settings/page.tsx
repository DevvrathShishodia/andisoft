'use client';
import { useState } from 'react';
import { Nav } from '@/components/nav';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const [code, setCode] = useState('');
  const [color, setColor] = useState('#4f46e5');

  async function connectInstagram() {
    await api.post('/oauth/instagram', { code });
    alert('Instagram account connected');
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <Nav />
      <h1 className="mb-4 text-3xl font-bold">Account Settings</h1>
      <section className="space-y-3 rounded border bg-white p-4">
        <h2 className="text-lg font-semibold">Connect Instagram</h2>
        <input className="w-full rounded border p-2" placeholder="Meta OAuth code" onChange={(e) => setCode(e.target.value)} />
        <Button onClick={connectInstagram}>Connect</Button>
      </section>
      <section className="mt-6 space-y-3 rounded border bg-white p-4">
        <h2 className="text-lg font-semibold">White-label Branding</h2>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <Button onClick={() => { document.documentElement.style.setProperty('--brand-color', color); }}>Apply Theme</Button>
      </section>
    </main>
  );
}

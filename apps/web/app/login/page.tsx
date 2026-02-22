'use client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();
  const setToken = useAuthStore((s) => s.setToken);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const { data } = await api.post('/auth/login', { email, password });
    setToken(data.token);
    router.push('/dashboard');
  }

  return (
    <main className="mx-auto mt-24 max-w-md rounded-xl border bg-white p-8">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <input className="w-full rounded border p-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded border p-2" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit">Login</Button>
      </form>
    </main>
  );
}

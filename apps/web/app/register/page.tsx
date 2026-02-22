'use client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
  const router = useRouter();
  const setToken = useAuthStore((s) => s.setToken);
  const [form, setForm] = useState({ email: '', password: '', name: '' });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const { data } = await api.post('/auth/register', form);
    setToken(data.token);
    router.push('/dashboard');
  }

  return (
    <main className="mx-auto mt-24 max-w-md rounded-xl border bg-white p-8">
      <h1 className="mb-4 text-2xl font-bold">Register</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        {['name', 'email', 'password'].map((field) => (
          <input key={field} type={field === 'password' ? 'password' : 'text'} className="w-full rounded border p-2" placeholder={field} onChange={(e) => setForm((s) => ({ ...s, [field]: e.target.value }))} />
        ))}
        <Button type="submit">Create account</Button>
      </form>
    </main>
  );
}

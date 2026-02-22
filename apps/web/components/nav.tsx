'use client';
import Link from 'next/link';

export function Nav() {
  const links = ['dashboard', 'triggers', 'settings', 'analytics', 'admin'];
  return (
    <nav className="mb-6 flex gap-4 border-b pb-4">
      {links.map((link) => (
        <Link className="text-sm font-medium capitalize text-slate-600 hover:text-slate-900" key={link} href={`/${link}`}>
          {link}
        </Link>
      ))}
    </nav>
  );
}

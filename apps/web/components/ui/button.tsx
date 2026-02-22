import { ButtonHTMLAttributes } from 'react';
import { cn } from '../utils';

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={cn('rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50', props.className)} />;
}

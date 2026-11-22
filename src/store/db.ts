import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { seed, type DB } from '@/lib/seed';
import { DEMO_RESET } from '@/lib/config';

export const useDb = create<DB>()(persist(() => seed, { name: 'gz-db' }));

// Demo mode: reset data and logout once per calendar day.
// Runs at import time so it happens before any page reads the data.
if (typeof window !== 'undefined' && DEMO_RESET) {
  const today = new Date().toLocaleDateString('en-CA');
  if (localStorage.getItem('gz-day') !== today) {
    useDb.setState(seed, true);
    localStorage.removeItem('gz-auth');
    localStorage.setItem('gz-day', today);
  }
}

export const db = () => useDb.getState();
export const patch = (p: Partial<DB>) => useDb.setState(p);
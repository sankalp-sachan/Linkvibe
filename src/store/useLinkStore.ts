"use client";

import { create } from 'zustand';
import api from '@/lib/axios';

interface LinkStore {
  links: any[];
  isLoading: boolean;
  setLinks: (links: any[]) => void;
  fetchLinks: () => Promise<void>;
  addLink: (link: any) => void;
  updateLink: (id: string, updates: any) => void;
  deleteLink: (id: string) => void;
}

export const useLinkStore = create<LinkStore>((set, get) => ({
  links: [],
  isLoading: false,
  setLinks: (links) => set({ links }),
  fetchLinks: async () => {
    if (get().isLoading) return;
    
    console.log('📡 LinkStore: fetchLinks triggered');
    try {
      set({ isLoading: true });
      const { data } = await api.get('/links');
      set({ links: data });
    } catch (err) {
      console.error('Failed to fetch links:', err);
    } finally {
      set({ isLoading: false });
    }
  },
  addLink: (link) => set((state) => ({ links: [...state.links, link] })),
  updateLink: (id, updates) => 
    set((state) => ({
      links: state.links.map((l) => (l._id === id ? { ...l, ...updates } : l)),
    })),
  deleteLink: (id) => 
    set((state) => ({
      links: state.links.filter((l) => l._id !== id),
    })),
}));

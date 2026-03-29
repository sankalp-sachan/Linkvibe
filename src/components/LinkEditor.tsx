import React, { useEffect } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { PlusCircle, Link2, Sparkles, Loader2, MousePointer2 } from 'lucide-react';
import { LinkItem } from './LinkItem';
import api from '@/lib/axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useLinkStore } from '@/store/useLinkStore';

export const LinkEditor = () => {
  const { links, isLoading, fetchLinks, setLinks, addLink, deleteLink, updateLink } = useLinkStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const hasFetched = React.useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchLinks();
      hasFetched.current = true;
    }
  }, [fetchLinks]);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = links.findIndex((l) => l._id === active.id);
      const newIndex = links.findIndex((l) => l._id === over.id);

      const newLinks = arrayMove(links, oldIndex, newIndex);
      setLinks(newLinks);

      try {
        await api.put('/links/reorder', {
          linkIds: newLinks.map((l) => l._id),
        });
        toast.success('Order synchronized');
      } catch (err) {
        toast.error('Sync failed');
        fetchLinks();
      }
    }
  };

  const handleAddLink = async () => {
    try {
      const { data } = await api.post('/links', {
        title: 'New Spotlight',
        url: 'https://',
      });
      addLink(data);
      toast.success('New link added to your space');
    } catch (err: any) {
        toast.error(err.response?.data?.message || 'Failed to add link');
    }
  };

  const handleUpdateLink = async (id: string, updates: any) => {
    try {
      const { data } = await api.put(`/links/${id}`, updates);
      updateLink(id, data);
    } catch (err) {
      toast.error('Failed to update link');
    }
  };

  const handleDeleteLink = async (id: string) => {
    try {
      await api.delete(`/links/${id}`);
      deleteLink(id);
      toast.success('Link removed from space');
    } catch (err) {
      toast.error('Failed to delete link');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-brand-primary animate-spin mb-6" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Syncing with Cosmos...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-4 md:py-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
        <div className="text-center sm:text-left">
           <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
             <Link2 className="w-5 h-5 text-brand-primary" />
             <span className="text-xs font-black text-brand-primary uppercase tracking-widest">Digital Content</span>
           </div>
           <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 tracking-tight">Your Link <span className="text-gradient">Empire</span></h2>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddLink}
          className="btn-premium flex items-center gap-3 bg-brand-primary hover:bg-brand-primary/90 px-8 py-4 rounded-2xl shadow-xl shadow-brand-primary/20 text-lg"
        >
          <PlusCircle className="w-6 h-6" />
          Add Spotlight Link
        </motion.button>
      </div>

      <AnimatePresence mode="popLayout">
        {links.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 glass-card rounded-[3rem] border-dashed border-2 border-slate-200"
          >
            <div className="bg-brand-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-xl">
              <Sparkles className="w-10 h-10 text-brand-primary animate-pulse" />
            </div>
            <h3 className="text-2xl font-display font-black text-slate-900 mb-3">Your space is silent</h3>
            <p className="text-slate-400 max-w-sm mx-auto mb-10 font-medium">Capture your audience by spotlighting your most important digital destinations.</p>
            <button
              onClick={handleAddLink}
              className="group flex items-center gap-2 mx-auto text-brand-primary font-black hover:text-brand-secondary transition-all"
            >
              Start Creating
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={links.map((l) => l._id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-6">
                {links.map((link) => (
                  <LinkItem
                    key={link._id}
                    link={link}
                    onUpdate={handleUpdateLink}
                    onDelete={handleDeleteLink}
                  />
                ))}
              </div>
            </SortableContext>
            
            <div className="mt-12 flex items-center justify-center gap-3 opacity-30 grayscale pointer-events-none">
               <MousePointer2 className="w-4 h-4" />
               <span className="text-[10px] font-black uppercase tracking-widest">Drag items to prioritize engagement</span>
            </div>
          </DndContext>
        )}
      </AnimatePresence>
    </div>
  );
};

// Help helper
const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

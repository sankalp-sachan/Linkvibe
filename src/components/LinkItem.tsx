import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, ExternalLink, Calendar, Eye, EyeOff, BarChart3, ArrowUpRight } from 'lucide-react';
import { Switch } from '@/components/ui/Switch';
import { motion } from 'framer-motion';

interface LinkItemProps {
  link: any;
  onUpdate: (id: string, data: any) => void;
  onDelete: (id: string) => void;
}

export const LinkItem: React.FC<LinkItemProps> = ({ link, onUpdate, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: link._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      layout
      ref={setNodeRef}
      style={style}
      className={`glass-card rounded-[2rem] overflow-hidden premium-shadow group border-slate-200/50 hover:border-brand-primary/30 transition-all`}
    >
      <div className="flex h-full">
        {/* Reorder Handle */}
        <div
          {...attributes}
          {...listeners}
          className="bg-slate-50/50 flex items-center justify-center w-14 cursor-grab active:cursor-grabbing hover:bg-brand-primary/5 transition-colors border-r border-slate-100"
        >
          <GripVertical className="w-5 h-5 text-slate-300 group-hover:text-brand-primary transition-colors" />
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div className="flex-1 space-y-2">
              <input
                type="text"
                defaultValue={link.title}
                onBlur={(e) => onUpdate(link._id, { title: e.target.value })}
                className="w-full text-xl md:text-2xl font-display font-black bg-transparent border-none focus:ring-0 p-0 text-slate-900 placeholder-slate-300 outline-none truncate"
                placeholder="Name your spotlight"
              />
              <div className="flex items-center gap-2 group/url">
                <input
                    type="text"
                    defaultValue={link.url}
                    onBlur={(e) => onUpdate(link._id, { url: e.target.value })}
                    className="flex-1 text-sm font-bold bg-transparent border-none focus:ring-0 p-0 text-slate-400 placeholder-slate-200 outline-none truncate"
                    placeholder="https://destination.com"
                />
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-focus-within/url:text-brand-primary transition-colors" />
              </div>
            </div>
            
            <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
               <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100">
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status</span>
                   <Switch 
                       checked={link.isActive} 
                       onCheckedChange={(checked: boolean) => onUpdate(link._id, { isActive: checked })}
                   />
               </div>
               <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDelete(link._id)}
                  className="p-3 text-slate-300 hover:text-red-500 rounded-2xl hover:bg-red-50 transition-all border border-transparent hover:border-red-100 shadow-sm"
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
            </div>
          </div>

          {/* Stats & Metadata Footer */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-6 border-t border-slate-100/60">
             <button className="group flex items-center gap-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">
                <Calendar className="w-4 h-4 text-slate-300 group-hover:text-brand-primary transition-colors" />
                <span>Schedule Launch</span>
             </button>
             
             <div className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <BarChart3 className="w-4 h-4 text-slate-300" />
                <span><span className="text-slate-900 font-black">{link.clickCount || 0}</span> Global Clicks</span>
             </div>

             <div className="ml-auto">
               {link.isActive ? (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-[10px] font-black uppercase tracking-widest text-emerald-600 border border-emerald-100 shadow-sm"
                  >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Live Now</span>
                  </motion.div>
               ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-200"
                  >
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Shadow Mode</span>
                  </motion.div>
               )}
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

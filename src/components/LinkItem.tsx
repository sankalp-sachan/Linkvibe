import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, ExternalLink, Calendar, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';

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
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-4 group`}
    >
      <div className="flex">
        {/* Reorder Handle */}
        <div
          {...attributes}
          {...listeners}
          className="bg-gray-50 flex items-center justify-center w-12 cursor-grab active:cursor-grabbing hover:bg-gray-100 border-r"
        >
          <GripVertical className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
        </div>

        {/* Content */}
        <div className="flex-1 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 mr-4">
              <input
                type="text"
                defaultValue={link.title}
                onBlur={(e) => onUpdate(link._id, { title: e.target.value })}
                className="w-full text-lg font-semibold bg-transparent border-none focus:ring-0 p-0 text-gray-800 placeholder-gray-400"
                placeholder="Link Title"
              />
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <input
                    type="text"
                    defaultValue={link.url}
                    onBlur={(e) => onUpdate(link._id, { url: e.target.value })}
                    className="w-full text-sm font-normal bg-transparent border-none focus:ring-0 p-0 text-gray-500 truncate"
                    placeholder="https://example.com"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="flex flex-col items-center">
                   <Switch 
                       checked={link.isActive} 
                       onCheckedChange={(checked: boolean) => onUpdate(link._id, { isActive: checked })}
                   />
               </div>
               <button 
                  onClick={() => onDelete(link._id)}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
             <button className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-gray-600">
                <Calendar className="w-4 h-4" />
                Schedule
             </button>
             <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                <ExternalLink className="w-4 h-4" />
                {link.clickCount || 0} clicks
             </div>
             {link.isActive ? (
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-500">
                    <Eye className="w-4 h-4" />
                    Visible
                </div>
             ) : (
                <div className="flex items-center gap-2 text-xs font-medium text-amber-500">
                    <EyeOff className="w-4 h-4" />
                    Hidden
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

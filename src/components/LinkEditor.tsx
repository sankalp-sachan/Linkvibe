import React, { useState, useEffect } from 'react';
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
import { PlusCircle, Search, Trash2, GripVertical, ExternalLink } from 'lucide-react';
import { LinkItem } from './LinkItem';
import api from '@/lib/axios';
import { toast } from 'react-hot-toast';

export const LinkEditor = () => {
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/links');
      setLinks(data);
    } catch (err) {
      toast.error('Failed to load links');
    } finally {
      setLoading(false);
    }
  };

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
        toast.success('Order saved');
      } catch (err) {
        toast.error('Failed to save order');
        fetchLinks(); // Revert on failure
      }
    }
  };

  const addLink = async () => {
    try {
      const { data } = await api.post('/links', {
        title: 'New Link',
        url: 'https://',
      });
      setLinks([...links, data]);
      toast.success('Link added');
    } catch (err: any) {
        toast.error(err.response?.data?.message || 'Failed to add link');
    }
  };

  const updateLink = async (id: string, updates: any) => {
    try {
      const { data } = await api.put(`/links/${id}`, updates);
      setLinks(links.map((l) => (l._id === id ? data : l)));
      toast.success('Link updated');
    } catch (err) {
      toast.error('Failed to update link');
    }
  };

  const deleteLink = async (id: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return;
    try {
      await api.delete(`/links/${id}`);
      setLinks(links.filter((l) => l._id !== id));
      toast.success('Link deleted');
    } catch (err) {
      toast.error('Failed to delete link');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4" />
        <p className="text-gray-500 font-medium">Loading your links...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Your Links</h2>
        <button
          onClick={addLink}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-md active:scale-95"
        >
          <PlusCircle className="w-5 h-5" />
          Add Link
        </button>
      </div>

      {links.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <PlusCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No links found</h3>
          <p className="text-gray-500 mb-6 font-medium">Add your first link to get started with your profile!</p>
          <button
            onClick={addLink}
            className="text-indigo-600 font-bold hover:underline"
          >
            Create my first link
          </button>
        </div>
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
            <div className="space-y-4">
              {links.map((link) => (
                <LinkItem
                  key={link._id}
                  link={link}
                  onUpdate={updateLink}
                  onDelete={deleteLink}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

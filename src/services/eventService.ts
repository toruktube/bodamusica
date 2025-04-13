import { supabase } from '@/lib/supabase';
import { Event, EventFormData } from '@/types/event';
import { v4 as uuidv4 } from 'uuid';

/**
 * Crea un nuevo evento en la base de datos
 */
export async function createEvent(eventData: EventFormData): Promise<Event> {
  // Crear un nuevo objeto con un ID generado
  const newEvent = {
    id: uuidv4(),
    ...eventData,
    created_at: new Date().toISOString(),
  };

  const { data, error } = await supabase.from('events').insert([newEvent]).select().single();

  if (error) {
    console.error('Error creating event:', error);
    throw error;
  }

  return data as Event;
}

/**
 * Obtiene todos los eventos de la base de datos
 */
export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    throw error;
  }

  return data as Event[];
}

/**
 * Elimina un evento de la base de datos
 */
export async function deleteEvent(eventId: string): Promise<void> {
  const { error } = await supabase.from('events').delete().eq('id', eventId);

  if (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
}

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
    title: eventData.title,
    type: eventData.type,
    date: eventData.date,
    hour: eventData.hour, // HH:mm
    location: eventData.location,
    place: eventData.place,
    description: eventData.description,
    created_at: new Date().toISOString(),
    moments: [],
  };

  const { data, error } = await supabase.from('events').insert([newEvent]).select().single();

  if (error) {
    console.error('Supabase error:', error);
    throw new Error('Error creando evento: ' + JSON.stringify(error));
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

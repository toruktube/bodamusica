import { supabase } from './supabase';
import { Event, EventFormData, CeremonyType, EventType } from '@/types/event';
import { v4 as uuidv4 } from 'uuid';

const TABLE_NAME = 'events';

export async function getEvents(): Promise<Event[]> {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching events:', error);
      return [];
    }

    return data.map(item => ({
      ...item,
      date: new Date(item.date),
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }));
  } catch (error) {
    console.error('Error in getEvents:', error);
    return [];
  }
}

export async function getEvent(id: string): Promise<Event | null> {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching event:', error);
      return null;
    }

    return {
      ...data,
      date: new Date(data.date),
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  } catch (error) {
    console.error('Error in getEvent:', error);
    return null;
  }
}

export async function createEvent(formData: EventFormData): Promise<Event | null> {
  try {
    // Combinar fecha y hora
    const dateTime = new Date(`${formData.date}T${formData.time}`);
    
    // Crear un nuevo evento
    const newEvent: Event = {
      id: uuidv4(),
      name: formData.name,
      type: formData.type as EventType,
      ceremonyType: formData.ceremonyType as CeremonyType,
      date: dateTime,
      location: formData.location,
      description: formData.description,
      moments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([
        {
          ...newEvent,
          date: newEvent.date.toISOString(),
          createdAt: newEvent.createdAt.toISOString(),
          updatedAt: newEvent.updatedAt.toISOString(),
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating event:', error);
      return null;
    }

    return {
      ...data,
      date: new Date(data.date),
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  } catch (error) {
    console.error('Error in createEvent:', error);
    return null;
  }
}

export async function updateEvent(event: Event): Promise<Event | null> {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update({
        ...event,
        date: event.date.toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .eq('id', event.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating event:', error);
      return null;
    }

    return {
      ...data,
      date: new Date(data.date),
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  } catch (error) {
    console.error('Error in updateEvent:', error);
    return null;
  }
}

export async function deleteEvent(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting event:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteEvent:', error);
    return false;
  }
} 
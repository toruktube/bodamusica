import { supabase, checkSupabaseConnection } from './supabase';
import { Event, EventFormData, CeremonyType, EventType } from '@/types/event';
import { v4 as uuidv4 } from 'uuid';

const TABLE_NAME = 'events';

// Verificar la conexión al inicializar el servicio
let connectionChecked = false;
const ensureConnection = async () => {
  if (!connectionChecked) {
    const isConnected = await checkSupabaseConnection();
    if (!isConnected) {
      console.warn('Using mock data as Supabase connection failed');
    }
    connectionChecked = true;
    return isConnected;
  }
  return true;
};

// Datos de ejemplo para cuando no hay conexión
const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    name: 'Boda de ejemplo',
    type: EventType.WEDDING,
    ceremonyType: CeremonyType.RELIGIOUS,
    date: new Date(),
    location: 'Calle Ejemplo, 123',
    description: 'Evento de prueba',
    moments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function getEvents(): Promise<Event[]> {
  try {
    const isConnected = await ensureConnection();
    if (!isConnected) return MOCK_EVENTS;

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching events:', error);
      return MOCK_EVENTS;
    }

    return data.map(item => ({
      ...item,
      date: new Date(item.date),
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }));
  } catch (error) {
    console.error('Error in getEvents:', error);
    return MOCK_EVENTS;
  }
}

export async function getEvent(id: string): Promise<Event | null> {
  try {
    const isConnected = await ensureConnection();
    if (!isConnected) return MOCK_EVENTS[0];

    const { data, error } = await supabase.from(TABLE_NAME).select('*').eq('id', id).single();

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
    // Verificar conexión antes de intentar crear
    const isConnected = await ensureConnection();

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

    // Si no hay conexión, devolver el evento para desarrollo local
    if (!isConnected) {
      console.log('Using mock data - event created locally only');
      return newEvent;
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([
        {
          ...newEvent,
          date: newEvent.date.toISOString(),
          createdAt: newEvent.createdAt.toISOString(),
          updatedAt: newEvent.updatedAt.toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating event:', error);
      // En caso de error, devolver el evento para desarrollo
      return newEvent;
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
    const isConnected = await ensureConnection();
    if (!isConnected) return event;

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
      return event;
    }

    return {
      ...data,
      date: new Date(data.date),
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  } catch (error) {
    console.error('Error in updateEvent:', error);
    return event;
  }
}

export async function deleteEvent(id: string): Promise<boolean> {
  try {
    const isConnected = await ensureConnection();
    if (!isConnected) return true;

    const { error } = await supabase.from(TABLE_NAME).delete().eq('id', id);

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

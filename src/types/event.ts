export enum EventType {
  CONCIERTO = 'concierto',
  CLASE = 'clase',
  ENSAYO = 'ensayo',
  OTRO = 'otro',
}

export interface EventMoment {
  id: string;
  name: string;
  description?: string;
  duration?: number; // duración en minutos
  songs?: Song[];
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  duration?: number; // duración en segundos
  url?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: EventType;
  created_at?: string;
  moments: EventMoment[];
  updatedAt: Date;
}

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  location: string;
  type: EventType;
}

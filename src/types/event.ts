export enum EventType {
  BODA_CIVIL = 'boda_civil',
  BODA_RELIGIOSA = 'boda_religiosa',
  COMUNION = 'comunion',
  COCTEL = 'coctel',
  FUNERAL = 'funeral',
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
  hour: string;
  minute: string;
  location: string;
  type: EventType;
  created_at?: string;
  moments: EventMoment[];
  updatedAt: Date;
}

export interface EventFormData {
  title: string;
  type: EventType;
  date: string;
  hour: string;
  minute: string;
  location: string;
  description: string;
}

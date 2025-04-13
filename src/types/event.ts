export enum EventType {
  WEDDING = 'wedding',
  COMMUNION = 'communion',
  PARTY = 'party',
  OTHER = 'other',
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
  name: string;
  type: EventType;
  date: Date;
  location?: string;
  description?: string;
  moments: EventMoment[];
  createdAt: Date;
  updatedAt: Date;
} 
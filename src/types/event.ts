export enum EventType {
  WEDDING = 'wedding',
  COMMUNION = 'communion',
  PARTY = 'party',
  OTHER = 'other',
}

export enum CeremonyType {
  RELIGIOUS = 'religious_ceremony',
  CIVIL = 'civil_ceremony',
  BAPTISM = 'baptism',
  COCKTAIL = 'cocktail',
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
  name: string;
  type: EventType;
  ceremonyType: CeremonyType;
  date: Date;
  location: string; // dirección de Google Maps
  description?: string;
  moments: EventMoment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EventFormData {
  name: string;
  type: EventType;
  ceremonyType: CeremonyType;
  date: string; // formato: YYYY-MM-DD
  time: string; // formato: HH:MM
  location: string;
  description: string;
} 
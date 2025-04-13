-- Crear extensiones si no existen
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear tabla de eventos
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  ceremony_type TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  moments JSONB DEFAULT '[]'::JSONB,
  created_by_user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Asegúrate de que created_by_user_id no es obligatorio para permitir uso sin autenticación
ALTER TABLE events ALTER COLUMN created_by_user_id DROP NOT NULL;

-- Crear políticas RLS (Row Level Security)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Política para lectura pública (permitir a todos leer los eventos)
CREATE POLICY "Permitir lectura pública de eventos" 
  ON events FOR SELECT 
  USING (true);

-- Política para inserción (permitir a todos crear eventos por ahora)
CREATE POLICY "Permitir inserción de eventos a todos" 
  ON events FOR INSERT 
  WITH CHECK (true);

-- Política para actualización (permitir a todos actualizar eventos por ahora)
CREATE POLICY "Permitir actualización de eventos a todos" 
  ON events FOR UPDATE 
  USING (true);

-- Política para eliminación (permitir a todos eliminar eventos por ahora)
CREATE POLICY "Permitir eliminación de eventos a todos" 
  ON events FOR DELETE 
  USING (true);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS events_date_idx ON events(date);
CREATE INDEX IF NOT EXISTS events_type_idx ON events(type);
CREATE INDEX IF NOT EXISTS events_ceremony_type_idx ON events(ceremony_type);

-- Comentario: Estas políticas son temporales para desarrollo
-- En producción, se deberían ajustar para restringir el acceso según necesidades
-- de seguridad específicas del proyecto. 
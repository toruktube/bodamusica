-- Crear tabla de eventos
CREATE TABLE events (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  ceremony_type TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  moments JSONB DEFAULT '[]'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear políticas RLS (Row Level Security)
-- Permite que cualquier usuario autenticado pueda leer los eventos
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir lectura de eventos a usuarios autenticados" 
  ON events FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Permitir actualización solo si el usuario es el propietario o administrador
CREATE POLICY "Permitir actualización de eventos solo a propietarios" 
  ON events FOR UPDATE 
  USING (auth.uid() = created_by_user_id OR auth.role() = 'service_role');

-- Permitir inserción solo a usuarios autenticados
CREATE POLICY "Permitir inserción de eventos a usuarios autenticados" 
  ON events FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Permitir eliminación solo si el usuario es el propietario o administrador
CREATE POLICY "Permitir eliminación de eventos solo a propietarios" 
  ON events FOR DELETE 
  USING (auth.uid() = created_by_user_id OR auth.role() = 'service_role');

-- Crear índices para mejorar el rendimiento
CREATE INDEX events_date_idx ON events(date);
CREATE INDEX events_type_idx ON events(type);
CREATE INDEX events_ceremony_type_idx ON events(ceremony_type); 
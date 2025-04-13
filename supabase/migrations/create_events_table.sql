-- Crear la tabla de eventos
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by_user_id UUID REFERENCES auth.users(id),
  moments JSONB DEFAULT '[]'::JSONB
);

-- Configurar RLS (Row Level Security)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Crear políticas para acceso a la tabla
CREATE POLICY "Permitir lectura de eventos a usuarios autenticados"
  ON events FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Permitir actualización de eventos solo a propietarios"
  ON events FOR UPDATE 
  USING (auth.uid() = created_by_user_id OR auth.role() = 'service_role');

CREATE POLICY "Permitir inserción de eventos a usuarios autenticados"
  ON events FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Permitir eliminación de eventos solo a propietarios"
  ON events FOR DELETE 
  USING (auth.uid() = created_by_user_id OR auth.role() = 'service_role');

-- Índice para búsquedas por fecha
CREATE INDEX IF NOT EXISTS events_date_idx ON events (date);
CREATE INDEX events_type_idx ON events(type);
CREATE INDEX events_created_by_user_id_idx ON events(created_by_user_id); 
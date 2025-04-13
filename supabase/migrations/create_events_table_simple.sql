-- Crear la tabla de eventos
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  moments JSONB DEFAULT '[]'::JSONB
);

-- Configurar RLS (Row Level Security)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Crear políticas para permitir acceso anónimo (para desarrollo)
-- ¡ADVERTENCIA! Estas políticas son solo para desarrollo y permiten acceso completo
CREATE POLICY "Allow anonymous select" 
  ON events FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert" 
  ON events FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous update" 
  ON events FOR UPDATE USING (true);

CREATE POLICY "Allow anonymous delete" 
  ON events FOR DELETE USING (true);

-- Índice para búsquedas por fecha
CREATE INDEX IF NOT EXISTS events_date_idx ON events (date); 
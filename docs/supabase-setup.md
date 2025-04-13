# Configuración de Supabase para BodaMúsica

Para que la aplicación funcione correctamente, necesitas crear las tablas necesarias en tu proyecto de Supabase.

## Paso 1: Acceder al Editor SQL de Supabase

1. Inicia sesión en [Supabase](https://app.supabase.com/)
2. Selecciona tu proyecto
3. Ve a la sección "SQL Editor" en el menú lateral izquierdo

## Paso 2: Crear la tabla de eventos

Copia y pega el siguiente código SQL en el editor:

```sql
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
```

Haz clic en "Run" para ejecutar el script.

## Paso 3: Verificar la tabla creada

1. Ve a la sección "Table Editor" en el menú lateral izquierdo
2. Deberías ver la tabla "events" en la lista de tablas
3. Puedes hacer clic en ella para ver su estructura y contenido

## Paso 4: Configurar las variables de entorno

Asegúrate de que las variables de entorno estén correctamente configuradas en tu archivo `.env`:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon
```

Puedes encontrar estos valores en:
1. Ve a la sección "Project Settings" en el menú lateral
2. Selecciona "API"
3. Copia los valores de "Project URL" y "anon public" en tus variables de entorno

## Resolución de problemas

Si obtienes errores como:
- "Error fetching events: {}"
- "Error creating event: {}"

Comprueba:
1. Si las variables de entorno están correctamente configuradas
2. Si la tabla "events" existe en tu base de datos
3. Si las políticas de Row Level Security están correctamente configuradas

Para más información, consulta la [documentación oficial de Supabase](https://supabase.com/docs). 
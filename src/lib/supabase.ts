import { createClient } from '@supabase/supabase-js';

// Valores de respaldo para desarrollo local
const fallbackUrl = 'https://qiksseajszjhqpxkwfql.supabase.co';
const fallbackKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpa3NzZWFqc3pqaHFweGt3ZnFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NzM0NzMsImV4cCI6MjA2MDE0OTQ3M30.1jN7I45OmBZnkQLMkYPp6yJyim4cpab6r2v_MLlq_fE';

// Usar valores de respaldo si las variables de entorno no están disponibles
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || fallbackUrl;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || fallbackKey;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials are missing. Using fallback values for development.');
}

// Crear cliente con manejo de errores
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función de ayuda para verificar la conexión
export const checkSupabaseConnection = async () => {
  try {
    const { error } = await supabase.from('events').select('count').limit(1);
    if (error) {
      console.error('Error connecting to Supabase:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to connect to Supabase:', err);
    return false;
  }
};

import { createClient } from '@supabase/supabase-js';

// Valores de respaldo para desarrollo local
const fallbackUrl = 'https://qiksseajszjhqpxkwfql.supabase.co';
const fallbackKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpa3NzZWFqc3pqaHFweGt3ZnFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NzM0NzMsImV4cCI6MjA2MDE0OTQ3M30.1jN7I45OmBZnkQLMkYPp6yJyim4cpab6r2v_MLlq_fE';

// Usar valores de respaldo si las variables de entorno no están disponibles
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || fallbackUrl;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || fallbackKey;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials are missing. Make sure to set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env file.'
  );
} else {
  console.log('Supabase configured with URL:', supabaseUrl);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Verifica la conexión con Supabase intentando realizar una consulta simple
 * @returns Promise<boolean> - true si la conexión es exitosa, false en caso contrario
 */
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    // Intentar una operación simple para verificar la conexión
    const { error } = await supabase.from('events').select('count', { count: 'exact', head: true });

    if (error) {
      console.error('Error al verificar la conexión con Supabase:', error);
      return false;
    }

    console.log('Conexión con Supabase exitosa');
    return true;
  } catch (error) {
    console.error('Error inesperado al verificar la conexión con Supabase:', error);
    return false;
  }
}

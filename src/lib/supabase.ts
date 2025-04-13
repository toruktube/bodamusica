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

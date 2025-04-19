import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

const supabaseAdminKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const admin = createClient(supabaseUrl, supabaseAdminKey);

export async function POST(req: NextRequest) {
  const token = req.cookies.get('sb-access-token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'No token' }, { status: 401 });
  }

  let payload: any;
  try {
    payload = jwt.decode(token);
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const userId = payload.sub;
  const email = payload.email;
  const full_name = payload.user_metadata?.full_name || payload.name || '';
  const avatar_url = payload.user_metadata?.avatar_url || payload.picture || '';

  // Buscar perfil
  const { data: profile, error } = await admin
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    // Error distinto a "no existe"
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!profile) {
    // Crear perfil
    const { data, error: insertError } = await admin
      .from('profiles')
      .insert({
        id: userId,
        email,
        full_name,
        avatar_url,
        role: 'user', // Por defecto, puedes cambiar esto si quieres
      })
      .select()
      .single();
    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
    return NextResponse.json({ profile: data });
  } else {
    // Actualizar si ha cambiado
    const needsUpdate =
      profile.email !== email ||
      profile.full_name !== full_name ||
      profile.avatar_url !== avatar_url;
    if (needsUpdate) {
      const { data, error: updateError } = await admin
        .from('profiles')
        .update({ email, full_name, avatar_url })
        .eq('id', userId)
        .select()
        .single();
      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }
      return NextResponse.json({ profile: data });
    }
    return NextResponse.json({ profile });
  }
}

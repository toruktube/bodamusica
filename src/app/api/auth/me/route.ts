import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

const supabaseAdminKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const admin = createClient(supabaseUrl, supabaseAdminKey);

export async function GET(req: NextRequest) {
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

  // Buscar perfil
  const { data: profile, error } = await admin
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !profile) {
    return NextResponse.json({ error: 'Perfil no encontrado' }, { status: 404 });
  }

  return NextResponse.json({ profile });
}

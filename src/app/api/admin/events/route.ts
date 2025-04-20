import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

const supabaseAdminKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const admin = createClient(supabaseUrl, supabaseAdminKey);

async function isAdmin(req: NextRequest) {
  const token = req.cookies.get('sb-access-token')?.value;
  if (!token) return false;
  let payload: any;
  try {
    payload = jwt.decode(token);
  } catch {
    return false;
  }
  const userId = payload.sub;
  const { data: profile } = await admin.from('profiles').select('role').eq('id', userId).single();
  return profile?.role === 'admin';
}

export async function GET(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
  const { data: events, error } = await admin.from('events').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ events });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get('eventId');
  if (!eventId) return NextResponse.json({ error: 'Missing eventId' }, { status: 400 });
  const { error } = await admin.from('events').delete().eq('id', eventId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

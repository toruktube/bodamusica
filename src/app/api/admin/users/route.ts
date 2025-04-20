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
  const { data: users, error } = await admin.from('profiles').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ users });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
  const { userId, role } = await req.json();
  const { data, error } = await admin
    .from('profiles')
    .update({ role })
    .eq('id', userId)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ user: data });
}

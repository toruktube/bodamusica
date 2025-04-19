'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (data.session) {
      // Guardar JWT en cookie httpOnly vía API Route
      await fetch('/api/auth/set-cookie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: data.session.access_token }),
      });
      // Sincronizar perfil
      await fetch('/api/auth/sync-profile', { method: 'POST' });
      router.push('/events');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    // Si el registro es exitoso, iniciar sesión automáticamente
    if (data.session) {
      await fetch('/api/auth/set-cookie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: data.session.access_token }),
      });
      await fetch('/api/auth/sync-profile', { method: 'POST' });
      router.push('/events');
    } else {
      setError('Revisa tu correo para confirmar el registro.');
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
    }
    setLoading(false);
    // Redirección automática por Supabase
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-primary">
          {isRegister ? 'Registrarse' : 'Iniciar sesión'}
        </h1>
        <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-accent-2 bg-white dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-accent-2 bg-white dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none"
          >
            {loading
              ? isRegister
                ? 'Registrando...'
                : 'Entrando...'
              : isRegister
                ? 'Registrarse'
                : 'Entrar'}
          </button>
        </form>
        <div className="mt-4 flex flex-col items-center">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-2 px-4 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-2"
          >
            <img src="/google.svg" alt="Google" className="h-5 w-5" />
            Entrar con Google
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRegister(r => !r);
              setError(null);
            }}
            className="mt-4 text-primary underline text-sm"
          >
            {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>
      </div>
    </div>
  );
}

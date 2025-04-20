'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Event } from '@/types/event';

interface Profile {
  id: string;
  email: string;
  role: string;
  full_name: string;
  avatar_url: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [users, setUsers] = useState<Profile[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Proteger la página solo para admin
  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (!data.profile || data.profile.role !== 'admin') {
          router.replace('/events');
        } else {
          setProfile(data.profile);
        }
      })
      .catch(() => router.replace('/events'));
  }, [router]);

  // Cargar usuarios y eventos
  useEffect(() => {
    if (!profile) return;
    setLoading(true);
    Promise.all([
      fetch('/api/admin/users').then(res => res.json()),
      fetch('/api/admin/events').then(res => res.json()),
    ])
      .then(([usersRes, eventsRes]) => {
        setUsers(usersRes.users || []);
        setEvents(eventsRes.events || []);
        setError(null);
      })
      .catch(err => {
        setError('Error cargando datos de administración');
      })
      .finally(() => setLoading(false));
  }, [profile]);

  // Cambiar rol de usuario
  const handleRoleChange = async (userId: string, newRole: string) => {
    await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, role: newRole }),
    });
    setUsers(users => users.map(u => (u.id === userId ? { ...u, role: newRole } : u)));
  };

  // Eliminar evento
  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('¿Seguro que quieres eliminar este evento?')) return;
    await fetch(`/api/admin/events?eventId=${eventId}`, { method: 'DELETE' });
    setEvents(events => events.filter(e => e.id !== eventId));
  };

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Panel de administración</h1>
      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gestión de usuarios */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-accent-2">
            <h2 className="text-xl font-semibold text-primary mb-4">Usuarios</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-accent-2">
                  <th className="py-2 text-left">Email</th>
                  <th className="py-2 text-left">Nombre</th>
                  <th className="py-2 text-left">Rol</th>
                  <th className="py-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b border-accent-2">
                    <td className="py-2">{user.email}</td>
                    <td className="py-2">{user.full_name}</td>
                    <td className="py-2">
                      <select
                        value={user.role}
                        onChange={e => handleRoleChange(user.id, e.target.value)}
                        className="rounded border border-accent-2 bg-white dark:bg-gray-700 px-2 py-1"
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td className="py-2">{/* Aquí podrías añadir más acciones */}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Gestión de eventos */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-accent-2">
            <h2 className="text-xl font-semibold text-primary mb-4">Eventos</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-accent-2">
                  <th className="py-2 text-left">Título</th>
                  <th className="py-2 text-left">Fecha</th>
                  <th className="py-2 text-left">Lugar</th>
                  <th className="py-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event.id} className="border-b border-accent-2">
                    <td className="py-2">{event.title}</td>
                    <td className="py-2">{event.date}</td>
                    <td className="py-2">{event.location}</td>
                    <td className="py-2">
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-red-500 hover:text-red-700 px-2 py-1 rounded"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      )}
    </main>
  );
}

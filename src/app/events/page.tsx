'use client';

import { useState, useEffect } from 'react';
import { EventFormData, Event, EventType } from '@/types/event';
import EventForm from '@/components/events/EventForm';
import { getEvents, createEvent, deleteEvent } from '@/services/eventService';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { RiTeamLine, RiCrossLine } from 'react-icons/ri';

export default function EventsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Verificar la conexión con Supabase
  useEffect(() => {
    async function checkSupabaseConnection() {
      try {
        console.log('Verificando conexión con Supabase...');
        const { data, error } = await supabase.from('events').select('count');

        if (error) {
          console.error('Error al conectar con Supabase:', error);
          // Verificar si la tabla existe
          if (error.code === '42P01') {
            console.error('La tabla "events" no existe en la base de datos');
            setError(
              'La tabla "events" no existe en la base de datos. Por favor, crea la tabla primero.'
            );
          } else {
            setError(`Error de conexión con Supabase: ${error.message}`);
          }
        } else {
          console.log('Conexión exitosa con Supabase. Tabla events accesible.', data);
        }
      } catch (err) {
        console.error('Error al verificar conexión:', err);
      }
    }

    checkSupabaseConnection();
  }, []);

  // Sincronizar perfil tras login (por si viene de OAuth o el login no lo hizo)
  useEffect(() => {
    async function syncProfile() {
      try {
        await fetch('/api/auth/sync-profile', { method: 'POST' });
      } catch (err) {
        console.error('Error sincronizando perfil:', err);
      }
    }
    syncProfile();
  }, []);

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);
        setError(null);
      } catch (err: any) {
        console.error('Error loading events:', err);
        setError(`Error al cargar los eventos: ${err?.message || 'Error desconocido'}`);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  const handleCreateEvent = async (data: EventFormData) => {
    try {
      setLoading(true);
      const newEvent = await createEvent(data);

      if (newEvent) {
        setEvents(prev => [newEvent, ...prev]);
        setIsFormOpen(false);
        toast.success('Evento creado correctamente');
        setError(null);
      } else {
        setError('Error al crear el evento. Por favor, inténtalo de nuevo.');
      }
    } catch (err: any) {
      console.error('Error creating event:', err);
      setError(`Error al crear el evento: ${err?.message || 'Error desconocido'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      try {
        setLoading(true);
        await deleteEvent(eventId);
        setEvents(events.filter(event => event.id !== eventId));
        toast.success('Evento eliminado correctamente');
      } catch (err: any) {
        console.error('Error deleting event:', err);
        setError(`Error al eliminar el evento: ${err?.message || 'Error desconocido'}`);
      } finally {
        setLoading(false);
      }
    }
  };

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      return 'Fecha no válida';
    }
  };

  // Función para cerrar sesión
  const handleLogout = async () => {
    // Elimina la cookie llamando a un endpoint
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  // Función para obtener el icono según el tipo de evento
  const getEventIcon = (type: EventType) => {
    if (type === 'funeral') {
      return <RiCrossLine className="text-primary text-2xl mr-2" title="Funeral" />;
    }
    return <RiTeamLine className="text-primary text-2xl mr-2" title="Evento" />;
  };

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Eventos</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          disabled={loading}
        >
          Crear evento
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-accent-1 dark:bg-accent-1 shadow overflow-hidden rounded-lg border border-accent-2">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-primary-dark">Mis eventos musicales</h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            Gestiona tus eventos y la música para cada momento
          </p>
        </div>

        <div className="border-t border-accent-2 px-4 py-5 sm:p-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : events.length > 0 ? (
            <div className="space-y-4">
              {events.map(event => (
                <div
                  key={event.id}
                  className="bg-white dark:bg-gray-700 p-4 rounded-md shadow border border-accent-2 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {getEventIcon(event.type)}
                      <h3 className="text-lg font-semibold text-primary-dark">{event.title}</h3>
                    </div>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Eliminar evento"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                      <span className="font-medium">Fecha y hora: </span>
                      {formatDate(event.date)}
                      {event.hour ? `, ${event.hour}` : ''}
                    </div>
                    <div>
                      <span className="font-medium">Lugar: </span>
                      {event.place ? event.place : event.location}
                      {event.place && (
                        <span className="block text-xs text-gray-500 dark:text-gray-400">
                          {event.location}
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="font-medium">Tipo: </span>
                      {(() => {
                        switch (event.type) {
                          case 'boda_civil':
                            return 'Boda Civil';
                          case 'boda_religiosa':
                            return 'Boda Religiosa';
                          case 'comunion':
                            return 'Comunión';
                          case 'coctel':
                            return 'Cóctel';
                          case 'funeral':
                            return 'Funeral';
                          default:
                            return 'Desconocido';
                        }
                      })()}
                    </div>
                    {event.description && (
                      <div className="md:col-span-2 mt-2">
                        <span className="font-medium">Descripción: </span>
                        {event.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No hay eventos creados todavía.
              </p>
              <button
                type="button"
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                disabled={loading}
              >
                Crear nuevo evento
              </button>
            </div>
          )}
        </div>
      </div>

      {isFormOpen && (
        <EventForm onClose={() => setIsFormOpen(false)} onSubmit={handleCreateEvent} />
      )}
    </main>
  );
}

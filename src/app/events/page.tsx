'use client';

import { useState, useEffect } from 'react';
import { CeremonyType, EventFormData, Event } from '@/types/event';
import EventForm from '@/components/events/EventForm';
import { getEvents, createEvent } from '@/lib/events-service';

export default function EventsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);
        setError(null);
      } catch (err) {
        console.error('Error loading events:', err);
        setError('Error al cargar los eventos. Por favor, inténtalo de nuevo.');
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
        setError(null);
      } else {
        setError('Error al crear el evento. Por favor, inténtalo de nuevo.');
      }
    } catch (err) {
      console.error('Error creating event:', err);
      setError('Error al crear el evento. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
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
                  <h3 className="text-lg font-medium text-primary-dark">{event.name}</h3>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                      <span className="font-medium">Fecha: </span>
                      {event.date.toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                    <div>
                      <span className="font-medium">Lugar: </span>
                      {event.location}
                    </div>
                    <div>
                      <span className="font-medium">Tipo: </span>
                      {event.ceremonyType === CeremonyType.RELIGIOUS && 'Ceremonia Religiosa'}
                      {event.ceremonyType === CeremonyType.CIVIL && 'Ceremonia Civil'}
                      {event.ceremonyType === CeremonyType.BAPTISM && 'Bautizo'}
                      {event.ceremonyType === CeremonyType.COCKTAIL && 'Cóctel'}
                      {event.ceremonyType === CeremonyType.FUNERAL && 'Funeral'}
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

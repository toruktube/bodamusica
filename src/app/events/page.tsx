'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EventType, CeremonyType, EventFormData, Event } from '@/types/event';
import EventForm from '@/components/events/EventForm';

export default function EventsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  const handleCreateEvent = (data: EventFormData) => {
    // Combinar fecha y hora
    const dateTime = new Date(`${data.date}T${data.time}`);
    
    // Crear un nuevo evento
    const newEvent: Event = {
      id: uuidv4(),
      name: data.name,
      type: data.type,
      ceremonyType: data.ceremonyType,
      date: dateTime,
      location: data.location,
      description: data.description,
      moments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    // Añadir el evento a la lista
    setEvents(prev => [...prev, newEvent]);
    
    // Cerrar el formulario
    setIsFormOpen(false);
  };

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Eventos</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Crear evento
        </button>
      </div>
      
      <div className="bg-accent-1 dark:bg-accent-1 shadow overflow-hidden rounded-lg border border-accent-2">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-primary-dark">
            Mis eventos musicales
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            Gestiona tus eventos y la música para cada momento
          </p>
        </div>
        
        <div className="border-t border-accent-2 px-4 py-5 sm:p-6">
          {events.length > 0 ? (
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
                        minute: '2-digit' 
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
              >
                Crear nuevo evento
              </button>
            </div>
          )}
        </div>
      </div>

      {isFormOpen && (
        <EventForm 
          onClose={() => setIsFormOpen(false)} 
          onSubmit={handleCreateEvent} 
        />
      )}
    </main>
  );
} 
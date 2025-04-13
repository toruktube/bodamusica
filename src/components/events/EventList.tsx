'use client';

import { useState } from 'react';
import { Event, EventType } from '@/types/event';
import EventForm from './EventForm';
import { createEvent, deleteEvent } from '@/services/eventService';
import { toast } from 'react-hot-toast';

interface EventListProps {
  events: Event[];
  onEventsUpdated: () => void;
}

// Función para traducir el tipo de evento a español
const getEventTypeText = (type: EventType): string => {
  const typeMap: Record<EventType, string> = {
    [EventType.CONCIERTO]: 'Concierto',
    [EventType.CLASE]: 'Clase',
    [EventType.ENSAYO]: 'Ensayo',
    [EventType.OTRO]: 'Otro',
  };
  return typeMap[type] || 'Desconocido';
};

export default function EventList({ events, onEventsUpdated }: EventListProps) {
  const [showForm, setShowForm] = useState(false);

  const handleCreateEvent = async (formData: any) => {
    try {
      await createEvent(formData);
      setShowForm(false);
      toast.success('Evento creado correctamente');
      onEventsUpdated();
    } catch (error) {
      toast.error('Error al crear el evento');
      console.error('Error creating event:', error);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      try {
        await deleteEvent(eventId);
        toast.success('Evento eliminado correctamente');
        onEventsUpdated();
      } catch (error) {
        toast.error('Error al eliminar el evento');
        console.error('Error deleting event:', error);
      }
    }
  };

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch (error) {
      return 'Fecha no válida';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">Eventos Musicales</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-200"
        >
          Nuevo Evento
        </button>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-8 bg-accent-1 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">
            No hay eventos musicales programados. ¡Crea uno nuevo!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden border border-accent-2"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-primary mb-2 flex-grow">
                    {event.title}
                  </h3>
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
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {getEventTypeText(event.type)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {formatDate(event.date)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <span className="font-medium">Lugar:</span> {event.location}
                </div>
                {event.description && (
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-2 border-t pt-2 border-accent-2">
                    <p>{event.description}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && <EventForm onClose={() => setShowForm(false)} onSubmit={handleCreateEvent} />}
    </div>
  );
}

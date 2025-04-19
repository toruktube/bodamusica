'use client';

import { useState, useEffect } from 'react';
import { EventType, EventFormData } from '@/types/event';
import { Loader } from '@googlemaps/js-api-loader';

interface EventFormProps {
  onClose: () => void;
  onSubmit: (data: EventFormData) => void;
}

export default function EventForm({ onClose, onSubmit }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    type: EventType.BODA_CIVIL,
    date: '',
    hour: '12',
    minute: '00',
    location: '',
    description: '',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      const mapInstance = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 40.4168, lng: -3.7038 }, // Madrid por defecto
        zoom: 12,
      });

      const autocompleteInstance = new google.maps.places.Autocomplete(
        document.getElementById('location') as HTMLInputElement,
        {
          types: ['establishment', 'geocode'],
          componentRestrictions: { country: 'es' },
        }
      );

      autocompleteInstance.addListener('place_changed', () => {
        const place = autocompleteInstance.getPlace();
        if (place.formatted_address) {
          setFormData(prev => ({
            ...prev,
            location: place.formatted_address || '',
          }));
        }
      });

      setMap(mapInstance);
      setAutocomplete(autocompleteInstance);
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b border-accent-2">
          <h2 className="text-xl font-semibold text-primary">Crear nuevo evento</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Título del evento */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Título del evento
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-accent-2 bg-white dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
              />
            </div>

            {/* Tipo de evento */}
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Tipo de evento
              </label>
              <select
                id="type"
                name="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-accent-2 bg-white dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
              >
                <option value={EventType.BODA_CIVIL}>Boda Civil</option>
                <option value={EventType.BODA_RELIGIOSA}>Boda Religiosa</option>
                <option value={EventType.COMUNION}>Comunión</option>
                <option value={EventType.COCTEL}>Cóctel</option>
                <option value={EventType.FUNERAL}>Funeral</option>
              </select>
            </div>

            {/* Fecha y hora */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Fecha
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-accent-2 bg-white dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="hour"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Hora
                </label>
                <select
                  id="hour"
                  name="hour"
                  required
                  value={formData.hour}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-accent-2 bg-white dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
                >
                  {Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')).map(hour => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="minute"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Minutos
                </label>
                <select
                  id="minute"
                  name="minute"
                  required
                  value={formData.minute}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-accent-2 bg-white dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
                >
                  {Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0')).map(
                    minute => (
                      <option key={minute} value={minute}>
                        {minute}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* Lugar con Google Maps */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Lugar
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-accent-2 bg-white dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
                placeholder="Buscar lugar..."
              />
              <div id="map" className="mt-2 h-48 w-full rounded-md border border-accent-2"></div>
            </div>

            {/* Descripción */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-accent-2 bg-white dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
              />
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Crear evento
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

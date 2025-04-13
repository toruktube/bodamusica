'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EventType, CeremonyType, EventFormData } from '@/types/event';

interface EventFormProps {
  onClose: () => void;
  onSubmit: (data: EventFormData) => void;
}

export default function EventForm({ onClose, onSubmit }: EventFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    type: EventType.WEDDING,
    ceremonyType: CeremonyType.RELIGIOUS,
    date: '',
    time: '',
    location: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Nombre del evento */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nombre del evento
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-accent-2 bg-white dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            
            {/* Tipo de evento */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
                <option value={EventType.WEDDING}>Boda</option>
                <option value={EventType.COMMUNION}>Comunión</option>
                <option value={EventType.PARTY}>Fiesta</option>
                <option value={EventType.OTHER}>Otro</option>
              </select>
            </div>
            
            {/* Tipo de ceremonia */}
            <div>
              <label htmlFor="ceremonyType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Tipo de ceremonia
              </label>
              <select
                id="ceremonyType"
                name="ceremonyType"
                required
                value={formData.ceremonyType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-accent-2 bg-white dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
              >
                <option value={CeremonyType.RELIGIOUS}>Ceremonia Religiosa</option>
                <option value={CeremonyType.CIVIL}>Ceremonia Civil</option>
                <option value={CeremonyType.BAPTISM}>Bautizo</option>
                <option value={CeremonyType.COCKTAIL}>Cóctel</option>
                <option value={CeremonyType.FUNERAL}>Funeral</option>
              </select>
            </div>
            
            {/* Fecha y hora */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Hora
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-accent-2 bg-white dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
                />
              </div>
            </div>
            
            {/* Lugar */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Lugar (dirección de Google Maps)
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-accent-2 bg-white dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            
            {/* Descripción */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
          </div>
          
          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-accent-2 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 
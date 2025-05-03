'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Asegúrate de tener configurado el cliente de Supabase
import { Loader } from '@googlemaps/js-api-loader';
import { EventType } from '@/types/event';

export default function EditEventPage() {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState<{
    title: string;
    type: string;
    date: string;
    hour: string;
    location: string;
    place: string;
    description: string;
    artists: string[];
  }>({
    title: '',
    type: '',
    date: '',
    hour: '',
    location: '',
    place: '',
    description: '',
    artists: [],
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    // Función para obtener los detalles del evento
    const fetchEventDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('title, type, date, hour, location, place, description, artists')
          .eq('id', id)
          .single();

        if (error) throw error;

        setEventDetails({
          title: data.title || '',
          type: data.type || '',
          date: data.date || '',
          hour: data.hour || '',
          location: data.location || '',
          place: data.place || '',
          description: data.description || '',
          artists: Array.isArray(data.artists) ? data.artists : [],
        });
      } catch (error) {
        console.error('Error fetching event details:', (error as Error).message);
      }
    };

    fetchEventDetails();
  }, [id]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      const mapInstance = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 40.4168, lng: -3.7038 },
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
        setEventDetails(prev => ({
          ...prev,
          location: place.formatted_address || '',
          place: place.name || place.formatted_address || '',
        }));
        if (place.geometry && place.geometry.location) {
          mapInstance.setCenter(place.geometry.location);
          new google.maps.Marker({
            map: mapInstance,
            position: place.geometry.location,
          });
        }
      });

      setMap(mapInstance);
      setAutocomplete(autocompleteInstance);
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEventDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const { error } = await supabase.from('events').update(eventDetails).eq('id', id);

    if (error) {
      console.error('Error updating event:', error);
    } else {
      alert('Event updated successfully!');
    }
  };

  const handleArtistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;
    setEventDetails(prevDetails => ({
      ...prevDetails,
      artists: checked
        ? [...(prevDetails.artists || []), value]
        : prevDetails.artists?.filter((a: string) => a !== value) || [],
    }));
  };

  return (
    <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Editar Evento</h1>
      <div className="space-y-8">
        <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-primary">
          <h2 className="text-2xl font-semibold text-primary mb-4">Datos generales</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Título del evento</label>
              <input
                type="text"
                name="title"
                value={eventDetails.title}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Tipo de evento</label>
              <select
                name="type"
                value={eventDetails.type}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              >
                <option value={EventType.BODA_CIVIL}>Boda Civil</option>
                <option value={EventType.BODA_RELIGIOSA}>Boda Religiosa</option>
                <option value={EventType.COMUNION}>Comunión</option>
                <option value={EventType.COCTEL}>Cóctel</option>
                <option value={EventType.FUNERAL}>Funeral</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha</label>
                <input
                  type="date"
                  name="date"
                  value={eventDetails.date}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hora</label>
                <input
                  type="time"
                  name="hour"
                  value={eventDetails.hour}
                  step="300"
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Dirección</label>
              <input
                type="text"
                name="location"
                id="location"
                value={eventDetails.location}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                placeholder="Buscar dirección..."
              />
              <div id="map" className="mt-2 h-48 w-full rounded-md border border-accent-2"></div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Lugar</label>
              <input
                type="text"
                name="place"
                value={eventDetails.place}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                name="description"
                value={eventDetails.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
            >
              Guardar Cambios
            </button>
          </form>
        </section>
        <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-primary">
          <h2 className="text-2xl font-semibold text-primary mb-4">Agrupación musical</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="organo"
                name="artists"
                value="Órgano"
                onChange={handleArtistChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="organo" className="ml-2 block text-sm text-gray-700">
                <span className="inline-block w-5 h-5 bg-gray-200 rounded-full mr-2">🎹</span>
                Órgano
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="soprano"
                name="artists"
                value="Soprano"
                onChange={handleArtistChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="soprano" className="ml-2 block text-sm text-gray-700">
                <span className="inline-block w-5 h-5 bg-gray-200 rounded-full mr-2">🎤</span>
                Soprano
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="tenor"
                name="artists"
                value="Tenor"
                onChange={handleArtistChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="tenor" className="ml-2 block text-sm text-gray-700">
                <span className="inline-block w-5 h-5 bg-gray-200 rounded-full mr-2">🎤</span>
                Tenor
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="violin"
                name="artists"
                value="Violin"
                onChange={handleArtistChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="violin" className="ml-2 block text-sm text-gray-700">
                <span className="inline-block w-5 h-5 bg-gray-200 rounded-full mr-2">🎻</span>
                Violin
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="flauta"
                name="artists"
                value="Flauta"
                onChange={handleArtistChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="flauta" className="ml-2 block text-sm text-gray-700">
                <span className="inline-block w-5 h-5 bg-gray-200 rounded-full mr-2">🎶</span>
                Flauta
              </label>
            </div>
          </div>
        </section>
        <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-primary">
          <h2 className="text-2xl font-semibold text-primary mb-4">Programa</h2>
          {/* Detalles del programa */}
        </section>
      </div>
    </main>
  );
}

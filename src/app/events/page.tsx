export default function EventsPage() {
  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">Eventos</h1>
      
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
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No hay eventos creados todavía.
            </p>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Crear nuevo evento
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 
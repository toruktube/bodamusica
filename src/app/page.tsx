export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-6 text-primary">BodaMúsica</h1>
      <p className="text-xl mb-8">Gestiona la música para tus eventos especiales</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div className="bg-accent-1 dark:bg-accent-1 p-6 rounded-lg shadow-md border border-accent-2">
          <h2 className="text-2xl font-semibold mb-3 text-primary-dark">Gestiona tus eventos</h2>
          <p>Organiza bodas, comuniones y cualquier evento especial.</p>
        </div>
        <div className="bg-accent-1 dark:bg-accent-1 p-6 rounded-lg shadow-md border border-accent-2">
          <h2 className="text-2xl font-semibold mb-3 text-primary-dark">Planifica tu música</h2>
          <p>Crea listas de reproducción para cada momento del evento.</p>
        </div>
      </div>
    </main>
  );
}

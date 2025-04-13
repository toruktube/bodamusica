export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-accent-2">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {currentYear} <span className="text-primary font-medium">BodaMúsica</span>. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
              <span className="sr-only">Condiciones de servicio</span>
              <span className="text-sm">Condiciones</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
              <span className="sr-only">Política de privacidad</span>
              <span className="text-sm">Privacidad</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
              <span className="sr-only">Contacto</span>
              <span className="text-sm">Contacto</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 
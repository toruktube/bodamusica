'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-accent-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-primary hover:text-primary-dark transition-colors">
                BodaMúsica
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/" 
                className="border-transparent text-gray-500 hover:border-primary hover:text-primary dark:text-gray-300 dark:hover:text-primary-light inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Inicio
              </Link>
              <Link 
                href="/events" 
                className="border-transparent text-gray-500 hover:border-primary hover:text-primary dark:text-gray-300 dark:hover:text-primary-light inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Eventos
              </Link>
            </nav>
          </div>
          
          {/* Botón de menú móvil */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-accent-1 dark:hover:bg-accent-3 dark:hover:text-primary-light"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Abrir menú principal</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="border-transparent text-gray-500 hover:bg-accent-1 hover:border-primary hover:text-primary dark:hover:bg-accent-3 dark:text-gray-300 dark:hover:text-primary-light block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Inicio
          </Link>
          <Link
            href="/events"
            className="border-transparent text-gray-500 hover:bg-accent-1 hover:border-primary hover:text-primary dark:hover:bg-accent-3 dark:text-gray-300 dark:hover:text-primary-light block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Eventos
          </Link>
        </div>
      </div>
    </header>
  );
} 
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => (res.ok ? res.json() : Promise.reject()))
      .then(data => setIsAuthenticated(!!data.profile))
      .catch(() => setIsAuthenticated(false));
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-accent-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/icon.png" alt="BodaMúsica Logo" width={32} height={32} priority />
                <span className="text-xl font-semibold text-primary hover:text-primary-dark transition-colors">
                  BodaMúsica
                </span>
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="border-transparent text-gray-500 hover:border-primary hover:text-primary dark:text-gray-300 dark:hover:text-primary-light inline-flex items-center px-1 pt-1 border-b-2 text-sm font-semibold"
              >
                Inicio
              </Link>
              <Link
                href="/events"
                className="border-transparent text-gray-500 hover:border-primary hover:text-primary dark:text-gray-300 dark:hover:text-primary-light inline-flex items-center px-1 pt-1 border-b-2 text-sm font-semibold"
              >
                Eventos
              </Link>
            </nav>
          </div>

          {/* Botón cerrar sesión o iniciar sesión desktop */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => router.push('/profile')}
                  className="hidden sm:inline-flex ml-4 px-4 py-2 border border-primary rounded-md shadow-sm text-sm font-medium text-primary bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center space-x-2"
                >
                  <FaUser />
                  <span>Editar perfil</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="hidden sm:inline-flex ml-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center space-x-2"
                >
                  <FaSignOutAlt />
                  <span>Cerrar sesión</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => router.push('/login')}
                className="hidden sm:inline-flex ml-4 px-4 py-2 border border-primary rounded-md shadow-sm text-sm font-medium text-primary bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Iniciar sesión
              </button>
            )}
            {/* Botón de menú móvil */}
            <div className="sm:hidden ml-2 flex items-center">
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
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
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1 text-center">
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
          {/* Botón cerrar sesión o iniciar sesión móvil */}
          {isAuthenticated ? (
            <>
              <button
                onClick={() => router.push('/profile')}
                className="w-full mt-2 px-4 py-2 border-l-4 border-transparent text-gray-500 hover:bg-accent-1 hover:border-primary hover:text-primary dark:hover:bg-accent-3 dark:text-gray-300 dark:hover:text-primary-light block pl-3 pr-4 py-2 text-base font-medium"
              >
                Editar perfil
              </button>
              <button
                onClick={handleLogout}
                className="w-full mt-2 px-4 py-2 border-l-4 border-transparent text-gray-500 hover:bg-accent-1 hover:border-primary hover:text-primary dark:hover:bg-accent-3 dark:text-gray-300 dark:hover:text-primary-light block pl-3 pr-4 py-2 text-base font-medium"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push('/login')}
              className="w-full mt-2 px-4 py-2 border-l-4 border-transparent text-gray-500 hover:bg-accent-1 hover:border-primary hover:text-primary dark:hover:bg-accent-3 dark:text-gray-300 dark:hover:text-primary-light block pl-3 pr-4 py-2 text-base font-medium"
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

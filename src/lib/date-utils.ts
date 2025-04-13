/**
 * Formatea una fecha en formato legible
 * @param date - La fecha a formatear
 * @param locale - El locale a utilizar, por defecto 'es-ES'
 * @returns La fecha formateada como string
 */
export function formatDate(date: Date | string, locale: string = 'es-ES'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Formatea una fecha con hora en formato legible
 * @param date - La fecha a formatear
 * @param locale - El locale a utilizar, por defecto 'es-ES'
 * @returns La fecha y hora formateada como string
 */
export function formatDateTime(date: Date | string, locale: string = 'es-ES'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Convierte segundos a formato mm:ss
 * @param seconds - Los segundos a convertir
 * @returns Tiempo formateado como mm:ss
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
} 
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  // Esta ruta se usará para servir el icono una vez sea subido

  // Por ahora retornamos un mensaje indicando que se debe subir un icono
  return new NextResponse(
    JSON.stringify({
      message: 'Por favor, sube un archivo .png para usarlo como icono de la aplicación.',
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

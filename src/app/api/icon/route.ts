import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  // Esta ruta se usará para servir el icono una vez sea subido
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'png';
  
  let filePath;
  
  // Por ahora retornamos un mensaje indicando que se debe subir un icono
  return new NextResponse(
    JSON.stringify({ 
      message: 'Por favor, sube un archivo .png para usarlo como icono de la aplicación.' 
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
} 
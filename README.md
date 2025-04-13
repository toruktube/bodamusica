# BodaMúsica App

Aplicación web para gestionar eventos musicales (bodas, comuniones, etc.) y planificar la música para cada momento del evento.

## Tecnologías

- Next.js 14 con App Router
- TypeScript
- Tailwind CSS
- Vercel (despliegue)

## Estructura del proyecto

```
bodamusica.app/
├── src/
│   ├── app/                   # App Router de Next.js
│   │   ├── events/            # Rutas para gestión de eventos
│   │   ├── page.tsx           # Página de inicio
│   │   └── layout.tsx         # Layout principal
│   ├── components/            # Componentes reutilizables
│   │   └── layout/            # Componentes de layout (Header, Footer)
│   ├── lib/                   # Utilidades y funciones auxiliares
│   ├── types/                 # Definiciones de tipos TypeScript
│   ├── hooks/                 # Hooks personalizados
│   └── styles/                # Estilos adicionales
├── public/                    # Archivos estáticos
├── .env                       # Variables de entorno locales
├── .env.example               # Ejemplo de variables de entorno
└── package.json               # Dependencias y scripts
```

## Desarrollo local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/toruktube/bodamusica.git
   cd bodamusica.app
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` basado en `.env.example`

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Flujo de trabajo Git

- Rama principal: `main`
- Desarrollo en ramas de funcionalidad: `feature/nombre-funcionalidad`
- Pull requests a `main` para revisión y fusión

## Despliegue

La aplicación se despliega automáticamente en Vercel cuando se envían cambios a la rama `main`.

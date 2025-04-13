# Iconos de la aplicación

Para añadir tu propio icono a la aplicación, sigue estos pasos:

1. Reemplaza los siguientes archivos con tus propios iconos PNG:
   - `icon.png` - Tamaño recomendado: 512x512 (icono principal)
   - `apple-icon.png` - Tamaño recomendado: 180x180 (para dispositivos Apple)
   - `favicon.ico` - Tamaño recomendado: 32x32 (favicon del navegador)

2. Asegúrate de que los nuevos iconos mantengan el mismo nombre de archivo.

## Conversión del SVG a PNG

Si tienes un archivo SVG y quieres convertirlo a PNG, puedes utilizar alguna de estas opciones:

1. **Herramientas online**:
   - [SVG to PNG Converter](https://svgtopng.com/)
   - [Convertio](https://convertio.co/svg-png/)

2. **Programáticamente**:
   Instala la librería sharp y usa el script en `scripts/generate-icon.js`:
   ```bash
   npm install sharp
   node scripts/generate-icon.js
   ``` 
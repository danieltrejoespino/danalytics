// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import fs from 'fs';
// import path from 'path';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     https: {
//       key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
//       cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
//     },
//     // host: '192.168.1.80', // Establecer el host (opcional)
//     port: 5173, // Puerto
//   },
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definir la ruta a los certificados
const certPath = path.resolve(__dirname, 'src', 'cert');

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.join(certPath, 'clave-privada.key')),
      cert: fs.readFileSync(path.join(certPath, 'certificado.crt')),
    },
    host: '192.168.1.80', // Establecer el host (opcional)
    port: 5173, // Puerto
  },
});

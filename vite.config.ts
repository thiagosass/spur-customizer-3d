import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// config aberto à rede local
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});

/*//config exclusivo maquina local
export default defineConfig({
  plugins: [react()],
})*/

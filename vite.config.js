import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/'
})
// import { defineConfig, loadEnv } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig(({ mode }) => {
//   // Load environment variables based on the current mode
//   const env = loadEnv(mode, process.cwd());

//   return {
//     plugins: [react()],
//     define: {
//       // Make sure you expose only VITE_ prefixed variables
//       'process.env': {
//         VITE_APP_API_BASE_URL: env.VITE_APP_API_BASE_URL,
//       },
//     },
//   };
// });

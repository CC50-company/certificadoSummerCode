import { defineConfig } from "vite";
import { run } from 'vite-plugin-run'
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // run([{
    //     name: 'API startup',
    //     run: ['ts-node', '.\\api\\src\\main.ts'],
    //   }])
  ],
  base: "/",
});

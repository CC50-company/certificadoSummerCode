import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { bootstrap } from "./api/src/main"

export default defineConfig(async ({}) => {
  bootstrap()
  return {
    plugins: [react()],
    base: "/",
  }
})
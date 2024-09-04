import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    //eslint-disable-next-line no-under
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dynamicImport from 'vite-plugin-dynamic-import'

// https://vitejs.dev/config/
export default defineConfig((props) => {
  const env = loadEnv(props.mode, process.cwd(), '')
  return {
    plugins: [react({
      babel: {
        plugins: [
          'babel-plugin-macros'
        ]
      }
    }),
    dynamicImport()],
    assetsInclude: ['**/*.md'],
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
      },
    },
    build: {
      outDir: 'build'
    },
    server: {
      proxy: {
        '/api/v1': {
          target: env.REACT_APP_API_HOST_BACKEND || '',
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
});

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base:"./",
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  
  ],

  server:{
    proxy:{
      "/api":{
        target:"http://backend-api-01.newbee.ltd",
        changeOrigin:true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  },
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./src')
    }
  }
})

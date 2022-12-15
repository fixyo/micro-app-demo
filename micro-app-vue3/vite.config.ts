import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import qiankun from 'vite-plugin-qiankun'
// npm i @types/node -D
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // 自定义jsx
  /**
   * 默认情况下esbuild会被应用再ts,tsx,jsx文件
   */
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    qiankun('Vu3eMicroApp', {
      useDevMode: true
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src')
    }
  },
  base: './', // 打包路径
  server: {
    port: 10400,
    host: 'localhost',
    open: true,
    cors: true,
    // fs: {
    //   allow: ['/src', '/mock']
    // }
    proxy: {
      '/dev': {
        target: 'http://localhost:9002',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/dev/', '/')
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/style/variables.scss';`
      }
    }
  }
})

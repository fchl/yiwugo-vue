import path from 'node:path'
import process from 'node:process'
import { loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import viewport from 'postcss-mobile-forever'
import autoprefixer from 'autoprefixer'
import { createVitePlugins } from './build/vite'
import { exclude, include } from './build/vite/optimize'

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)

  return {
    base: env.VITE_APP_PUBLIC_PATH,
    plugins: createVitePlugins(mode),

    server: {
      host: true,
      port: 3000,
      proxy: {
        '/ywg': {
          target: 'https://app.yiwugo.com/',
          ws: false,
          changeOrigin: true,
          // 重写路径
          rewrite: (path) => { return path.replace(/^\/ywg/, '') },
        },
        '/wan': {
          target: 'https://www.wanandroid.com/',
          ws: false,
          changeOrigin: true,
          // 重写路径
          rewrite: (path) => { return path.replace(/^\/wan/, '') },
        },
        '/api': {
          target: 'https://api.apiopen.top/api/',
          ws: false,
          changeOrigin: true,
          // 重写路径
          rewrite: (path) => { return path.replace(/^\/api/, '') },
        },
        '/img': {
          target: 'https://img1.yiwugo.com/',
          ws: false,
          changeOrigin: true,
          // 重写路径
          rewrite: (path) => { return path.replace(/^\/img/, '') },
        },
      },
    },

    resolve: {
      alias: {
        '~@': path.join(__dirname, './src'),
        '@': path.join(__dirname, './src'),
        '~': path.join(__dirname, './src/assets'),
        '~root': path.join(__dirname, '.'),
      },
    },

    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          // https://github.com/wswmsword/postcss-mobile-forever
          viewport({
            appSelector: '#app',
            viewportWidth: 375,
            maxDisplayWidth: 600,
            rootContainingBlockSelectorList: [
              'van-tabbar',
              'van-popup',
            ],
            border: true,
          }),
        ],
      },
    },

    build: {
      cssCodeSplit: false,
      chunkSizeWarningLimit: 2048,
      outDir: env.VITE_APP_OUT_DIR || 'dist',
    },

    optimizeDeps: { include, exclude },
  }
}

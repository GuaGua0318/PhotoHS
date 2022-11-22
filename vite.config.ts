import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import postCssPxToRem from "postcss-pxtorem"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteCommonjs()],
  css:{
    postcss:{
      plugins:[
        postCssPxToRem({
          rootValue:37.5,
          propList:['*']
        })
      ]
    }
  }
})

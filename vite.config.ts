import path from 'path'
import Vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import Unocss from 'unocss/vite'

export default {
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),

    svgLoader(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      dts: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
    }),

    // https://github.com/antfu/unocss
    Unocss({
      shortcuts: [
        ['normal-bg', 'p-2 rounded-2 bg-slate-200 dark:bg-slate-800'],
        [
          'btn',
          'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
        ],
        [
          'icon-btn',
          'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600',
        ],
        [
          'tile',
          'w-9 h-9 p-2 rounded-1 bg-slate-400/60 text-slate-800 dark:bg-slate-600 dark:text-slate-50 block select-none',
        ],
        ['playing-title', 'text-cool-gray-600 dark:text-cool-gray-400'],
        ['won-title', 'text-green-600 dark:text-green-500'],
        ['lost-title', 'text-red-600 dark:text-red-500'],
        ['tile-hole', 'bg-slate-300 dark:bg-slate-700'],
        ['tile-checked', 'bg-cyan-600/40 dark:bg-cyan-700/75'],
        ['tile-mine', 'bg-red-500/45 dark:bg-red-500/45'],
        [
          'button',
          'py-1 px-3 rounded-md bg-slate-300 text-slate-800 dark:bg-slate-600 dark:text-slate-50',
        ],
      ],
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
        }),
      ],
    }),
  ],

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
}

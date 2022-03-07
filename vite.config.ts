import path from 'path'
import Vue from '@vitejs/plugin-vue'
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
      rules: [
        [
          /^cgc-(\d+)$/,
          ([, d]) => ({ 'grid-template-cols': `repeat(${d}, minmax(min-content, max-content))` }),
        ],
        [
          /^c-grid-rows-(\d+)$/,
          ([, d]) => ({ 'grid-template-rows': `repeat(${d}, minmax(min-content, max-content))` }),
        ],
      ],
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
          'w-6 h-6 text-xs rounded-1 bg-slate-400/60 text-slate-800 dark:bg-slate-600 dark:text-slate-50 block select-none',
        ],
        ['tile-hole', 'bg-slate-300 dark:bg-slate-700'],
        [
          'button',
          'py-1 px-3 rounded-md bg-slate-300 text-slate-800 dark:bg-slate-600 dark:text-slate-50',
        ],
        [
          'won',
          'inset-0 absolute bg-slate-200/60 dark:bg-slate-800/60 flex justify-center items-center font-bold text-emerald-600 dark:text-emerald-400 text-xl',
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
  base: 'https://ms-fadaei.github.io/demine/',

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
}

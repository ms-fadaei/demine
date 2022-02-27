// register vue composition api globally
import { ViteSSG } from 'vite-ssg/single-page'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

export const createApp = ViteSSG(App)

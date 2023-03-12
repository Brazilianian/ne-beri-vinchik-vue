import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'

import { faCircleChevronLeft, faCircleUp, faFilter, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useFavicon } from '@vueuse/core'

import "@/axios"

const icon = useFavicon()
icon.value = 'favicon.ico'

library.add( faCircleChevronLeft, faCircleUp, faFilter, faXmark )

const app = createApp(App)

app
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')




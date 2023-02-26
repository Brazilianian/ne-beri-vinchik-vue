import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'

import { faCircleChevronLeft, faCircleUp, faFilter } from '@fortawesome/free-solid-svg-icons'
import { firestorePlugin } from "vuefire";
import { useFavicon } from '@vueuse/core'

const icon = useFavicon()
icon.value = 'favicon.ico'

library.add( faCircleChevronLeft, faCircleUp, faFilter )

const app = createApp(App)

app
    .use(router)
    .use(firestorePlugin)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')




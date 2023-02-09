import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'

import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons";

library.add(faCircleChevronLeft, faCircleDown, faCircleUp)

const app = createApp(App)

app
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')


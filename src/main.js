// Import the necessary modules and styles
import './assets/main.css'
import './index.css' // Tailwind CSS
import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router/index.js'

// Import Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Add all Font Awesome solid icons to the library
library.add(fas)

// Create and mount Vue app
const app = createApp(App)

// Register FontAwesomeIcon as a global component
app.component('font-awesome-icon', FontAwesomeIcon)

// Use Vue Router
app.use(router)

// Prepare customer
const loggedInCustomer = ref(null)
app.provide('loggedInCustomer', loggedInCustomer)

// Mount the app
app.mount('#app')

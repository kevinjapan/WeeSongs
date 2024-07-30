import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import AppStatus from './components/App/AppStatus/AppStatus.vue'



const pinia = createPinia()

// create an Application instance
// the first argument is the root component. The second optional argument is the props to be passed to the root component.
const app = createApp(App)

app.use(router)
app.use(pinia)

// a .config object allows us to configure a few app-level options
app.config.errorHandler = (err) => {
   /* handle error */
   console.log('App Error:',err)
}

// Global Component Registration
// The application instance also provides a few methods for registering app-scoped assets
// eg this makes the AppStatus available for use anywhere in our app.
// cf Local registration scopes the availability of the registered components to the current component only. 
// It makes the dependency relationship more explicit, and is more tree-shaking friendly.
app.component('AppStatus', AppStatus)


// mount application instance on DOM element (app container)
// The .mount() method should always be called after all app configurations and asset registrations are done. 
app.mount('#app')
import { createApp } from 'vue'
import App from './App.vue'
import Route from './router'
import Vuex from './store'
import 'bulma/css/bulma.css'
import './style.css'
createApp(App).use(Route).use(Vuex).mount('#app')

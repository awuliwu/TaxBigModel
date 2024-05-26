import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios'


const app = createApp(App);

app.use(router);
app.mount('#app');
axios.defaults.baseURL = 'http://10.176.64.81:7861';


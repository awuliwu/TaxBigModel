import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

// 配置Axios的baseURL
axios.defaults.baseURL = 'http://localhost:7861';

const app = createApp(App);

app.use(router);

// 将 axios 注入到 Vue 实例中，这样可以在组件中通过 this.$axios 访问
app.config.globalProperties.$axios = axios;

app.mount('#app');

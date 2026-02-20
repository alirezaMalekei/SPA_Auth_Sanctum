import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import useAuth from "@/composable/useAuth.js";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL='http://localhost:8000'

const {attempt} = useAuth();

attempt().then(()=>{
    createApp(App).mount('#app')
});

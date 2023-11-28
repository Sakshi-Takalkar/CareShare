import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from 'firebase'
import * as VueFire from 'vuefire'
import 'firebase/firestore'
import { initializeApp } from "firebase/app";


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueFire)

const firebaseConfig = {
  apiKey: "AIzaSyBmoM4uy2Xrk776rcgsBfHGO5DPnqr7GaM",
  authDomain: "careshare-cf9bb.firebaseapp.com",
  projectId: "careshare-cf9bb",
  storageBucket: "careshare-cf9bb.appspot.com",
  messagingSenderId: "1018567196520",
  appId: "1:1018567196520:web:68f127eabfab5b37b220dd",
  measurementId: "G-0P0Y1JPTLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = firebase.firestore()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default db;
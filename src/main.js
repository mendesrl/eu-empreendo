import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Router from 'vue-router'
import VueRouter from 'vue-router';
import store from './store/store.js'
import Usuario from '@/components/Usuario'
import ListagemComunicados from '@/components/ListagemComunicados'

Vue.use(Vuetify)
Vue.use(Router)
Vue.config.productionTip = false

const router = new VueRouter({
  routes:[
    {
      path: '/',
      name: 'Usuario',
      component: Usuario
    },
    {
      path: '/lista-comunicados',
      name: 'lista-comunicados',
      component: ListagemComunicados
    },
  ]
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

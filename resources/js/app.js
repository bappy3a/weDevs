require('./bootstrap');
import Vue from 'vue'
import VueRouter from 'vue-router'
import { Form, HasError, AlertError } from 'vform'
import Snotify, { SnotifyPosition } from 'vue-snotify'

window.Form = Form
const SnotifyOptions = {
  toast: {
    position: SnotifyPosition.rightTop
  }
}

Vue.use(Snotify, SnotifyOptions)

Vue.use(VueRouter)
import {routes} from './routes';


/*Import User*/
import User from './Helpers/User';
window.User = User


Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)



const router = new VueRouter({
  routes,
  mode: 'history'
})

const app = new Vue({
    el: '#app',
    router
});

//Auth Route Start
let login = require('./components/auth/login.vue').default;
let register = require('./components/auth/register.vue').default;
let logout = require('./components/auth/logout.vue').default;
//Product
let home = require('./components/home.vue').default;
let create = require('./components/create.vue').default;
let edit = require('./components/edit.vue').default;


export const routes = [
  { path: '/', component: login, name:'/' },
  { path: '/register', component: register, name:'register'  },
  { path: '/logout', component: logout, name:'logout'  },
  //Product
  { path: '/home', component: home, name:'home'  },
  { path: '/create', component: create, name:'create'  },
  { path: '/edit/:id', component: edit, name:'edit'  },
]
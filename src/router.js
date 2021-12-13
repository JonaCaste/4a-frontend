import { createRouter, createWebHashHistory } from 'vue-router';
import App          from "./App.vue";
import LogIn        from "./components/LogIn.vue";
import SignUp       from "./components/SignUp.vue";
import Citas        from "./components/Citas.vue";
import Cliente        from "./components/Cliente.vue";

const routes = [
  {
    path: '/',
    name: 'root',
    component: App
  },
  {
    path: '/profesional/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/profesional/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/profesional/citas',
    name: 'Citas',
    component: Citas
  },
  {
    path: '/profesional/cliente',
    name: 'Cliente',
    component: Cliente
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;

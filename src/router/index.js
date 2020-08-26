import Vue from 'vue';
import VueRouter from 'vue-router';
const MainLoginViews = () =>import('../views/LoginView/MainLoginViews');
const MainPageS = () => import('../views/MainPageView/MainPageS')
Vue.use(VueRouter)

  const routes = [
    {
      path: '',
      redirect: '/IEducation/login'
    },
    {
      path: '/IEducation/login',
      name: 'MainLoginViews',
      component: MainLoginViews
    },
    {
      path: '/IEducation/main_s',
      name: 'MainPageS',
      component: MainPageS
    }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

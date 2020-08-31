import Vue from 'vue';
import VueRouter from 'vue-router';
const MainLoginViews = () =>import('views/LoginView/MainLoginViews');
const MainRegisterViews = () => import('views/RegisterView/MainRegisterViews');
const MainPageS = () => import('views/MainPageView/MainPageS');
const ReadyForPractive = () => import('views/ReadyForPracticeView/MainRFPractiveView')
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
      path: '/IEducation/register',
      name: 'MainRegisterViews',
      component: MainRegisterViews

    },
    {
      path: '/IEducation/main_s',
      name: 'MainPageS',
      component: MainPageS
    },
    {
      path: '/IEducation/readyForPractive',
      name: 'ReadyForPractive',
      component: ReadyForPractive
    }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

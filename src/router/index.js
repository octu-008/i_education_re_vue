import Vue from 'vue';
import VueRouter from 'vue-router';
const MainLoginViews = () =>import('views/LoginView/MainLoginViews');
const MainRegisterViews = () => import('views/RegisterView/MainRegisterViews');
const MainPageS = () => import('views/MainPageView/MainPageS');
const MainPageT = () => import('views/MainPageView/MainPageT');
const ReadyForPractive = () => import('views/ReadyForPracticeView/MainRFPractiveView');
const MainPractiveView = () => import('views/PractiveVIews/MainPractiveView');
const MainNQuestion = () => import('views/NewQuestionView/MainNQuestion');

Vue.use(VueRouter)

  const routes = [
    {
      //默认跳转至登录页面
      path: '',
      redirect: '/IEducation/login'
    },
    {
      //登录主页
      path: '/IEducation/login',
      name: 'MainLoginViews',
      component: MainLoginViews
    },
    {
      //注册页面
      path: '/IEducation/register',
      name: 'MainRegisterViews',
      component: MainRegisterViews

    },
    {
      //学生用户主页
      path: '/IEducation/main_s',
      name: 'MainPageS',
      component: MainPageS
    },
    {
      path: '/IEducation/main_t',
      name: 'MainPageT',
      component: MainPageT
    },
    {
      //练习参数设置页面
      path: '/IEducation/readyForPractive',
      name: 'ReadyForPractive',
      component: ReadyForPractive
    },
    {
      //自动判卷的练习页面
      path: '/IEducation/practive',
      name: 'Practive',
      props: true,
      component: MainPractiveView
    },
    {
      //新增题目页面
      path: '/IEducation/newQuestion',
      name: 'NewQuestion',
      component: MainNQuestion
    }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

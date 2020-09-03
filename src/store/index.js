import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //当用户成功登录时，存储用户的登录信息
    userOnline:{
      id:'-1',
      phone:'',
      username:'test',
      type:'',
      imgPath:'baseImg'
    }
  },
  mutations,
  actions,
  modules: {
  }
})

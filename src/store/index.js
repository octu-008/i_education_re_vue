import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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

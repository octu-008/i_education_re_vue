import request from '../network/request'
export default {
  //登录页面-发送登录请求
  loginRequest(context,payload)
  {
    return request(payload.config);
  },
  //获取成功登录的用户的账号信息，并且更新vuex中的store信息
  onlineStateUpdate({commit},payload)
  {
    request(payload.config).then( res =>{
      if(res.data != null)
      {
        let userInfo = res.data;
        return new Promise((resolve) => {
          commit('userOlUpdate',{userInfo});
          resolve(userInfo.type);
        });
      }
    });
  }
};
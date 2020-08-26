import request from '../network/request'
export default {
  loginRequest(context,payload)
  {
    return request(payload.config);
  },
  onlineStateUpdate({commit},payload)
  {
    request(payload.config).then( res =>{
      if(res.data != null)
      {
        let userInfo = res.data;
        return new Promise((resolve) => {
          commit('userOlUpdate',{userInfo});
          resolve();
        });
      }
    });
  }
};
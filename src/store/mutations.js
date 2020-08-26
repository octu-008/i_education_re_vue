export default  {
  userOlUpdate(state,payload)
    {
      state.userOnline.id = payload.userInfo.id
      state.userOnline.username = payload.userInfo.username;
      state.userOnline.phone = payload.userInfo.phone;
      state.userOnline.type = payload.userInfo.type;
    }
};
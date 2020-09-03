<template>
<!-- 自定义导航栏 -->
<header>
  <label id="tittle">{{navtittle}}</label>
  <div class="user_info" v-if="loginState">
    <label id="user_name">{{this.$store.state.userOnline.username}}</label>
    <img :src="require('assets/img/'+this.imgPath+'.jpg')"/>
  </div>
</header>
</template>
<script>
 export default {
   name: 'IeNavBar',
   props: {
     //项目标题
     navtittle: {
       type: String,
       default: 'IEducation'
     }
   },
   data() {
     return {
       //用户头像图片路径
       imgPath: this.$store.state.userOnline.imgPath
     }
   },
   computed:{
     loginState()
     {
       //检测vuex的store中是否有登录中的用户
       return (this.$store.state.userOnline.id > 0)
     }
   }
}
</script>
<style scoped>
header{
/*   兼容IE10 */
  display: -ms-inline-flexbox;
  display: flex;

  -ms-flex-direction: row;
  flex-direction: row;

  -ms-flex-align: center;
  align-items: center;

  padding: 1rem 1.5rem;

  margin-bottom: 1.5rem;

  background-color: #ffffff;

  border-bottom: 1px solid #dee2e6;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
nav{
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
}
.tittle_div
{
  height: 35px;
}
#tittle{
  margin-bottom: 0;
  margin-right: auto;
  font-weight: 400;
  font-size: 20px;
  height: 35px;
  display: flex;
  align-items: center;
}
#user_name
{
  margin-top: 0 !important; 
  font-weight: 400 !important;
  margin-left:auto
}
img{
  border-radius: 50% !important;
  width: 35px;
  height: 35px;
  margin-left: 15px;
}
.user_info
{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
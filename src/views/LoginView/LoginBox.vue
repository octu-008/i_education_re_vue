<template>
<div class="edge"> 
  <div id="login_form">
    <div id="form_content">
      <div :class="content_group" class="login_tittle">
        <label>请登录</label>
      </div>
      <input-with-img ref="phone" :groupMargin = "content_group" groupType="text" groupPlaceholder="手机号码">
        <i slot="img" class="fa fa-user-circle" style="font-size: 25px"></i>
      </input-with-img>
      <input-with-img ref="password" :groupMargin = "content_group" groupType="password" groupPlaceholder="账号密码">
        <i slot="img" class="fa fa-lock" style="font-size: 25px"></i>
      </input-with-img>
      <div class="center_div">
        <div class="div_radio">
          <input class="div_check_input" type="radio" value="1" v-model="type">
          <label class="div_check_label">学生</label>
        </div>
        <div class="div_radio">
          <input class="div_check_input" type="radio" value="2" v-model="type">
          <label class="div_check_label">教师</label>
        </div>
      </div>
      <hr>
      <div class="center_div">
        <ie-button type="btn-success" :signal="loginSubmit" @loginsubmitsignal="submit">
          <i class="fa fa-plus-circle" style="margin-right : 1rem"></i>
          <label style="font-size : 23px">登录</label>
        </ie-button>
        <ie-button type="btn-primary">
          <label style="font-size : 23px">注册</label>
          <i class="	fa fa-arrow-circle-right" style="margin-left : 1rem"></i>
        </ie-button>
      </div>
      <div class="tips_login">
        <label>{{tipForLogin}}</label>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import InputWithImg from '../../components/InputWithImg'
import IeButton from '../../components/IeButton'
 export default {
   name: 'LoginBox',
   data() {
     return {
       type: 1,
       content_group:{
           marginBottom: '1.2rem',
       },
       loginSubmit: 'loginsubmitsignal',
       tipForLogin: ''
     }
   },
   methods:{
     submit()
     {
       if(this.$refs.phone.groupValue.length < 1)
       {
         this.tipForLogin = '*请正确输入账号*';
       }
       else {
         if (this.$refs.password.groupValue.length <1)
         {
           this.tipForLogin = '*请正确输入密码*';
         }
         else{
           let config ={
             url: '/login',
             method: 'POST',
             data: 'phone='+this.$refs.phone.groupValue+
                   '&password='+this.$refs.password.groupValue+
                   '&type='+this.type,
           };
           this.$store.dispatch('loginRequest',{config}).then( res =>{
             if(res.data.code == 100)
             {
               this.tipForLogin ='*'+ res.data.message + '*';
             }
             else{
               config = {
                 url: '/useronline/'+this.$refs.phone.groupValue,
                 method: 'POST'
               }
               this.$store.dispatch('onlineStateUpdate',{config}).then( () =>{
                 this.$router.push('/IEducation/main_s');
               });
             }
           });
         }
       }
     }
   },
   computed: {
   },
   components: {
     InputWithImg,IeButton
   }
}
</script>
<style scoped>
@import url("https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css");
.edge{
  -ms-flex-preferred-size:0;
  flex-basis: 0;
  -ms-flex-positive:1;
  flex-grow: 1;
  max-width: 100;
}
#login_form{
  display: -ms-inline-flexbox;
  display: flex;
  width: 80%;
  height: 70%;
  margin: 5rem 10%;
    
  border-bottom: 1px solid #dee2e6;

  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
#form_content{
  width: 80%;
  margin: 1rem 10%;
}
.login_tittle
{
  text-align: center ;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 25px;
}
.div_radio{
  position: relative;
  display: block;

  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
  padding-left: 0;
  margin-left: 3rem;
  margin-right: 3rem;
}
.div_check_input{
  position: absolute;
  margin-top: 0.3rem;
  margin-left: -1.25rem;
}
.div_check_label{
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
  padding-left: 0;
  margin-right: 0.75rem;
}
.center_div
{
  text-align: center;
}
hr{
  background-color:#DCDCDC;
  height: 1px;
  border: none;
  margin-top: 15px;
  margin-bottom: 15px;
}
.tips_login
{
  display: block;
  color: #dc3545;
  text-align: center;
  font-size: 17px;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
</style>
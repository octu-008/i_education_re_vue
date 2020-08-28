<template>
<ie-form-box>
  <div :class="content_group" class="register_tittle">
    <label>请输入以下注册信息</label>
  </div>
  <input-with-limited ref="phone" :groupMarigin ="content_group" groupType="text" 
  groupPlaceholder="手机号码" tipsText="*请输入11位的手机号码"
  :maxLength="phoneLimitLength.max" :minLength="phoneLimitLength.min"></input-with-limited>
  <input-with-limited ref="password" :groupMargin="content_group" groupType="password"
  groupPlaceholder="密码" tipsText="*请输入4-16位密码"
  :maxLength="passwordLimitLength.max" :minLength="passwordLimitLength.min">
  </input-with-limited>
  <input-with-limited ref="rpassword" :groupMargin="content_group" groupType="password"
  groupPlaceholder="再次密码" tipsText="*请再次输入密码，确保和第一次输入一致"
  :maxLength="passwordLimitLength.max" :minLength="passwordLimitLength.min">
  </input-with-limited>
  <input-with-limited ref="username" :groupMargin="content_group" groupType="text"
  groupPlaceholder="用户名" tipsText="*请输入1-25位用户名"
  :maxLength="usernameLimitLength.max" :minLength="usernameLimitLength.min">
  </input-with-limited>
  <label class="type_lable">*请选择您的身份类型：</label>
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
  <ie-hr></ie-hr>
  <div class="center_div">
    <ie-button type="btn-primary" :signal="registerSubmit" @registersubmitsignal="submitRegister">
      <label style="font-size: 23px">注册</label>
    </ie-button>
  </div>
</ie-form-box>
</template>
<script>
import IeFormBox from 'components/IeFormBox'
import InputWithLimited from 'components/InputWithLimited'
import IeHr from 'components/IeHr'
import IeButton from 'components/IeButton'
 export default {
   name: 'RegisterBox',
   data() {
     return {
       type:1,
      content_group:{
        marginBottom: '1.3rem',
      },
      phoneLimitLength:{
        max: 11,
        min: 11
      },
      passwordLimitLength:{
        max: 16,
        min: 4
      },
      usernameLimitLength:{
        max: 25,
        min: 1
      },
      registerSubmit: 'registersubmitsignal'
     }
   },
   components:{
     IeFormBox,InputWithLimited,IeHr,IeButton
   },
   methods:{
     submitRegister()
     {
       console.log('注册');
     }
   }
}
</script>
<style scoped>
@import '~assets/css/inputradio.css';
.register_tittle
{
  text-align: center;
  padding-top: 1.1rem;
  padding-bottom: 1.1rem;
  font-size: 27px;
}
.type_lable
{
  font-size: 17px;
  margin-top: 0.7rem;
  margin-bottom: 0.7rem;
  color: #6c757d;
}
.center_div
{
  text-align: center;
  margin-top: 0.7rem;
  margin-bottom: 0.7rem;
}
</style>
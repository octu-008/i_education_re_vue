<template>
<!-- 注册表单盒子 -->
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
   <b-form-group label="请选择您的身份类型：">
     <b-form-radio-group class="text-center">
       <b-form-radio value="1" v-model="type">学生</b-form-radio>
       <b-form-radio value="2" v-model="type">教师</b-form-radio>
     </b-form-radio-group>
   </b-form-group>
  <ie-hr></ie-hr>
  <div class="center_div">
    <b-button variant="primary" @click="registerConfirmDialog = true" style="font-size: 23px">注册
    </b-button>
  </div>
  <div class="text-center tips_register">
    <label :class="tipsState">{{tipsForRegister}}</label>
  </div>
  <b-modal id="registerModal" hide-footer title="注册信息确认" v-model="registerConfirmDialog" no-close-on-backdrop="true">
    <div class="d-block text-center">
      <h3>确认要注册账号吗？</h3>
    </div>
    <ie-hr></ie-hr>
    <div class="text-right">
      <b-button variant="outline-danger" @click="registerConfirmDialog = false" style="font-size: 23px">
        等等，未确认
      </b-button>
    <ie-button buttonType="primary" :signal="registerSubmit" @registersubmitsignal="submitRegister"
    style="font-size: 23px">是的，已确认
    </ie-button>
    </div>
  </b-modal>
</ie-form-box>
</template>
<script>
import IeFormBox from 'components/IeFormBox'
import InputWithLimited from 'components/InputWithLimited'
import IeHr from 'components/IeHr'
import IeButton from 'components/IeButton'
import request from 'network/request.js'
 export default {
   name: 'RegisterBox',
   data() {
     return {
       //用户类型
      type:1,
      //内容边距
      content_group:{
        marginBottom: '1.3rem',
      },
      //设置手机号码长度限制
      phoneLimitLength:{
        max: 11,
        min: 11
      },
      //设置账号密码长度限制
      passwordLimitLength:{
        max: 16,
        min: 4
      },
      //设置用户名长度限制
      usernameLimitLength:{
        max: 25,
        min: 1
      },
      //自定义提交注册信息信号
      registerSubmit: 'registersubmitsignal',
      //注册信息确认弹窗
      registerConfirmDialog: false,
      //注册信息提示
      tipsForRegister: '',
      //注册信息提示样式
      tipsState: 'tipState_unq'
     }
   },
   components:{
     IeFormBox,InputWithLimited,IeHr,IeButton
   },
   methods:{
     registerSuccess()
     {
       this.tipsState ='tipState_pas';
       this.tipsForRegister="*注册成功！即将返回登录页面*";
       setTimeout( ()=>{
         this.$router.push('/IEducation/login');
       },3333);
     },
     registerFail(message)
     {
       this.tipsForRegister = "*注册失败！可能原因："+message+"*";
     },
     submitRegister()
     {
       this.tipsForRegister = '';
       this.registerConfirmDialog = false;
       let check = this.$refs.phone.isQualified();
       if( !check )
       {
         this.tipsForRegister = '*手机号码的输入不符合规范*';
       }
       else{
         check = this.$refs.password.isQualified();
         if(!check)
         {
           this.tipsForRegister = '*密码的输入不符合规范*'
         }
         else{
           if(this.$refs.password.groupValue != this.$refs.rpassword.groupValue)
           {
             this.tipsForRegister = '*两次密码输入不一致*'
           }
           else{
             check = this.$refs.username.isQualified();
             if(!check){
               this.tipsForRegister = '*用户名的输入不符合规范*'
             }
             else{
               let data = JSON.stringify({
                 id:0,
                 phone: this.$refs.phone.groupValue,
                 username: this.$refs.username.groupValue,
                 password: this.$refs.password.groupValue,
                 type:this.type,
                 mgPath:"/img/baseImg.jpg"
               })
               let config ={
                 url: '/newRegister',
                 method: 'POST',
                 data: data,
                 headers:{'Content-Type':'application/json;charset=UTF-8'}
               }
               request(config).then(res =>
               {
                 if(res.data.code == 200)
                 {
                   this.registerSuccess();
                 }
                 else{
                   this.registerFail(res.data.message);
                 }
               })
               console.log(data);
               console.log('done');
             }
           }
         }
       }
     },
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
.tips_register{
  font-size: 17px;
  margin-top: 2rem;
}
.tipState_unq
{
  color: #dc3545;
}
.tipState_pas
{
  color: #28a745;
}
</style>
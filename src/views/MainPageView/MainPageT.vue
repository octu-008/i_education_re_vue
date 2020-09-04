<template>
<!-- 教师用户主页，可以在此跳转到新增题目页面 -->
<ie-main-page-box>
  <h1 class="ml-2 my-2" slot="mainPageTitle">教师首页</h1>
  <div slot="mainPageContent">
    <ie-button buttonType="primary" :signal="toNewQuestion" @toNewQuestionSignal="toNQuestionPage">
      <label style="font-size: 23px">前往新增题目</label>
      <i class="ml-1 fa fa-arrow-circle-right" style="font-size: 20px"></i>
    </ie-button>
  </div>
</ie-main-page-box>
</template>
<script>
import IeMainPageBox from 'components/IeMainPageBox'
import IeButton from 'components/IeButton'
 export default {
   name: 'MainPageT',
   data() {
     return {
       toNewQuestion: 'toNewQuestionSignal',
     }
   },
   components:{
     IeMainPageBox,IeButton
   },
   methods: {
     //前往新增题目页面
     toNQuestionPage(){
       this.$router.push('/IEducation/newQuestion');
     }
   },
}
</script>
<style scoped>
@import url("https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css");
</style>
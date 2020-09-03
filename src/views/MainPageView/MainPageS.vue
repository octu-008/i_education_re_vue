<template>
<!-- 学生用户主页，可以在此跳转到练习参数设置页面 -->
<ie-main-page-box>
  <h1 class="ml-2 mt-2 mb-2" slot="mainPageTitle">首页</h1>
  <div slot="mainPageContent">
    <ie-button buttonType="primary" :signal="toPractice" @toPracticeSignal="toPracticePage">
      <label style="font-size: 23px">前往题目练习
        <i class="ml-1 fa fa-arrow-circle-right" style="font-size: 20px"></i>
      </label>
    </ie-button>
  </div>
</ie-main-page-box>
</template>
<script>
import IeMainPageBox from 'components/IeMainPageBox'
import IeButton from 'components/IeButton'
 export default {
   name: 'MainPageS',
   data() {
     return {
       toPractice: 'toPracticeSignal'
     }
   },
   components: {
     IeButton,IeMainPageBox
   },
   methods: {
     //前往练习参数设置页面
     toPracticePage()
     {
       this.$router.push('/IEducation/readyForPractive');
     }
   }
}
</script>
<style scoped>
@import url("https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css");
</style>
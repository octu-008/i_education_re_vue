<template>
<!-- 系统主视图 -->
<div>
  <!-- 导航栏 -->
  <ie-nav-bar navtittle="IEducation:RE"></ie-nav-bar>
  <!-- 路由视图 -->
  <router-view></router-view>
</div>
</template>
<script>
import IeNavBar from 'components/IeNavBar';
 export default {
   name: 'MainView',
   components:{
     IeNavBar
   }
}
</script>
<style scoped>
@import "~assets/css/base.css";
</style>
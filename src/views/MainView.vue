<template>
<div>
  <ie-nav-bar navtittle="IEducation:RE"></ie-nav-bar>
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
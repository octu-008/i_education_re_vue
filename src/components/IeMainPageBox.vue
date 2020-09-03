<template>
<!-- 基于BootstrapVue的自定义主页盒子 -->
<div class="my-2">
  <div class="row">
    <div class="main_form shadow border-bottom">
      <slot name="mainPageTitle"></slot>
      <ie-hr></ie-hr>
      <div class="ml-2 mr-2 mt-1 mb-1">
        <slot name="mainPageContent"></slot>
      </div>    
    </div>
  </div>
</div>
</template>
<script>
import IeHr from 'components/IeHr'
 export default {
   name: 'MainPageBox',
   components:{
     IeHr
   }
}
</script>
<style scoped>
.main_form{
  width: 90%;
  height: 400px;
  margin: 1rem 5%;
}
</style>
<template>
<div class="main_div">
  <register-box></register-box>
  <div class="pre_div"></div>
</div>
</template>
<script>
import RegisterBox from 'views/RegisterView/RegisterBox';
 export default {
   name: 'MainRegisterViews',
   components:{
     RegisterBox
   }
}
</script>
<style scoped>
.pre_div{
  -ms-flex-preferred-size:0;
  flex-basis: 0;
  -ms-flex-positive:1;
  flex-grow: 1;
  max-width: 100;
}
.main_div{
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: 5px;
  margin-left: 5px;
}
</style>
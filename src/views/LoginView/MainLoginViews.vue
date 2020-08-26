<template>
<div class="main_div">
  <div class="pre_div"></div>
  <login-box></login-box>
</div>
</template>
<script>
import LoginBox from './LoginBox'
 export default {
   name: 'MainLoginViews',
   components:{
     LoginBox
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
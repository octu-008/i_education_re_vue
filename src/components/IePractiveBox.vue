<template>
<div class="my-2 mx-5 px-5 bg-white border-bottom info_radius" :class="shadowType">
  <slot></slot>
</div>
</template>
<script>
 export default {
   name: 'IePractiveBox',
   props:{
     shadowType:{
       type: String,
       default: 'shadow'
     }
   }
}
</script>
<style scoped>
.info_radius{
  border-radius: 17px;
}
</style>
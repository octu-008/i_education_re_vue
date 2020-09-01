<template>
<div class="my-2" :class="colAttr">
  <div class="row">
    <div class="bg-dark text-center info_lab" :class="colChildAttr">
      <slot name="icon"></slot>
      <slot name="info"></slot>
    </div>
    <div class="text-center" :class="colChildAttr">
      <slot name="content"></slot>
    </div>
  </div>
</div>
</template>
<script>
 export default {
   name:'IeDouColorLabel',
   props:{
     colAttr:{
       type:String,
       default: 'col-4'
     },
     colChildAttr:{
       type:String,
       default: 'col-4'
     }
   }
}
</script>
<style scoped>
.info_lab
{
  border-radius: 23px;
}
</style>
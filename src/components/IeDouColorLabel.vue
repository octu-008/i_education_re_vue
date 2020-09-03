<template>
<!-- 基于BootStrap的自定义双色标签 -->
<div class="my-2" :class="colAttr">
  <div class="row">
<!-- 标签名称：亮色文字，暗色背景 -->
    <div class="bg-dark text-center info_lab" :class="colChildAttr">
      <!-- 标签名称的图标 -->
      <slot name="icon"></slot>
      <slot name="info"></slot>
    </div>
<!-- 标签内容：暗色文字，亮色背景 -->
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
     //自定义的列属性
     colAttr:{
       type:String,
       default: 'col-4'
     },
     //自定义的子列属性
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
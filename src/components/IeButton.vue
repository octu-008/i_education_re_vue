<template>
<!-- 基于BootstrapVue按钮组件的自定义按钮 -->
  <b-button @click="emitExecute" :variant="buttonType" style="margin: 0 0.3rem">
<!-- 按钮内容 -->
    <slot></slot>
  </b-button>
</template>
<script>
 export default {
   name: 'IeButton',
   props:{
     //设置按钮点击事件发射的信号
     signal: String,
     //选择按钮类型
     buttonType: String
   },
   methods:{
     //发射信号触发父组件事件
     emitExecute()
     {
       this.$emit(this.signal);
     }
   }
}
</script>
<style scoped>

</style>
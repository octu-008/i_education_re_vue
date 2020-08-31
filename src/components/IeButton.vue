<template>
  <b-button @click="emitExecute" :variant="buttonType" style="margin: 0 0.3rem">
    <slot></slot>
  </b-button>
</template>
<script>
 export default {
   name: 'IeButton',
   props:{
     //设置按钮点击事件发射的信号
     signal: String,
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
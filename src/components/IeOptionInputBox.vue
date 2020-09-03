<template>
<div class="form-group my-1">
  <div class="row">
    <div class="col-9">
      <slot name="options_content"></slot>
    </div>
    <div class="col-3 text-center">
      <slot name="options_answer"></slot>
    </div>
  </div>
</div>
</template>
<script>
 export default {
   name:'IeOptionInputBox',
}
</script>
<style scoped>

</style>
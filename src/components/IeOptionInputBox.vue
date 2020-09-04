<template>
<!-- 单选题和多选题的选项与答案选择列表 -->
<div class="form-group my-1 mx-3">
  <div class="row">
    <div class="col-9">
      <slot name="describe_option"></slot>
    </div>
    <div class="col-3 text-center">
      <slot name="describe_answer"></slot>
    </div>
  </div>
  <div class="row">
    <div class="col-9">
      <slot name="options_content_line1"></slot>
    </div>
    <div class="col-3 text-center">
      <slot name="options_answer_line1"></slot>
    </div>
  </div>
  <div class="row">
    <div class="col-9">
      <slot name="options_content_line2"></slot>
    </div>
    <div class="col-3 text-center">
      <slot name="options_answer_line2"></slot>
    </div>
  </div>
  <div class="row">
    <div class="col-9">
      <slot name="options_content_line3"></slot>
    </div>
    <div class="col-3 text-center">
      <slot name="options_answer_line3"></slot>
    </div>
  </div>
  <div class="row">
    <div class="col-9">
      <slot name="options_content_line4"></slot>
    </div>
    <div class="col-3 text-center">
      <slot name="options_answer_line4"></slot>
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
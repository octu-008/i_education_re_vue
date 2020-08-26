<template>
  <div class="item_edge" :style="groupMargin">
    <div class="form_label">
      <div class="packing">
<!--         图片插槽，25px X 25px -->
        <slot name="img"></slot>
      </div>
    </div>
    <input class="input_control" :type="groupType" :placeholder="groupPlaceholder" v-model="groupValue">
  </div>
</template>

<script>
export default {
  name: 'InputWithImg',
  props:{
    //组件的边距，默认无
    groupMargin: Object,
    //设置input标签的类型，默认为文本框
    groupType: {
      type: String ,
      default: 'text'
    },
    //设置input标签的占位符
    groupPlaceholder:
    {
      type: String, 
      default: '输入'
    },
  },
  data() {
    return {
      //input标签进行v-model绑定，父组件可以通过ref等手段获取（不能在computed中使用或在模板中直接使用）
      groupValue: ''
    }
  },
}
</script>

<style>
.item_edge{
  display: -ms-flexbox;
  display: flex;

  -ms-flex-direction: row;
  flex-direction: row;
}
.input_control
{
  display: block;
  width: 100%;
  height: calc(1.8rem + 1px);
  padding: 0.375rem 0.75rem;
  font-size: 1.1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem; 
}
.input_control:focus{
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
.packing{
  width: 25px;
  height: 25px;
  margin: 0 auto;
}
.form_label{
  padding-top: calc(0.375rem + 1px);
  padding-bottom: calc(0.375rem + 1px);
  margin-right: 15px;
  font-size: inherit;
  line-height: 1.5;
  text-align: center;
}
</style>
<template>
<div class="my-2 mx-5 px-5 bg-white border-bottom info_radius shadow">
  <h4 class="text-center text-dark">新增题目</h4>
  <ie-hr></ie-hr>
  <div class="question_new_form">
    <div class="form-group mx-3">
      <textarea class="form-control" rows="3" placeholder="题目描述"></textarea>
      <small class="form-text text_ori">*请选择题目类型</small>
    </div>
    <div class="form-group mx-3" >
      <b-select class="custom-select">
        <b-select-option value="0" selected>*请选择题目类型*</b-select-option>
        <b-select-option value="1">判断题</b-select-option>
        <b-select-option value="2">单选题</b-select-option>
        <b-select-option value="3">多选题</b-select-option>
      </b-select>
      <small id="selectQuestionHelpMessage" class="form-text text_ori">*请选择题目类型</small>
    </div>
    <ie-hr></ie-hr>
    <ie-option-input-box>
      <div slot="options_content">
        <small id="option_singleHelpMessage" class="form-text text_ori mb-2">*请填写单选选项（至少输入两项）</small>
        <b-input class="form-control my-1" type="text" placeholder="单选选项1"></b-input>
        <b-input class="form-control my-1" type="text" placeholder="单选选项2"></b-input>
        <b-input class="form-control my-1" type="text" placeholder="单选选项3"></b-input>
        <b-input class="form-control my-1" type="text" placeholder="单选选项4"></b-input>
      </div>
      <div slot="options_answer">
        <small class="form-text text_ori">*请设置一个选项作为该单选题答案</small>
        <b-form-group>
          <b-form-radio class="my-3" value="1">设为答案</b-form-radio>
          <b-form-radio class="my-3" value="2">设为答案</b-form-radio>
          <b-form-radio class="my-3" value="3">设为答案</b-form-radio>
          <b-form-radio class="my-3" value="4">设为答案</b-form-radio>
        </b-form-group>
      </div>
    </ie-option-input-box>

  </div>
  </div>
</template>
<script>
import IeHr from 'components/IeHr';
import IeOptionInputBox from 'components/IeOptionInputBox'
 export default {
   name: 'MainNQuestion',
   components:{
     IeHr,IeOptionInputBox
   }
}
</script>
<style scoped>
.question_new_form
{
  padding: 0% 20%;

}
.text_ori
{
  color: #6c757d;
}
</style>
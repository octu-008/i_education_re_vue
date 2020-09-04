<template>
<!-- 自定义的仿按钮选项 -->
<div class="border-bottom shadow-sm option_div" :class="colType" 
:style="options_state" @mouseenter="reverseColor" @mouseleave="reverseColor" @click="reverseCheck">
  <label class="question_option">{{optionContent}}</label>
  <i class="fa float_mark" :class="iconActive" style="font-size: 1.7rem"></i>
</div>
</template>
<script>
 export default {
   name:'IeOptionBox',
   props:{
     //选项的列占比
     colType:{
       type: String,
       default: 'col-6'
     },
     //选项内容
     optionContent:String,
     //触发父组件事件使用的信号
     signal: String
   },
   data() {
     return {
       //选项静止状态
       //字体颜色：暗色 背景颜色：亮色
       options_state:{
         'color': '#343a40',
         'background-color': '#fff'
       },
       //选项图标静止状态
       //图标：问号（来自fontawesome） 旋转：不旋转
       iconState:{
         baseState: 'fa-question-circle',
         spin: ''
       },
       //该选项是否被选择
       optionCheck: false,
       //题目是否已被提交
       afterCommit: false
     }
   },
   computed:{
     //图标实际赋予的样式
     iconActive()
     {
       return this.iconState.baseState + " " + this.iconState.spin;
     }
   },
   methods: {
     //鼠标移入/移出事件，反转字体和背景颜色，问号图标旋转
     reverseColor()
     {
       //只有在该选项没有被选择或题目未提交时可以触发
       if((!this.optionCheck) && (!this.afterCommit))
       {
       let temp = this.options_state['color'];
       this.options_state['color'] = this.options_state['background-color'];
       this.options_state['background-color'] = temp;
       this.iconState.spin = (this.iconState.spin == 'fa-spin') ? '' : 'fa-spin';
       }
     },
     //鼠标单击事件，改变当前选项为选择/未选择状态
     //字体变为亮色，背景为绿色，图标变为不选择的勾号
     reverseCheck()
     {
       //只有在题目未提交时可以触发
       if((!this.afterCommit))
       {
         this.optionCheck = (this.optionCheck) ? false : true;
         this.options_state['color'] = '#fff';
         this.options_state['background-color'] = (this.optionCheck) ? '#28a745' : '#343a40';
         this.iconState.baseState = (this.optionCheck) ? 'fa-check-circle' : 'fa-question-circle';
         this.iconState.spin = (this.optionCheck) ? '' : 'fa-spin';
         //会触发父组件设定的相关事件
         this.$emit(this.signal);
       }
     },
     //父组件调用，当题目为单选题或判断题时，若在选择了该选项的状态下，
     //选择了非该选项的其他选项，该选项会自动变为未选择状态
     reverseByFa()
     {
       if(this.optionCheck && (!this.afterCommit))
       {
         this.optionCheck = false;
         this.options_state['color'] = '#343a40';
         this.options_state['background-color'] = '#fff';
         this.iconState.baseState = 'fa-question-circle';
         this.iconState.spin = '';
       }
     },
     //题目被提交，根据父组件的相关判定，改变该选项的样式
     //若该选项为错误选项，样式变为字体亮色，背景红色，图标变为不旋转的叉号
     //若该选项为正确选项，样式变为字体亮色，背景红色，图标变为不旋转的勾号
     //若该选项没有被选择，也不是错误或正确选项，样式保持字体暗色，背景亮色，去除图标
     //同时，选项不再能够触发鼠标进入/移除和鼠标点击事件
     practiveCommit(type)
     {
       this.afterCommit = true;
       if(type == 'error')
       {
         this.options_state['color'] = '#fff';
         this.options_state['background-color'] = '#dc3545';
         this.iconState.baseState = 'fa-times-circle';
         this.iconState.spin = '';
       }
       else if(type == 'answer')
       {
         this.options_state['color'] = '#fff';
         this.options_state['background-color'] = '#28a745';
         this.iconState.baseState = 'fa-check-circle';
         this.iconState.spin = '';
       }
       else{
         this.iconState.baseState = '';
         this.iconState.spin = '';
       }
     }
   },
}
</script>
<style scoped>
.option_div{
  border-radius: 7px
}
.question_option
{
  margin-top: 0.5rem;
  font-size: 1.3rem;
  float: left;
}
.float_mark
{
  margin-top: 0.5rem;
  float: right;
}
</style>
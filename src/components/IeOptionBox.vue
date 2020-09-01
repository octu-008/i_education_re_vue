<template>
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
     colType:{
       type: String,
       default: 'col-6'
     },
     optionContent:String,
     signal: String
   },
   data() {
     return {
       options_state:{
         'color': '#343a40',
         'background-color': '#fff'
       },
       iconState:{
         baseState: 'fa-question-circle',
         spin: ''
       },
       optionCheck : false
     }
   },
   computed:{
     iconActive()
     {
       return this.iconState.baseState + " " + this.iconState.spin;
     }
   },
   methods: {
     reverseColor()
     {
       if(!this.optionCheck)
       {
       let temp = this.options_state['color'];
       this.options_state['color'] = this.options_state['background-color'];
       this.options_state['background-color'] = temp;
       this.iconState.spin = (this.iconState.spin == 'fa-spin') ? '' : 'fa-spin';
       }
     },
     reverseCheck()
     {
       this.optionCheck = (this.optionCheck) ? false : true;
       this.options_state['color'] = '#fff';
       this.options_state['background-color'] = (this.optionCheck) ? '#28a745' : '#343a40';
       this.iconState.baseState = (this.optionCheck) ? 'fa-check-circle' : 'fa-question-circle';
       this.iconState.spin = (this.optionCheck) ? '' : 'fa-spin';
       this.$emit(this.signal);
     },
     reverseByFa()
     {
       if(this.optionCheck)
       {
         this.optionCheck = false;
         this.options_state['color'] = '#343a40';
         this.options_state['background-color'] = '#fff';
         this.iconState.baseState = 'fa-question-circle';
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
<template>
<ie-practive-box shadowType="shadow">
  <div class="row mt-2">
    <label class="question_tittle_text">{{questionTitle}}</label>
  </div>
  <div class="row my-1 question_statement">
    <label>{{question.statement}}</label>
  </div>
  <div class="row mt-1 mb-2 option_line_1">
    <ie-option-box ref="options1" :signal="ieOptionClick" :optionContent="eachOption[0]" @ieOptionClickSignal="optionClick(0)"></ie-option-box>
    <ie-option-box ref="options2" :signal="ieOptionClick" :optionContent="eachOption[1]" @ieOptionClickSignal="optionClick(1)"></ie-option-box>
  </div>
  <div class="row mt-1 mb-2 option_line_2" v-if="eachOption.length > 2 ">
    <ie-option-box ref="options3" :signal="ieOptionClick" :optionContent="eachOption[2]" @ieOptionClickSignal="optionClick(2)"></ie-option-box>
    <ie-option-box ref="options4" :signal="ieOptionClick" v-if="eachOption.length > 3 " :optionContent="eachOption[3]" @ieOptionClickSignal="optionClick(3)"></ie-option-box>
  </div>
</ie-practive-box>
</template>
<script>
import IePractiveBox from 'components/IePractiveBox'
import IeOptionBox from 'components/IeOptionBox'
 export default {
   name: 'IeQuestionBox',
   data() {
     return {
       ieOptionClick: 'ieOptionClickSignal'
     }
   },
   props:{
     number: Number,
     question:{
       type:Object,
       default: () =>{
         return {
           id: '-1',
           statement: '默认描述',
           exstate: '无',
           type: '默认类型',
           options: '默认选项',
           answer: '默认答案',
           course: '默认课程'
         }
       }
     }
   },
   methods:{
     optionClick(option)
     {
       console.log(this.question.type);
       if(this.question.type == '判断题')
       {
         return this.judgeOptionEvent(option);
       }
       else if(this.question.type == '单选题')
       {
         return this.singleOptionEvent(option);
       }
       else
       {
         return this.multipleOptionEvent(option);
       }
     },
     judgeOptionEvent(option)
     {
       if(option == 0 && (this.$refs.options2.optionCheck))
       {
         this.$refs.options2.reverseByFa();
       }
       else if( option == 1 && (this.$refs.options1.optionCheck))
       {
         this.$refs.options1.reverseByFa();
       }
     },
     singleOptionEvent(option)
     {
       const soa = this.singleOptionsArray;
       for(let i=0 ;i<soa.length; i++)
       {
         if(i != option)
         {
           soa[i].reverseByFa();
         }
       }
     },
     // eslint-disable-next-line no-unused-vars
     multipleOptionEvent(option){}
   },
   computed:{
     questionTitle()
     {
       return '题目'+(this.number+1)+"-"+this.question.type;
     },
     eachOption()
     {
       return this.question.options.split(",");
     },
     singleOptionsArray()
     {
       const options = new Array();
       options.push(this.$refs.options1);
       options.push(this.$refs.options2);
       options.push(this.$refs.options3);
       if(this.eachOption.length >3)
       {
         options.push(this.$refs.options4);
       }
       return options;
     }
   },
   components:{
     IePractiveBox,IeOptionBox
   }
}
</script>
<style scoped>
@import url("https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css");
.question_tittle_text
{
    font-size:19px;
    background-color: #343a40;
    color: #fff;
    border-radius: 7px;
    padding: 0px 7px;
}
.question_statement
{
    font-size: 20px;
    padding: 0% 10%
}
.option_line_1 
{
  padding: 0% 10%;
}
.option_line_2
{
  padding: 0% 10%;
}
</style>
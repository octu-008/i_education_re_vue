<template>
<!-- 自定义的多类型题目组件 -->
<ie-practive-box shadowType="shadow">
  <div class="row mt-2">
    <!-- 题目标题 -->
    <label class="question_tittle_text">{{questionTitle}}</label>
  </div>
  <div class="row my-1 question_statement">
    <!-- 题目描述 -->
    <label>{{question.statement}}</label>
  </div>
  <div class="row mt-1 mb-2 answer_line" v-if="questionCommit">
    <div class="col-6">
      <label :class="userSelected" style="font-size: 17px">您的选择：{{userSelectedOption}}</label>
    </div>
    <div class="col-6">
      <label class="tipState_pas" style="font-size: 17px">正确答案：{{questionAnswer}}</label>
    </div>
  </div>
  <!-- 题目选项 -->
  <!-- 由需求分析的定义，判断题至少有两个选项，单选题和多选题至少有三个选项 -->
  <div class="row mt-1 mb-2 option_line_1">
    <ie-option-box ref="options1" :signal="ieOptionClick" :optionContent="eachOption[0]" @ieOptionClickSignal="optionClick(0)"></ie-option-box>
    <ie-option-box ref="options2" :signal="ieOptionClick" :optionContent="eachOption[1]" @ieOptionClickSignal="optionClick(1)"></ie-option-box>
  </div>
  <!-- 当题目为单选题或多选题时，按照选项数量增加选项内容 -->
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
       //自定义-选项点击时发送的信号
       ieOptionClick: 'ieOptionClickSignal',
       //题目是否正确
       ieOptionCheck: false,
       //用户选择内容样式
       userSelected: 'tipState_pas',
       //用户选择的选项内容
       userSelectedOption: '',
       //判断练习是否已经提交
       questionCommit: false 
     }
   },
   props:{
     //题目顺序编号
     number: Number,
     //来自服务端的题目数据
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
     //根据题目类型触发的点击事件
     optionClick(option)
     {
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
     //根据题目类型自动判断答案
     compareQuestion()
     {
       if(this.question.type == '判断题')
       {
         return this.compareJudgeAnswer();
       }
       else if(this.question.type == '单选题')
       {
         return this.compareSingleAnswer();
       }
       else
       {
         return this.compareMultipleAnswer();
       }
     },
     //判断题的点击事件
      //若选择一个未选中的选项时，另一个选项为已选中的状态，取消这个已选中选项的选中状态
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
     //单选题的点击事件
     //若若选择一个未选中的选项时，有其他选项为已选中的状态，取消这个已选中选项的选中状态
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
     //多选题点击事件
     //多选题可以选择复数的选项，不触发事件
     // eslint-disable-next-line no-unused-vars
     multipleOptionEvent(option){
     },
     //自动判卷-判断题
     compareJudgeAnswer()
     {
       //选择第一个选项
       if(this.$refs.options1.optionCheck)
       {
         //检测选项是否正确
         this.userSelectedOption = this.eachOption[0];
         this.ieOptionCheck = this.compareAnswer(1);
         if(this.ieOptionCheck)
         {
           //选择正确，改变选项样式
           this.$refs.options1.practiveCommit('answer');
           this.$refs.options2.practiveCommit('normal');
         }
         else{
           //选择错误，改变选项样式
           this.$refs.options1.practiveCommit('error');
           this.$refs.options2.practiveCommit('answer');
           this.userSelected = 'tipState_unq';
         }
       }
       //选择第二个选项
       else if(this.$refs.options2.optionCheck)
       {
         //检测选项是否正确
         this.userSelectedOption = this.eachOption[1];
         this.ieOptionCheck = this.compareAnswer(2);
         if(this.ieOptionCheck)
         {
           //选择正确，改变选项样式
           this.$refs.options2.practiveCommit('answer');
           this.$refs.options1.practiveCommit('normal');
         }
         else{
           //选择错误，改变选项样式
           this.$refs.options2.practiveCommit('error');
           this.$refs.options1.practiveCommit('answer');
           this.userSelected = 'tipState_unq';
         }
       }
       this.questionCommit = true;
     },
     //自动判卷-单选题
     compareSingleAnswer()
     {
       //获得单选题所有选项的组件
       const soa = this.singleOptionsArray;
       //选项编号
       let optionChoice = -1;
       //检查哪个选项为选中状态
       for(let i = 0; i<soa.length ;i++)
       {
         if(soa[i].optionCheck)
         {
           //选中状态的选项是否为正确选项
           this.ieOptionCheck = this.compareAnswer(i+1);
           this.userSelectedOption = this.eachOption[i];
           //选中状态的选项的编号
           optionChoice = i+1;
           if(this.ieOptionCheck)
           {
             //选择正确，改变选项样式
             soa[i].practiveCommit('answer');
           }
           else{
             //选择错误，改变选项样式
             soa[i].practiveCommit('error');
             this.userSelected = 'tipState_unq';
           }
         }
       }
       //改变未选择的选项的样式
       for(let i=0 ; i<soa.length ; i++)
       {
         if(i != (optionChoice-1))
         {
           if(this.compareAnswer(i+1))
           {
             //未选择的选项为正确答案，样式改变为答案样式
             soa[i].practiveCommit('answer');
           }
           else{
             //未选择的选项为错误答案，样式改变为普通样式
             soa[i].practiveCommit('normal');
            }
          }
        }
        this.questionCommit = true;
     },
     //自动判卷-多选题
     compareMultipleAnswer()
     {
       //获得多选题所有选项的组件
       const moa = this.multipleOptionsArray;
       //获得选中的选项数组
       let optionChoice = new Array();
       for(let i = 0; i<moa.length; i++)
       {
         if(moa[i].optionCheck)
         {
           optionChoice.push(i+1);
         }
       }
       //将选项数组组合为字符串
       let oChoiceStr = optionChoice.join(",");

       let useroptionArr = new Array();
       for(let i = 0 ; i<optionChoice.length ; i++)
       {
         useroptionArr.push(this.eachOption[(optionChoice[i]-1)]);
       }
       this.userSelectedOption = useroptionArr.join(',');
       //对比答案
       this.ieOptionCheck = this.compareAnswer(oChoiceStr);
       if(this.ieOptionCheck){
         //答案正确，改变样式
         for(let i=0 ; i<moa.length ; i++)
         {
           if(optionChoice.indexOf(i+1) != -1)
           {
             moa[i].practiveCommit('answer');
           }
           else{
             moa[i].practiveCommit('normal');
           }
         }
       }
       //答案错误（即使是只选择了一个对的选项），改变样式
       else{
         let answerArray = this.question.answer.split(",");
         for(let i = 0; i < answerArray.length ; i++){
           moa[(answerArray[i]-1)].practiveCommit('answer');
         }
         let errorArray = optionChoice.filter((choice) =>{
           return answerArray.indexOf(choice.toString()) == -1 ? choice : null; 
         });
         for(let i = 0; i<errorArray.length ; i++)
         {
           moa[(errorArray[i]-1)].practiveCommit('error');
         }
         this.userSelected = 'tipState_unq';
       }
       this.questionCommit = true;
     },
     //对比用户选择与题目答案
     compareAnswer(option)
     {
       return (option == this.question.answer);
     }
   },
   computed:{
     //题目标题
     questionTitle()
     {
       return '题目'+(this.number+1)+"-"+this.question.type;
     },
     //每个题目的选项
     eachOption()
     {
       return this.question.options.split(",");
     },
     //单选题的所有选项组件
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
     },
     //多选题的所有选项组件
     multipleOptionsArray()
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
     },
     //用户选择的选项内容
     optionSelected()
     {
       let msg = '';
       if(this.eachOption.length == 3 && (this.question.type == '单选题' || this.question.type == '多选题'))
       {
         if(this.$refs.options1.optionCheck || this.$refs.options2.optionCheck || this.$refs.options3.optionCheck)
         {
           msg = 'selected';
         }
         else
         {
           msg = this.questionTitle;
         }
       }
       else if(this.eachOption.length == 4 && (this.question.type == '单选题' || this.question.type == '多选题'))
       {
         if(this.$refs.options1.optionCheck || this.$refs.options2.optionCheck 
         || this.$refs.options3.optionCheck || this.$refs.options4.optionCheck)
         {
           msg = 'selected';
         }
         else{
           msg = this.questionTitle
         }
       }
       else if(this.question.type == '判断题')
       {
         if(this.$refs.options1.optionCheck || this.$refs.options2.optionCheck)
         {
           msg = 'selected';
         }
         else{
           msg = this.questionTitle;
         }
       }
       return msg;
     },
     //题目的答案
     questionAnswer()
     {
       if(this.question.type != '多选题')
       {
         return this.eachOption[(this.question.answer-1)];
       }
       else{
         let anArr = this.question.answer.split(',');
         let anopArr = new Array();
         for(let i=0 ; i<anArr.length;i++)
         {
           anopArr.push(this.eachOption[(anArr[i]-1)]);
         }
         return anopArr.join(',');
       }
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
.answer_line
{
  padding: 0% 20%
}
.tipState_unq
{
  color: #dc3545;
}
.tipState_pas
{
  color: #28a745;
}
</style>
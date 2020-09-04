<template>
<!-- 新增题目页面 -->
<div class="my-2 mx-5 px-5 bg-white border-bottom info_radius shadow">
  <h4 class="text-center text-dark">新增题目</h4>
  <ie-hr></ie-hr>
  <div class="question_new_form">
      <!-- 输入题目描述 -->
    <div class="form-group mx-3">
      <b-form-textarea rows="3" max-rows="6" placeholder="题目描述" v-model="qState">
      </b-form-textarea>
      <small class="form-text text_ori">*请输入题目的描述</small>
    </div>
    <!-- 选择新增题目的类型，根据选择类型的不同，需要输入的选项内容表单会不一样 -->
    <div class="form-group mx-3">
      <b-select v-model="qType" :options="questionType">
      </b-select>
      <small id="selectQuestionHelpMessage" class="form-text text_ori">*请选择题目类型</small>
    </div>
    <ie-hr></ie-hr>
    <!-- 当新增题目类型为判断题时，只需要选择该题目的正确答案即可 -->
    <div class="form-group mx-3" v-if = "qType == '1'">
      <small class="form-text text_ori">*请设置一个选项作为该判断题的答案</small>
      <b-form-group>
        <b-form-radio v-model="judgeAnswer" value="1">是</b-form-radio>
        <b-form-radio v-model="judgeAnswer" value="2">否</b-form-radio>
      </b-form-group>
    </div>
    <!-- 当新增题目类型为单选题时，需要输入至少两个选项内容，并且选择其中一个选项作为答案 -->
    <ie-option-input-box v-else-if = "qType == '2'">
      <small class="form-text text_ori mb-2" slot="describe_option">*请填写单选选项（至少输入两项）</small>
      <!-- 选项内容输入框 -->
      <b-input class="form-control my-2" type="text" placeholder="单选选项1"
         v-model="singleOptions.options1" slot="options_content_line1">
      </b-input>
      <b-input class="form-control my-2" type="text" placeholder="单选选项2" 
        v-model="singleOptions.options2" slot="options_content_line2">
      </b-input>
      <b-input class="form-control my-2" type="text" placeholder="单选选项3"
         v-model="singleOptions.options3" slot="options_content_line3">
      </b-input>
      <b-input class="form-control my-2" type="text" placeholder="单选选项4" 
        v-model="singleOptions.options4" slot="options_content_line4">
      </b-input>
      <!-- 题目答案单选按钮，与同行的选项内容绑定 -->
      <small class="form-text text_ori" slot="describe_answer">*请设置一个选项作为答案</small>
      <b-form-radio class="my-3" value="1" v-model="singleAnswer" slot="options_answer_line1">设为答案</b-form-radio>
      <b-form-radio class="my-3" value="2" v-model="singleAnswer" slot="options_answer_line2">设为答案</b-form-radio>
      <b-form-radio class="my-3" value="3" v-model="singleAnswer" slot="options_answer_line3" :disabled="singleOptions.options3.length <= 0">设为答案</b-form-radio>
      <b-form-radio class="my-3" value="4" v-model="singleAnswer" slot="options_answer_line4" :disabled="singleOptions.options4.length <= 0">设为答案</b-form-radio>
    </ie-option-input-box>
    <!-- 当新增题目类型为多选题时，需要输入至少三个选项内容，并且选择其中二个作为答案 -->
    <ie-option-input-box v-else-if = "qType == '3'">
      <small id="option_singleHelpMessage" class="form-text text_ori mb-2" slot="describe_option">*请填写多选选项（至少输入三项）</small>
      <!-- 选项内容输入框 -->
      <b-input class="form-control my-2" type="text" v-model="multiOptions.options1" placeholder="多选选项1" slot="options_content_line1"></b-input>
      <b-input class="form-control my-2" type="text" v-model="multiOptions.options2" placeholder="多选选项2" slot="options_content_line2"></b-input>
      <b-input class="form-control my-2" type="text" v-model="multiOptions.options3" placeholder="多选选项3" slot="options_content_line3"></b-input>
      <b-input class="form-control my-2" type="text" v-model="multiOptions.options4" placeholder="多选选项4" slot="options_content_line4"></b-input>
      <small id="option_singleHelpMessage" class="form-text text_ori mb-2" slot="describe_answer">*请设置至少两个选项作为答案</small>
      <!-- 题目答案多选选择框，与同行的选项内容绑定 -->
      <b-form-checkbox class="my-3" value="1" slot="options_answer_line1" v-model="multiAnswers">设为答案</b-form-checkbox>
      <b-form-checkbox class="my-3" value="2" slot="options_answer_line2" v-model="multiAnswers">设为答案</b-form-checkbox>
      <b-form-checkbox class="my-3" value="3" slot="options_answer_line3" v-model="multiAnswers">设为答案</b-form-checkbox>
      <b-form-checkbox class="my-3" value="4" slot="options_answer_line4" v-model="multiAnswers" :disabled="multiOptions.options4.length <=0">设为答案</b-form-checkbox>
    </ie-option-input-box>
    <!-- 选择新增题目所属的课程 -->
    <div class="form-group mx-3">
      <small class="form-text text_ori">*请选择题目所属课程</small>
      <b-select v-model="qCourse" :options="questionCourse"></b-select>
    </div>
    <ie-hr></ie-hr>
    <!-- 点击触发新增题目确认弹窗 -->
    <div class="text-center my-3">
      <ie-button buttonType="primary" :signal="submitNewQuestion" @submitnewquestionsignal="submitNQuestion">
        新增题目
      </ie-button>
    </div>
  </div>
  <!-- 新增题目成功提示 -->
  <b-modal hide-footer v-model="requestCommited">
    <div class="text-center" style="font-size: 23px">{{requestCommitedTips}}</div>
  </b-modal>
    <!-- 新增题目信息确认弹窗 -->
  <b-modal hide-footer title="题目信息确认" v-model="confirmModal" :no-close-on-backdrop="modalBackDrop">
    <!-- 当新增题目信息已填写完成，在弹窗中展示信息以便用户能够再次确认 -->
    <div class="text-center" v-if="infoComplete">
      <div class="row my-4">
        <div class="col text-left">题目描述：</div>
      </div>
      <div class="row my-4">
        <div class="col text-left">{{qState}}</div>
      </div>
      <div class="row my-4">
        <div class="col-4 text-left">题目类型：</div>
        <div class="col-8 text-left">{{confirmqType}}</div>
      </div>
      <div class="row my-4">
        <div class="col-4 text-left">题目选项：</div>
        <div class="col-8 text-left" v-if="qType == '1'">
          <label :class="confirmOptionStyle.options1">是</label><br>
          <label :class="confirmOptionStyle.options2">否</label>
        </div>
        <div class="col-8 text-left" v-else-if="qType == '2'">
          <label :class="confirmOptionStyle.options1">{{singleOptions.options1}}</label><br>
          <label :class="confirmOptionStyle.options2">{{singleOptions.options2}}</label><br>
          <label :class="confirmOptionStyle.options3">{{singleOptions.options3}}</label><br>
          <label :class="confirmOptionStyle.options4">{{singleOptions.options4}}</label>
        </div>
        <div class="col-8 text-left" v-else-if="qType == '3'">
          <label :class="confirmOptionStyle.options1">{{multiOptions.options1}}</label><br>
          <label :class="confirmOptionStyle.options2">{{multiOptions.options2}}</label><br>
          <label :class="confirmOptionStyle.options3">{{multiOptions.options3}}</label><br>
          <label :class="confirmOptionStyle.options4">{{multiOptions.options4}}</label>
        </div>
      </div>
      <div class="row my-4">
        <div class="col-4 text-left">所属课程代码：</div>
        <div class="col-8 text-left">{{qCourse}}</div>
      </div>
    </div>
    <!-- 当信息未填写完成或有不符合规范的输入，将会进行以下文字提示 -->
    <div class="text-center" v-else>
      <label class="unqualified" style="font-size: 25px">*题目信息仍未填写完成*</label>
    </div>
    <ie-hr></ie-hr>
    <div class="text-right">
      <b-button variant="outline-danger" @click="confirmModal = false" style="font-size:23px">
        等等，未确认
      </b-button>
      <ie-button buttonType="primary" :signal="confirmNQuestion" @confirmnquestionsignal="submitConfirm"
      style="font-size: 23px" :disabled="disabledConfirm">
      是的，已确认
      </ie-button>
    </div>
  </b-modal>
  </div>
</template>
<script>
import IeHr from 'components/IeHr';
import IeOptionInputBox from 'components/IeOptionInputBox';
import IeButton from 'components/IeButton';
import request from 'network/request';
 export default {
   name: 'MainNQuestion',
   data() {
     return {
       //题目描述
       qState: '',
       //题目类型
       qType: '0',
       //判断题答案
       judgeAnswer: '1',
       //单选题选项内容
       singleOptions: {
         options1: '',
         options2: '',
         options3: '',
         options4: '',
       },
       //单选题答案
       singleAnswer: '1',
       //多选题答案
       multiAnswers: [],
       //多选题内容
       multiOptions:{
         options1: '',
         options2: '',
         options3: '',
         options4: '',
       },
       //题目类型选型
       questionType: [
         {value: '0' , text: '*请选择题目类型*'},
         {value: '1' , text: '判断题'},
         {value: '2' , text: '单选题'},
         {value: '3' , text: '多选题'},
       ],
       //课程代号
       qCourse: 0,
       //题目课程选项
       questionCourse: [
         {value: 0 , text:'*请选择题目类型*'}
       ],
       //提交新增题目信号
       submitNewQuestion: 'submitnewquestionsignal',
       //确认提交新增题目信号
       confirmNQuestion: 'confirmnquestionsignal',
       //确认信息弹窗
       confirmModal: false,
       //设置弹窗不能点击弹窗以外的区域隐藏弹窗
       modalBackDrop: true,
       //确认提交新增题目请求按钮无效化
       disabledConfirm: true,
       //新增题目信息是否输入完成
       infoComplete: false,
       //确认信息中选项内容的样式，
       //作为答案的选项字体颜色会变为#31B673，绿色
       confirmOptionStyle:{
         options1: 'text_black',
         options2: 'text_black',
         options3: 'text_black',
         options4: 'text_black',
       },
       //请求新增题目是否已经完成
       requestCommited: false,
       //新增题目成功后的提示
       requestCommitedTips: '*新增题目成功！*'
     }
   },
   computed: {
     //选择新增题目类型
     confirmqType(){
       if(this.qType == '1'){
         return '判断题';
       }
       else if(this.qType == '2'){
         return '单选题';
       }
       else if(this.qType == '3'){
         return '多选题';
       }
       else{
         return '';
       }
     }
   },
   watch: {
     //当新增题目类型发送改变时，清除当前已输入的内容
     qType: function(to,from){
       if(from == 1)
       {
         this.judgeAnswer = '1';
       }
       else if(from == 2)
       {
         this.singleOptions.options1 = '';
         this.singleOptions.options2 = '';
         this.singleOptions.options3 = '';
         this.singleOptions.options4 = '';
         this.singleAnswer = '1';
       }
       else if(from == 3)
       {
         this.multiOptions.options1 = '';
         this.multiOptions.options2 = '';
         this.multiOptions.options3 = '';
         this.multiOptions.options4 = '';
         this.multiAnswers = [];
       }
     },
   },
   components:{
     IeHr,IeOptionInputBox,IeButton
   },
   methods: {
     //提交新增题目信息，触发弹窗
     submitNQuestion(){
       this.confirmModal = true ;
       //若题目描述，题目类型或题目所属课程其中一项未填写或未选择，会提示输入尚未完成
       if(this.qState == '' || this.qType == '0' || this.qCourse == 0)
       {
         this.infoComplete = false;
       }
       else{
         //判断题信息展示
         if(this.qType == 1){
          this.infoComplete = true;
          if(this.judgeAnswer == '1')
          {
            this.confirmOptionStyle.options1 = 'text_answer';
            this.confirmOptionStyle.options2 = 'text_black';
          }
          else{
            this.confirmOptionStyle.options1 = 'text_black';
            this.confirmOptionStyle.options2 = 'text_answer';
          }
          this.disabledConfirm = false;
         }
         //单选题信息展示
         else if(this.qType == 2){
           if(this.singleOptions.options1.length <= 0 || this.singleOptions.options2.length <= 0){
             this.infoComplete = false;
           }
           else{
             this.infoComplete = true;
             if(this.singleAnswer == '1'){
               this.confirmOptionStyle.options1 = 'text_answer';
               this.confirmOptionStyle.options2 = 'text_black';
               this.confirmOptionStyle.options3 = 'text_black';
               this.confirmOptionStyle.options4 = 'text_black';
             }
             else if(this.singleAnswer == '2'){
               this.confirmOptionStyle.options1 = 'text_black';
               this.confirmOptionStyle.options2 = 'text_answer';
               this.confirmOptionStyle.options3 = 'text_black';
               this.confirmOptionStyle.options4 = 'text_black'; 
             }
             else if(this.singleAnswer == '3'){
               this.confirmOptionStyle.options1 = 'text_black';
               this.confirmOptionStyle.options2 = 'text_black';
               this.confirmOptionStyle.options3 = 'text_answer';
               this.confirmOptionStyle.options4 = 'text_black'; 
             }
             else {
               this.confirmOptionStyle.options1 = 'text_black';
               this.confirmOptionStyle.options2 = 'text_black';
               this.confirmOptionStyle.options3 = 'text_black';
               this.confirmOptionStyle.options4 = 'text_answer';  
             }
             this.disabledConfirm = false;
           }
         }
         //多选题信息展示
         else if(this.qType == 3){
           if(this.multiOptions.options1.length <=0 || this.multiOptions.options2.length <= 0 ||
           this.multiOptions.options3.length <=0){
             this.infoComplete = false;
           }
           else{
             if(this.multiAnswers.length <=1){
               this.infoComplete = false;
             }
             else{
               this.infoComplete = true;
               for(let i=0;i<this.multiAnswers.length;i++){
                 if(this.multiAnswers[i] == '1'){
                   this.confirmOptionStyle.options1 = 'text_answer';
                 }
                 else if (this.multiAnswers[i] == '2'){
                   this.confirmOptionStyle.options2 = 'text_answer';
                 }
                 else if(this.multiAnswers[i] == '3'){
                   this.confirmOptionStyle.options3 = 'text_answer';
                 }
                 else if(this.multiAnswers[i] == '4'){
                   this.confirmOptionStyle.options4 = 'text_answer';
                 }
               }
               let notAnswer = ['1','2','3','4'].filter((num) => {
                 return this.multiAnswers.indexOf(num) == -1 ? num : null;
               });
               for(let i=0 ;i<notAnswer.length;i++){
                 if(notAnswer[i] == '1'){
                   this.confirmOptionStyle.options1 = 'text_black';
                 }
                 else if (notAnswer[i] == '2'){
                   this.confirmOptionStyle.options2 = 'text_black';
                 }
                 else if(notAnswer[i] == '3'){
                   this.confirmOptionStyle.options3 = 'text_black';
                 }
                 else if(notAnswer[i] == '4'){
                   this.confirmOptionStyle.options4 = 'text_black';
                 }
               }
               this.disabledConfirm = false;
             }
           }
         }
       }
     },
     //向服务端发送新增题目请求
     submitConfirm(){
       this.confirmModal = false;
       let type = '';
       let options = '';
       let answer = '';
       //根据题目类型，获得新增题目的类型，选项内容和答案三种信息
       if(this.qType == '1')
       {
         type = '判断题';
         options = '是,否';
         answer = this.judgeAnswer;
       }
       else if(this.qType == '2')
       {
         type = '单选题';
         options = this.singleOptions.options1+','+this.singleOptions.options2;
         if(this.singleOptions.options3.length > 0){
           options += (','+this.singleOptions.options3);
         }
         if(this.singleOptions.options4.length >0){
           options += (','+this.singleOptions.options4);
         }
         answer = this.singleAnswer;
       }
       else if(this.qType == '3'){
         type = '多选题';
         options = this.multiOptions.options1+','+this.multiOptions.options2+','+this.multiOptions.options3;
         if(this.multiOptions.options4.length >0){
           options += (','+this.multiOptions.options4);
         }
         answer = this.multiAnswers;
       }
       //将完整的题目信息封装为json数据
       let data = JSON.stringify({
         id: 0,
         statement: this.qState,
         exState: '无',
         type: type,
         options: options,
         answer: answer,
         course: this.qCourse
       });
       //设置请求配置
       let config ={
         url:'user/newQuestion',
         method: 'POST',
         data: data,
         headers:{'Content-Type':'application/json;charset=UTF-8'},
       }
       //发送请求
       request(config).then(res =>{
         if(res.data.code == 200){
           //新增题目成功
           //重置已输入的题目信息内容
           //并弹出提示弹窗
           this.resetContent();
           this.requestCommited = true;
         }
       });
     },
     resetContent(){
       //重置输入信息
       this.qState = '';
       this.qType = '0';
       this.judgeAnswer = '1';
       this.singleOptions.options1 = '';
       this.singleOptions.options2 = '';
       this.singleOptions.options3 = '';
       this.singleOptions.options4 = '';
       this.singleAnswer = '1';
       this.multiAnswers = [] ;
       this.multiOptions.options1 = '';
       this.multiOptions.options2 = '';
       this.multiOptions.options3 = '';
       this.multiOptions.options4 = '';
       this.qCourse = 0;
     }
   },
   mounted: function(){
     //当该组件挂载成功时，根据当前登录的教师用户的id
     //获得该教师任教的所有课程，并设置questionCourse 可选择的题目所属课程
     if(this.$store.state.userOnline.id > 0 
     && this.$store.state.userOnline.type == '2')
     {
       let config ={
         url: 'user/getCourse/'+this.$store.state.userOnline.id,
         method: 'GET',
       };
       request(config).then(res =>{
         let courses = res.data;
         for(let i=0;i<courses.length; i++)
         {
           this.questionCourse.push({value: courses[i].id
           ,text: courses[i].id+'-'+courses[i].name});
         }
       });
     }
   }
}
</script>
<style scoped>
.question_new_form{
  padding: 0% 20%; 
}
.text_ori{
  color: #6c757d;
}
.text_black{
  color: #000000;
}
.text_answer{
  color: #31B673;
}
.unqualified{
  color: #912810;
}
</style>
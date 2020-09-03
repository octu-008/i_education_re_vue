<template>
<div class="mt-2 mx-3 mb-3">
  <div class="mt-2 mx-5 mb-1 px-5">
    <!-- 练习信息盒子 -->
    <ie-practive-box v-if="!calculationCommit">
      <div class="row mt-2">
        <label style="font-size: 27px">练习信息</label>
        <i class="fa fa-list-ul mt-2 ml-2" style="font-size: 31px"></i>
      </div>
      <ie-hr></ie-hr>
      <div class="row">
        <ie-dou-color-label>
          <i class="fa fa-dot-circle-o" style="color:#e9ecef" slot="icon"></i>
          <label class="ml-1 text-white mt-1" slot="info">类型</label>
          <label class="mt-1" slot="content">{{typeState}}</label>
        </ie-dou-color-label>
        <ie-dou-color-label>
          <i class="fa fa-dot-circle-o" style="color:#e9ecef" slot="icon"></i>
          <label class="ml-1 text-white mt-1" slot="info">数量</label>
          <label class="mt-1" slot="content">{{numberState}}</label>
        </ie-dou-color-label>
        <ie-dou-color-label>
          <i class="fa fa-dot-circle-o" style="color:#e9ecef" slot="icon"></i>
          <label class="ml-1 text-white mt-1" slot="info">限时</label>
          <label class="mt-1" slot="content">{{timeState}}</label>
        </ie-dou-color-label>
      </div>
      <div class="row mb-2">
        <ie-dou-color-label>
          <i class="fa fa-dot-circle-o" style="color:#e9ecef" slot="icon"></i>
          <label class="ml-1 text-white mt-1" slot="info">分/题</label>
          <label class="mt-1" slot="content">{{eachScoreState}}</label>
        </ie-dou-color-label>
      </div>
    </ie-practive-box>
    <!-- 成绩结算盒子 -->
    <ie-practive-box v-if="calculationCommit">
      <div class="row mt-2">
        <label style="font-size: 27px">成绩结算</label>
        <i class="fa fa-bookmark-o mt-2 ml-2" style="font-size: 31px"></i>
      </div>
      <ie-hr></ie-hr>
        <div class="row text-center">
          <div class="col-4"></div>
          <ie-dou-color-label>
            <i class="fa fa-dot-circle-o" style="color:#e9ecef" slot="icon"></i>
            <label class="ml-1 text-white mt-1" slot="info">正确数量</label>
            <label class="mt-1" slot="content">{{passNum}}/{{pNumber}}</label>
          </ie-dou-color-label>
          <div class="col-4"></div>
        </div>
        <div class="row text-center">
          <div class="col-4"></div>
          <ie-dou-color-label>
            <i class="fa fa-dot-circle-o" style="color:#e9ecef" slot="icon"></i>
            <label class="ml-1 text-white mt-1" slot="info">分数</label>
            <label class="mt-1" slot="content">{{score}}</label>
          </ie-dou-color-label>
          <div class="col-4"></div>
      </div>
    </ie-practive-box>
    <!-- 等待处理盒子 -->
    <ie-practive-box v-show="waitingSignal">
      <div class="row">
        <div class="col text-center my-3">
          <i class="fa fa-spinner fa-spin text-center" style="font-size:27px"></i>
        </div>
      </div>
      <div class="row">
        <div class="col text-center mb-3">
          <label>等待系统处理</label>
        </div>
      </div>
    </ie-practive-box>
    <!-- 提交练习后-查看练习回答详情 -->
    <div class="text-center my-5" @click="showCommitQuestionDetail" v-if="calculationCommit">
      <i :class="{'fa fa-angle-down' : !practive_content_toggle ,'	fa fa-angle-up' : practive_content_toggle}" style="font-size: 23px"></i>
      <label style="font-size: 23px">点击查看回答详情</label>
      <i :class="{'fa fa-angle-down' : !practive_content_toggle ,'	fa fa-angle-up' : practive_content_toggle}" style="font-size: 23px"></i>
    </div>
    <!-- 题目列表 -->
    <transition name = "pcontent">
      <div v-show="practive_content_toggle">
        <div v-if = "loadState == 'done'" class="practiveContent">
          <ie-question-box v-for="(item,index) in questionsFormServe" :number = "index" :question = "item" :key="index" :ref = "item.id"></ie-question-box>
          <ie-hr></ie-hr>
          <div class="text-center" v-if="!calculationCommit">
            <ie-button buttonType="success" style="font-size: 23px" :signal="submitPractive" @submitPractiveSignal="submitRequest">提交</ie-button>
          </div>
        </div>
      </div>
    </transition>
    <!-- 确认弹窗 -->
    <b-modal hide-footer title="确认提交" v-model="confirmModal" :no-close-on-backdrop="true">
      <div class="text-center" :class="tipsForConfirmModalType" style="font-size: 23px">
        {{tipsForConfirmModal}}
      </div>
      <ie-hr></ie-hr>
      <div class="text-right">
        <b-button variant="outline-danger" @click="confirmModal = false" style="font-size: 23px">
            等等，未确认
        </b-button>
        <ie-button buttonType="primary" :signal="confirmSubmit" @confirmSubmitSignal="submitConfirm"
          style="font-size: 23px" :disabled="disabledButton">是的，已确认
        </ie-button>
      </div>
    </b-modal>
  </div>
</div>
</template>
<script>
import IeDouColorLabel from 'components/IeDouColorLabel';
import IePractiveBox from 'components/IePractiveBox';
import IeQuestionBox from 'components/IeQuestionBox';
import IeHr from 'components/IeHr'
import IeButton from 'components/IeButton'
import request from 'network/request'
 export default {
   name: 'MainPractiveView',
   data() {
     return {
       //等待处理信号
       waitingSignal: true,
       //提交练习信号
       submitPractive: 'submitPractiveSignal',
       //提交练习弹窗-提示
       tipsForConfirmModal: '*已完成，确认提交吗？*',
       //提示样式
       tipsForConfirmModalType: 'tipState_pas',
       //是否展示确认弹窗
       confirmModal: false,
       //确认提交信号
       confirmSubmit: 'confirmSubmitSignal',
       //题目加载状态
       loadState: 'loading',
       //确认提交按钮不可以状态
       disabledButton:true,
       //服务端获取的题目数据
       questionsFormServe: {},
       //展示成绩结算
       calculationCommit: false,
       //题目正确数量
       passNum: 0,
       //练习分数
       score: 0,
       //切换练习详情
       practive_content_toggle: false
       }
     },
   props:{
     //练习参数-课程限制
     pType:{
       type: String,
       default: 'all'
     },
     //练习参数-时间限制
     pTime:{
       type: String,
       default: 'noLimit'
     },
     //练习参数-题目数量
     pNumber:{
       type: Number,
       default: 0
     },
     //练习参数-每题数量
     pEachScore:{
       type: Number,
       default: 0
     }
   },
   components:
   {
     IeDouColorLabel,IePractiveBox,IeQuestionBox,IeHr,IeButton
   },
   computed:{
     //课程限制
     typeState()
     {
       if(this.pType == 'all')
       {
         return '全部课程'
       }
       else{
         return '未选择'
       }
     },
     //题目数量
     numberState()
     {
       if(this.pNumber < 1)
       {
         return '未选择数量'
       }
       else{
         return this.pNumber+"题";
       }
     },
     //时间限制
     timeState()
     {
       if(this.pTime == 'noLimit')
       {
         return '没有限制';
       }
       else{
         return this.pTime;
       }
     },
     //每题数量
     eachScoreState()
     {
       if(this.pEachScore < 1)
       {
         return '未选择每题分数';
       }
       else
       {
         return this.pEachScore.toString();
       }
     },
   },
   methods:{
     //弹出提交确认弹窗
     submitRequest()
     {
       //检测是否每道题都至少选择了一个选项
       let qid = -1;
       let msg ='';
       for(let i = 0 ; i<this.questionsFormServe.length ; i++)
       {
         qid = this.questionsFormServe[i]['id'];
         msg = this.$refs[qid][0].optionSelected;
         if(msg == 'selected')
         {
           continue;
         }
         else{
           break;
         }
       }
       //全部题目都已经选择了一个选项，可以进行自动判卷
       if(msg == 'selected'){
         this.tipsForConfirmModalType = 'tipState_pas';
         this.tipsForConfirmModal = '*已完成，确认提交吗？*';
         this.disabledButton = false;
       }
       //某一题没有选择任何选项，在弹窗上展示未选择的题目
       else{
         this.tipsForConfirmModalType = 'tipState_unq';
         this.tipsForConfirmModal = '*'+msg+'未完成*';
         this.disabledButton = true;
       }
       this.confirmModal = true;
     },
     //确认提交
     submitConfirm()
     {
       this.confirmModal = false
       let qid = -1;
       //调用每个IeQuestionBox的自动判卷功能
       new Promise((resolve) =>{
         this.practive_content_toggle = false;
         this.waitingSignal = true;
         for(let i = 0 ; i<this.questionsFormServe.length ; i++){
           qid = this.questionsFormServe[i]['id'];
           this.$refs[qid][0].compareQuestion();
         }
         resolve();
       }).then(() =>{
         //计算回答情况
         this.calculation();
         this.waitingSignal = false;
       });
     },
     //结算回答情况
     calculation()
     {
       let qid = -1;
       if(this.questionsFormServe.length > 0)
       {
         for(let i=0;i<this.questionsFormServe.length;i++)
         {
           qid = this.questionsFormServe[i].id;
           if(this.$refs[qid][0].ieOptionCheck){
             this.passNum += 1;
             this.score += this.pEachScore; 
           }
         }
       }
       this.calculationCommit =true;
     },
     showCommitQuestionDetail(){
       if(this.practive_content_toggle)
       {
         this.practive_content_toggle = false;
       }
       else
       {
         this.practive_content_toggle = true;
       }
     },
   },
   mounted:function(){
     //当这个视图被挂载后，向服务器请求练习题目数据
     if(this.pNumber >0 && this.pEachScore >0)
     {
       let data = 'type=' + this.pType + "&number=" +this.pNumber;
       let config = {
         url: 'getPracticeVue',
         method: 'POST',
         data: data
       };
       request(config).then( res => {
         this.questionsFormServe = res.data;
         this.waitingSignal = false;
         this.practive_content_toggle = true;
         this.loadState = 'done';
       });
     }
     else{
       console.log('没有接收参数');
     }
   }
}
</script>
<style scoped>
@import url('https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css');
.tipState_unq
{
  color: #dc3545;
}
.tipState_pas
{
  color: #28a745;
}
.practiveContent{
  opacity: 1;
}
.pcontent-enter-active {
  animation: fadeIn 0.5s;
}
.pcontent-leave-active {
  animation: fadeOut 0.5s;
}
@keyframes fadeIn
{
  from {
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}
@keyframes fadeOut
{
  from {
    opacity: 1;
  }
  to{
    opacity: 0;
  }  
}
</style>
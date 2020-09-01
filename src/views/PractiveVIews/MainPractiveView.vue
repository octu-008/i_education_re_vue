<template>
<div class="mt-2 mx-3 mb-3">
  <div class="mt-2 mx-5 mb-1 px-5">
    <ie-practive-box>
      <div class="row mt-2">
        <label style="font-size: 27px">练习信息</label>
        <i class="fa fa-list-ul mt-2 ml-2" style="font-size: 31px"></i>
      </div>
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
    <div v-if = "loadState == 'done'">
      <ie-question-box v-for="(item,index) in questionsFormServe"
      :number = "index" :question = "item" :key="index">
      </ie-question-box>
    </div>
  </div>
</div>
</template>
<script>
import IeDouColorLabel from 'components/IeDouColorLabel';
import IePractiveBox from 'components/IePractiveBox';
import IeQuestionBox from 'components/IeQuestionBox';
import request from 'network/request'
 export default {
   name: 'MainPractiveView',
   data() {
     return {
       waitingSignal: true,
       loadState: 'loading',
       questionsFormServe: {}
     }
   },
   props:{
     pType:{
       type: String,
       default: 'all'
     },
     pTime:{
       type: String,
       default: 'noLimit'
     },
     pNumber:{
       type: Number,
       default: 0
     },
     pEachScore:{
       type: Number,
       default: 0
     }
   },
   components:
   {
     IeDouColorLabel,IePractiveBox,IeQuestionBox
   },
   computed:{
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
     }
   },
   mounted:function(){
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
</style>
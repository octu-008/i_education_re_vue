<template>
<div>
  <!-- 练习参数选择页面 -->
  <ie-form-box>
    <h4 class="text-center text-dark mt-2 mb-4">选择练习题目生成条件</h4>
    <ie-hr></ie-hr>
      <div class="row">
        <div class="col-1"></div>
        <div class="col-5">
          <div class="form-group">
            <i class="fa fa-map mb-2" style="font-size:18px">课程限制</i>
            <b-form-select class="custom-select" type="text" name="type" v-model="type">
              <b-form-select-option value="all">没有课程限制</b-form-select-option>
            </b-form-select>
          </div>
        </div>
        <div class="col-5">
          <div class="form-group">
            <i class="fa fa-clock-o mb-2" style="font-size: 18px">时间限制：</i>
            <b-form-select class="custom-select" type="text" name="time" v-model="time">
              <b-form-select-option value="noLimit">没有时间限制</b-form-select-option>
            </b-form-select>
          </div> 
        </div>
        <div class="col-1"></div>
      </div>
      <div class="row">
        <div class="col-1"></div>
        <div class="col-5">
          <div class="form-group">
            <i class="fa fa-cubes mb-2" style="font-size:18px">题目数量：</i>
            <b-input class="form-control" v-model="rfp_number" type="number"></b-input>
          </div>
        </div>
        <div class="col-5">
          <div class="form-group">
            <i class="fa fa-percent mb-2" style="font-size: 18px">题目分数/每题：</i>
            <b-input class="form-control" v-model="eachScore" type="number"></b-input>
          </div>
        </div>
        <div class="col-1"></div>
      </div>
    <ie-hr></ie-hr>
    <div class="text-center">
      <b-button style="font-size: 23px" variant="primary" @click="confirm_rfp_info">
        生成题目
        <i class="ml-1 fa fa-arrow-circle-right"></i></b-button>
    </div>
    <div>
    <b-modal id="modal_confirm" hide-footer title="请确认生成信息" v-model="practiveConfirmDialog" :no-close-on-backdrop="modalBackDrop">
      <div class="text-center">
        <div class="row">
          <div class="col text-center">
            <i class="fa fa-exclamation-triangle" style="font-size: 23px" :class="tipsType">{{tipsForRFP}}</i>
          </div>
        </div>
        <ie-hr></ie-hr>
        <div class="text-right">
          <b-button variant="outline-danger" @click="practiveConfirmDialog = false" style="font-size: 23px">
             等等，未确认
          </b-button>
          <ie-button buttonType="primary" :signal="toPractive" @toPractiveSignal="toPractivePage" 
          style="font-size: 23px" :disabled="disabledButton">
            是的，已确认
          </ie-button>
        </div>
      </div>
    </b-modal>
    </div>
    </ie-form-box>
</div>
</template>
<script>
import IeFormBox from 'components/IeFormBox'
import IeHr from 'components/IeHr'
import IeButton from 'components/IeButton'
 export default {
   name: 'MainRFPractiveView',
   data() {
     return {
       //课程范围
       type: 'all',
       //时间限制
       time: 'noLimit',
       //练习参数确认弹窗
       practiveConfirmDialog: false,
       //前往自动生成练习的页面
       toPractive: 'toPractiveSignal',
       //参数选择确认提示
       tipsForRFP: '*确定生成练习*',
       //题目数量
       rfp_number: 0,
       //每题分数
       eachScore: 0,
       //提示样式       
       tipsType: 'normal',
       //点击弹窗以外弹窗不消失
       modalBackDrop: true,
       //确认按钮无效化
       disabledButton: true
     }
   },
   components: {
     IeFormBox,IeHr,IeButton
   },
   methods: {
     //弹窗提示信息
     confirm_rfp_info()
     {
       this.practiveConfirmDialog = true;
       if(this.rfp_number > 0)
       {
         if(this.eachScore > 0)
         {
           this.tipsType = 'pass';
           this.tipsForRFP = '*确定以当前参数生成练习*'
           this.disabledButton = false;
         }
         else{
          this.tipsType = 'unqualified';
          this.tipsForRFP = '*请设置题目分数（至少大于0分/题）*'
          this.disabledButton = true;
         }
       }
       else{
         this.tipsType = 'unqualified';
         this.tipsForRFP = '*请设置题目数量（至少大于0题）*'
         this.disabledButton = true;
       }
     }
     ,
     //通过props向组件提供自动生成题目的参数
     toPractivePage()
     {
       let data = {
         pType: this.type,
         pTime: this.time,
         pNumber: parseInt(this.rfp_number),
         pEachScore: parseInt(this.eachScore)
       };
       console.log(data);
       this.$router.push({
         name: 'Practive',
         params: data
       });
     }
   }
}
</script>
<style scoped>
@import url("https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css");
.normal{
  color:#000000;
}
.unqualified{
  color: #912810;
}
.pass
{
  color: #00FF00;
}
</style>
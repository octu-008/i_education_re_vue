<template>
<div>
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
    <b-modal id="modal_confirm" hide-footer title="请确认生成信息" v-model="practiveConfirmDialog" no-close-on-backdrop="true">
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
          <ie-button buttonType="primary" :signal="toPractive" @toPractiveSignal="toPractivePage" style="font-size: 23px" :disabled="disabledButton">
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
       type: 'all',
       time: 'noLimit',
       practiveConfirmDialog: false,
       toPractive: 'toPractiveSignal',
       tipsForRFP: '*确定生成练习*',
       rfp_number: 0,
       eachScore: 0,
       tipsType: 'normal',
       disabledButton: 'disabled'
     }
   },
   components: {
     IeFormBox,IeHr,IeButton
   },
   methods: {
     confirm_rfp_info()
     {
       this.practiveConfirmDialog = true;
       if(this.rfp_number > 0)
       {
         if(this.eachScore > 0)
         {
           this.tipsType = 'pass';
           this.disabledButton ='';
         }
         else{
          this.tipsType = 'unqualified';
         }
       }
       else{
         this.tipsType = 'unqualified';
       }
     }
     ,
     toPractivePage()
     {

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
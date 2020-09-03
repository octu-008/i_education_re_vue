<template>
<!-- 带有输入内容长度提示提示的输入框 -->
<!-- 可以自动检查是否输入框内容长度是否符合设定值 -->
<!-- 并返回输入框的value以及输入是否合格的布尔值 -->
<div :class="groupMargin">
 <div class="item_edge" :class="groupMargin">
  <b-input class="i_c_l" v-model="groupValue" 
  :type="groupType" :placeholder="groupPlaceholder" @keyup.native="inputKeyUpCheck()">
  </b-input>
 </div>
 <label :class="labelCheck">{{tipsText}}</label>
</div>
</template>
<script>
 export default {
   name: 'InputWithLimited',
   props: {
     //组件的边距，默认无
    groupMargin: Object,
    //设置input标签的类型，默认为文本框
    groupType: {
      type: String ,
      default: 'text'
    },
    //设置input标签的占位符
    groupPlaceholder:
    {
      type: String, 
      default: '输入'
    },
     //限制提示文字:
     tipsText: {
       type: String,
       default: '*该输入框有输入限制*'
     },
     //最大长度限制
     maxLength: {
       type: Number,
       //默认没有限制
       default: 0
     },
     //最小长度限制
     minLength:{
       type: Number,
       default: 0
     }
   },
   data() {
     return {
       //input标签值
       groupValue: '',
       //输入是否要求
       labelCheck: 'normal'
     }
   },
   computed: {
     
   },
   methods: {
     isQualified()
     {
       //检测输入框长度是否符合要求
       let check =false;
       let maxlimit = (this.maxLength >0);
       let minlimit = (this.minLength >0);
       let valueLength = this.groupValue.length;
       //情况1：有最小限制和最大限制
       //当需要特定长度的值时，设置最小限制=最大限制即可
       if(maxlimit && minlimit)
       {
         if( valueLength >= this.minLength && valueLength <= this.maxLength)
         {
           check =true;
         }
       }
       //情况2：没有最小限制，有最大限制
       else if((!minlimit) && maxlimit)
       {
         if(valueLength >= 0 && valueLength <= this.maxLength)
         {
           check = true;
         }
       }
       //情况3：没有最大限制，有最小限制
       else if((!maxlimit) && minlimit)
       {
         if(valueLength >= this.minLength)
         {
           check = true;
         }
       }
       //情况4：没有限制
       else{
         check = true;
       }
       return check;
     },
     inputKeyUpCheck()
     {
       if(this.isQualified()){
         this.labelCheck = 'normal';
       }
       else{
         this.labelCheck= 'unqualified';
       }
     }
   },
}
</script>
<style scoped>
.normal{
  color: #6c757d;
}
.item_edge{
  display: -ms-flexbox;
  display: flex;

  -ms-flex-direction: row;
  flex-direction: row;
}
.unqualified{
  color:#dc3545;
}
.i_c_l
{
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
}
</style>
<template>
<div class="edge"> 
  <div id="login_form">
    <div id="form_content">
      <slot></slot>
    </div>
  </div>
</div>
</template>
<script>
 export default {
   name: 'IeFormBox'
}
</script>
<style scoped>
.edge{
  -ms-flex-preferred-size:0;
  flex-basis: 0;
  -ms-flex-positive:1;
  flex-grow: 1;
  max-width: 100;
}
#login_form{
  display: -ms-inline-flexbox;
  display: flex;
  width: 80%;
  height: 80%;
  margin: 5rem 10%;
    
  border-bottom: 1px solid #dee2e6;

  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
#form_content{
  width: 80%;
  height: 100%;
  margin: 1rem 10%;
}
</style>
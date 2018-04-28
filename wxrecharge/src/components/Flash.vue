<template>
    <div class="login">

            <div>
                 <mt-spinner type="double-bounce" color="#26a2ff"></mt-spinner>
            </div>

    </div>
</template>

<script>

    import Api from '../lib/Api'

    export default {
        name: 'Flash',

        data(){
            return {
            }
        },
       mounted: function (){
         Api.push({str:'/wxbind'});
          let openid = window.openid;
          let wxAcc = window.wxAcc;
          let data = {wxAcc:wxAcc,openid:openid}
          //判断openid是否已经绑定
          Api.api({
            url:"wxpassport/isRegister",
            data:data,
            success:(result)=>{
              if(!result){
                Api.push({str:'/wxbind'});
              }else{
                window.location.href = result;
              }
            }
          });

       }

    }
</script>

<style>
     .login{
         display: flex;
         flex: 1;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         margin-top: 250px;

     };


</style>

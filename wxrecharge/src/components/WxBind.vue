<template>
  <div class="wxbind">
    <div class="img">
         <img src="./images/banner.png" width="100%" height="100%"/>
    </div>
    <div class="binddiv">

        <input placeholder="请输入您的手机号码" class="accinput" v-model="phone">
        <div class="codediv">
          <input placeholder="请输入验证码" class="codeinput" v-model="code">
          <div class="codetextdiv">
            <p class="codetext" @click="startTimer">{{buttex}}</p>
          </div>
        </div>
    </div>
    <div class="bind">
      <p class="bindtext" @click="register">点击领取奖品</p>
    </div>

  </div>
</template>

<script>
import Api from '../lib/Api'
import {MessageBox,Toast} from 'mint-ui'
const TIMER = 60;
export default {
  name: 'WxBind',
  data () {
    return {
     screenWidth:'',
     buttex:"获取验证码",
     phone:'',
     code:'',
     timer: TIMER,       //默认倒数60秒
     stop : false,   //默认是停止的，但界面加载之后会变成false
     Interval:null,  //setInterval的对象
     width:window.innerWidth,
     height:window.innerWidth*0.9
    }
  },
    mounted: function (){
  },
       methods : {
            update () {
                this.stop = true;
                this.timer--;
                this.buttex ="再次发送("+ this.timer+")"
                if(this.timer == 0)
                {
                    clearInterval(this.Interval);
                    this.timer= TIMER;
                    this.buttex="重新发送"
                    this.stop = false;
                }
            },
            startTimer () {
               this.disabled = true
                if(!this.checkPhone(this.phone)){
                      MessageBox.alert("请输入正确的手机号码");
                    return;
                }else{
                    if(!this.stop ){
                      this.getVerifyid();
                    }
                }
            },
         getVerifyid(){
              this.stop = true;
            Api.api({
                url:'wxpassport/verify',
                data:{phone:this.phone},
                success:(result)=>{
                    this.verifyId = result;
                    this.Interval = setInterval(this.update,1000);
                    console.log(result);
                },error:(error)=>{
                    console.log("服务器出错了")
                    this.stop = false;
                }
            });
          },

          postRes(){
              let openId = window.openid;
              let wxAcc = window.wxAcc;
            // let openId ='window.openid';
              let data = {
                  phone:this.phone,
                  wxAcc:wxAcc,
                  openId:openId,
                  code:this.code,
                  verifyId:this.verifyId}
              Api.api({
                  url:'wxpassport/login',
                  data:data,
                  success:(result)=>{
                      //已经成功跳转抽奖连接
                        window.location.href = result;
                    //  if(window.localStorage){
                    //      localStorage.setItem("token",result)
                    //  }
                    //  localStorage.getItem("token")
                    //  Api.replace({str:'/assignCard'});
                      //console.log(result);
                  }
              })
          },
          checkPhone(text){
            var myreg = (/^0?[1][3|4|5|7|8][0-9]\d{8}$/);
	        	return myreg.test(text);
            },
          register(){
              //console.log(this.checkPhone(this.phone));
              this.postRes();
          },
        }
}
</script>


<style scoped>
.wxbind{
  display: flex;
  flex: 1;
  flex-direction: column
}
.img{
  display: flex;
  flex: 1;
  justify-content: center

}
.binddiv{
  display: flex;
  flex: 1;
  /* height: 200px; */
  flex-direction: column;
  border-radius: 15px;
  justify-content: center;
  /* align-items: center; */
  background-color: #e4d6cb;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 40px;
  padding: 10px;
}
.accinput{
  display: flex;
  flex: 1;
  border:0px;
  height: 40px;
  border-radius: 10px;
  padding-left: 15px;
  margin: 10px;
  /* width: 250px; */
}
.codediv{
  display:flex;
  flex:1;
  flex-direction:row;
  justify-content:center;
  align-items:center;
}
.codeinput{
  display:flex;
  flex:1;
  margin: 10px;
  border:0px;
  height: 40px;
  border-radius: 10px;
  padding-left: 15px;
}
.codetextdiv{
  display:flex;
  flex:1;
  justify-content:center;
  align-items:center;
  height:40px;
  border-radius:10px;
  background-color:#fe7723;
}

.bind{
  display: flex;
  flex: 1;
  margin:20px;
  justify-content: center;
  align-items: center;
  background-color: #fe7723;
  border-radius: 10px;
  height: 40px
}
.bindtext{
  color: #fff;
  font-size: 14px;
}
.codetext{
  color:#fff;
  font-size:14px;
}

</style>

<template>
  <div class="body">
    <div class="register">
      <div class="left">
        <div class="left-text">
          <h2>已有账号？</h2>
          <p style="color:#fff">请使用您的账号进行登录</p>
          <el-button type="primary" @click="submitForm('ruleForm')" class="button-login" >登录</el-button>
        </div>
        
      </div>
      <div class="right">
        <h1>注 册</h1>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
          <el-form-item label="" prop="number">
            <el-input prefix-icon="el-icon-mobile-phone" v-model="ruleForm.number" placeholder="手机号" class="el-input"></el-input>
          </el-form-item>
          <el-form-item label="" prop="captcha">
            <el-input prefix-icon="el-icon-message" v-model="ruleForm.captcha" placeholder="验证码区分大小写" class="el-input" ></el-input>
            <i><img alt="验证码1" id="code1" @click="check1()"/></i>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input prefix-icon="el-icon-lock" v-model="ruleForm.password" placeholder="密码" class="el-input" ></el-input>
          </el-form-item>
          <el-form-item label="" prop="password2">
            <el-input prefix-icon="el-icon-lock" v-model="ruleForm.password2" placeholder="确认密码" class="el-input" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" class="button" >注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <p>2023版权所有 ****信息技术（集团）股份有限公司 </p>
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          number: '',
          captcha: '',
          password: '',
          password2: ''
        },
        rules: {
          number: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            // { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
          ],
          captcha: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          password2: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      
    }
  }
</script>

<style scoped>
  .body{
    padding-top: 30px;
  }



  .register {
    margin: auto;
    width: 900px;
    display: flex;
    flex: auto;
    box-shadow: 3px 8px 13px 5px #6f6766;
    height: 550px;
  }

  .left, .right{
    padding: 50px;
    width: 450px;
  }

  .left{
    background-color: #FF4838;
    padding-top: 165px;
  }

  h1{
    text-align: center;
  }

  p{
    margin-top: 45px;
    text-align: center;
    color: #6f6766;
  }

  .left-text {
    text-align: center;
    color: #fff;
  }

  .button-login {
    font-size: large;
    background-color: #FF4838;
    color: azure;
    border-color: azure;
    border-radius: 28px;
    margin-top: 25px;
    height: 50px;
    width: 145px;
  }

  .button{
    font-size: large;
    background-color: #FF4838;
    color: azure;
    border-color: azure;
    border-radius: 28px;
    height: 50px;
    width: 346px;
  }

</style>
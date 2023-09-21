<template>
  <div class="register">
    <div class="left">
    </div>
    <div class="right">
      <h1>注 册</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="手机号" prop="number">
          <span><i class="el-icon-phone-outline"></i><span class="icon-name"></span></span>
          <el-input v-model="ruleForm.number" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-input v-model="ruleForm.captcha"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input v-model="ruleForm.password2"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    
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
      }
    }
  }
</script>

<style scoped>
  .register {
    margin: auto;
    padding: 50px;
    width: 1000px;
    display: flex;
    flex: auto;
  }

  .left, .right{
    padding: 50px;
    border: 3px solid;
    width: 500px;

  }

  h1{
    text-align: center;
  }
</style>
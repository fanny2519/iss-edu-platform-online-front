<template>
  <div class="center" style="background-color: #ecf0f1;">
    <div class="center panel box" style="width:420px;height: 430px">
      <div class="logo">
        <h3 style="color:white;text-align: center;line-height: 130px;height: 130px;margin: 0;">
          <strong>软 通 动 力 在 线 教 育 平 台</strong>
        </h3>
      </div>
      <div class="content">
        <div style="width: 100%;text-align: center; margin-top: 40px;">
          <el-input v-model="user.username" placeholder="用户/手机号/邮箱" class="input">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
          <el-input v-model="user.password" placeholder="密码" :show-password="true" class="input">
            <i slot="prefix" class="el-input__icon el-icon-key"></i>
          </el-input>
        </div>
        <!--	<div style="width: 100%;text-align: left; margin: 10px 0 0 25px;">
            <el-checkbox class="checkbox">Remember me</el-checkbox>
          </div>-->
        <div style="width: 100%;text-align: center; margin-top: 30px;">
          <el-button type="info" plain class="btn_submit" @click="login">
            <strong style="color: white;font-size: large;">&nbsp;&nbsp;&nbsp;&nbsp;登录&nbsp;&nbsp;&nbsp;&nbsp;</strong>
          </el-button>
        </div>
        <div class="btn_link">
          <div>
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            <el-button type="text">忘记密码？</el-button>
          </div>
          <el-button type="text">注册新账号</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      this.$axios.post('/login', this.user).then(res => {
        if (res.code == 20000) {
          this.$router.push('index');
          sessionStorage.setItem('token', res.data.token);
          sessionStorage.setItem('user', JSON.stringify(res.data.user));
        } else {
          this.$message(res.msg);
        }
      });
    }
  }
}
</script>

<style scoped>
.input {
  width: calc(100% - 50px);
  margin-top: 10px;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}

.logo {
  flex-shrink: 0;
  width: 420px;
  height: 130px;
  background-repeat: no-repeat;
  background-image: url('../assets/bg.jpg');
  background-size: cover;
  background-position: top left;
  position: relative;
}

.box {
  width: 400px;
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 6px 6px 6px 6px;
  overflow: hidden;
}

.content {
  width: 100%;
  height: 100%;
  background-color: white;
  position: relative;
}

.checkbox {
  text-align: left
}

.btn_submit {
  background-color: #2b4049;
}

.btn_link {
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 25px;
  position: absolute;
  bottom: 20px;
}

</style>

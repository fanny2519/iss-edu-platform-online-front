<template>
  <el-container>
    <el-header height="70px">
      <el-row>
        <el-col :span="4" style="justify-content: space-between;">
          <img src="../assets/isoftstone.png" style="zoom:50%;"/>
          <a href="" class="logo"><span>iss-edu-platform</span></a>
        </el-col>
        <el-col :span="20" style="justify-content:right;padding: 0 25px;">
          <el-avatar :size="45" shape="square" :src="photo"></el-avatar>
          <el-dropdown trigger="click" style="margin-left: 15px;">
            <span class="el-dropdown-link" style="color: white;">
              {{ username }} <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="handleLogout">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <aside-bar/>
      <el-container>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import AsideBar from '../components/AsideBar'

export default {
  name: "index",
  components: {AsideBar},
  data() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    return {
      username: user.username,
      photo: this.$avatarUrl + user.photo
    }
  },
  methods: {
    handleLogout() {
      this.$axios.get('/logout').then(res => {
        this.$router.push('/login');
      });
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #2B4049;
  color: #333;
  text-align: center;
  line-height: 70px;
  padding: 0px;
}

.el-container {
  height: 100%;
  overflow: hidden;
}

.el-main {
  padding: 0;
  background: #f4f5f7;
}

.el-col {
  text-align: center;
  display: flex;
  align-items: center;
}

.logo {
  height: 70px;
  line-height: 70px;
  color: #ffffff !important;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: .05em;
  text-transform: uppercase;
  text-decoration-line: none;
}

.notifi-title {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: #000000;
  font-size: 16px;
  font-weight: 400;
  padding: 5px 0px 10px;
  display: flex;
  justify-content: center;
}

.notifi-bottom {
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 5px;
}

.item_context {
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 200px;
  color: #828282;
}

</style>
<style>
.el-badge__content.is-fixed {
  transform: translateY(38%) translateX(78%);
}

.el-badge__content {
  padding: 0 3px;
}
</style>


<!--
<el-dropdown trigger="click">
<span class="el-dropdown-link">
							<el-badge :value="12" :max="99" class="item">
								<i style="font-size:25px;color: #ffffff;" class="el-icon-bell"></i>
							</el-badge>
						</span>
<el-dropdown-menu slot="dropdown">
  <div class="notifi-title">通知消息</div>
  <el-dropdown-item>
    <div class="item_context">
      <i class="el-icon-message"></i>&nbsp;<small>黄金糕黄金糕黄金糕黄金糕 ...</small>
    </div>
  </el-dropdown-item>
  <el-dropdown-item>
    <div class="item_context">
      <i class="el-icon-message"></i>&nbsp;<small>黄金糕黄金糕黄金糕黄金糕 ...</small>
    </div>
  </el-dropdown-item>
  <el-dropdown-item>
    <div class="item_context">
      <i class="el-icon-message"></i>&nbsp;<small>黄金糕黄金糕黄金糕黄金糕 ...</small>
    </div>
  </el-dropdown-item>
  <el-dropdown-item>
    <div class="item_context">
      <i class="el-icon-message"></i>&nbsp;<small>黄金糕黄金糕黄金糕黄金糕 ...</small>
    </div>
  </el-dropdown-item>
  <div class="notifi-bottom">
    <el-link type="primary"><small>查看更多</small></el-link>
  </div>
</el-dropdown-menu>
</el-dropdown>
-->

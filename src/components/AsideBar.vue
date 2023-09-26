<template>
  <el-aside width="66px">
    <el-row class="menu">
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#ffffff"
        text-color="#666666"
        active-text-color="#ffd04b"
        style="border: 0"
      >
        <el-menu-item @click="$router.push('/index')">
          <el-tooltip
            class="item"
            effect="light"
            content="首页"
            placement="right"
          >
            <i class="icon-zz-home_light"></i>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item @click="$router.push('/index/courses')">
          <el-tooltip
            class="item"
            effect="light"
            content="课程"
            placement="right"
          >
            <i class="icon-zz-news"></i>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item @click="$router.push('/index/teachers')">
          <el-tooltip
            class="item"
            effect="light"
            content="讲师"
            placement="right"
          >
            <i class="icon-zz-profile"></i>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item @click="$router.push('/index/student')" >
          <el-tooltip
            class="item"
            effect="light"
            content="学生"
            placement="right"
          >
            <i class="icon-zz-people"></i>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item>
          <el-tooltip
            class="item"
            effect="light"
            content="班级"
            placement="right"
          >
            <i class="icon-zz-circle"></i>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item>
          <el-tooltip
            class="item"
            effect="light"
            content="题库 -- 暂不用做"
            placement="right"
          >
            <i class="icon-zz-medal"></i>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item>
          <el-tooltip
            class="item"
            effect="light"
            content="试卷 -- 暂不用做"
            placement="right"
          >
            <i class="icon-zz-text"></i>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item>
          <el-tooltip
            class="item"
            effect="light"
            content="测评 -- 暂不用做"
            placement="right"
          >
            <i class="icon-zz-upstage"></i>
          </el-tooltip>
        </el-menu-item>
      </el-menu>
    </el-row>
  </el-aside>
</template>

<script>
export default {
  data() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    return {
      username: user.username,
      photo: this.$avatarUrl + user.photo,
    };
  },
  methods: {
    handleLogout() {
      this.$axios.get("/logout").then((res) => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style scoped>
.menu {
  background-color: #ffffff;
  border-right: solid 1px #e6e6e6;
  color: #333;
  height: 100%;
  width: 66px;
  position: relative;
}

.el-menu-item,
.el-submenu__title {
  height: 66px;
  line-height: 66px;
}
</style>
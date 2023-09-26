<template>
    <div style="padding-top:5px;display:flex;flex-direction:column;align-items:center;">
      <el-row style="width: 100%;margin: auto;">
        <el-breadcrumb separator="/" style="margin: 20px ">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/index/teachers' }">讲师</el-breadcrumb-item>
          <el-breadcrumb-item>Modify Teacher Information</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <br>
      <el-form :model="teacher" label-position="left" label-width="90px" ref="teacherForm" style="width: 65%;">
        <el-container>
          <el-main style="padding: 0;">
            <el-form-item label="账号" prop="username">
              <el-input v-model="teacher.username" style="width: 300px"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="teacher.password" style="width: 300px"/>
            </el-form-item>
            <el-form-item label="讲师姓名" prop="nickname">
              <el-input v-model="teacher.nickname" style="width: 300px"/>
            </el-form-item>
            
            <el-form-item label="电话" prop="phone">
              <el-input v-model="teacher.phone" style="width: 300px"/>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="teacher.email" style="width: 300px"/>
            </el-form-item>
            <el-form-item label="级别" prop="level">
              <el-radio-group v-model="teacher.level">
                <el-radio :label="1">初级讲师</el-radio>
                <el-radio :label="2">中级讲师</el-radio>
                <el-radio :label="3">高级讲师</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-main>
          <el-aside style="width: 305px;display: flex;justify-content: center;padding-bottom: 20px;">
            <el-upload name="avatar" class="avatar-uploader" :show-file-list="false" :action="this.$uploadAvatar"
                       :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="avatar" :src="this.$avatarUrl + avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-aside>
        </el-container>
        <el-form-item label="教师简介" prop="introduction">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="teacher.introduction"/>
        </el-form-item>
      </el-form>
      <el-row style="width: 65%;margin: auto;background-color: #FFFFFF;">
  
      </el-row>
      <div slot="footer" class="dialog-footer" style="padding-bottom: 25px;">
        <el-button @click="$router.push('/index/teachers')">返 回</el-button>
        <el-button type="primary" @click="handleSubmitForm">确 定</el-button>
      </div>
    </div>
  </template>
  
  <script>
  import commonOperate from "@/api/common";
  import operate from "./operate";
  
  export default {
    name: "UpdateTeacherForm",
    created() {
      this.id = this.$route.params.id;
      operate.getTeachersForSelect().then(res => {
        // this.teachers = res;
        console.log(res)
      });
    },
    mounted() {
      this.initFormForUpdate();
    },
    methods: {
      beforeAvatarUpload: function (file) {
        console.log("运行beforeAvatarUpload")
        commonOperate.beforeAvatarUpload(file);
      },
      handleAvatarSuccess: function (res) {
        this.$message.success(res.msg);
        console.log(res)
        console.log(this.$avatarUrl + res.data);
        // this.avatar = this.$avatarUrl + res.data;
        this.teacher.photo = res.data
        this.avatar = res.data;
      },
      initFormForUpdate() {
        operate.getUser(this.id).then(res => {
          console.log("运行initFormForUpdate")
          console.log(res)
          this.teacher.level = res.level;
          this.teacher = res;
          // 图像回显
          this.avatar = res.photo;
        });
      },
      handleSubmitForm: function () {
        console.log(this.teacher)
        operate.submitTeacherForm(this.teacher).then((res) => {
          this.$message.success(res.msg);
          this.$router.push('/index/teachers');
        }).catch((error) => {
          this.$message.error(error.msg);
        });
      }
    },
    data() {
      return {
        id: 0,
        avatar: '',
        teachers: [],
        fileList: [],
        teacher: {
          id: 0,
          username: '',
          nickname: '',
          introduction: '',
          photo: '',
          phone: '',
          sex: '',
          level: '',
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .avatar-uploader {
    width: 305px;
    height: 305px;
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 305px;
    height: 305px;
    line-height: 305px;
    text-align: center;
  }
  
  .avatar {
    width: 305px;
    height: 305px;
    display: block;
  }
  </style>
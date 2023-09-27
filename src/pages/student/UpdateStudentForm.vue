<template>
    <div style="padding-top:5px;display:flex;flex-direction:column;align-items:center;">
      <el-row style="width: 100%;margin: auto;">
        <el-breadcrumb separator="/" style="margin: 20px ">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/index/students' }">学生</el-breadcrumb-item>
          <el-breadcrumb-item>Modify Students Information</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <br>
      <el-form :model="student" label-position="left" label-width="90px" ref="studentForm" style="width: 65%;">
        <el-container>
          <el-main style="padding: 0;">

            <el-form-item label="学生姓名" prop="nickname" class="el-form-item" >
              <el-input v-model="student.nickname" class="el-input"/>
            </el-form-item>
            <el-form-item label="学生性别" prop="sex">
              <el-radio-group v-model="student.sex">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 头像 -->
            <el-aside class="el-aside" style="width: 305px;display: flex;justify-content: center;padding-bottom: 20px;">
              <el-upload name="avatar" class="avatar-uploader" :show-file-list="false" :action="this.$uploadAvatar"
                         :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="avatar" :src="this.$avatarUrl + avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-aside>


            <el-form-item label="登录账号" prop="username" class="el-form-item" >
              <el-input v-model="student.username" class="el-input"/>
            </el-form-item>
            <el-form-item label="登陆密码" prop="password" class="el-form-item" >
              <el-input v-model="student.password" class="el-input"  />
            </el-form-item>
            <el-form-item label="邮箱地址" prop="email">
              <el-input v-model="student.email" class="el-input" />
            </el-form-item>
            <el-form-item label="QQ号码" prop="qqNumber">
              <el-input v-model="student.qqNumber" class="el-input" />
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="student.phone" class="el-input" />
            </el-form-item>
            <el-form-item label="身份证号" prop="identityCard">
              <el-input v-model="student.identityCard" class="el-input" />
            </el-form-item>
            <el-form-item label="学生学号" prop="stuNumber">
              <el-input v-model="student.stuNumber" class="el-input" />
            </el-form-item>
            
          </el-main>
        </el-container>
        <el-form-item label="个性签名" prop="signature" class="textarea" >
          <el-input type="textarea" :rows="1" placeholder="请输入内容" v-model="student.signature"/>
        </el-form-item>
        <el-form-item label="个人简介" prop="introduction" class="textarea" >
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="student.introduction"/>
        </el-form-item>
        <el-form-item label="所属班级" prop="classes">
          <el-transfer
            style="text-align: left; display: inline-block"
            v-model="value"
            filterable
            :left-default-checked="[2, 3]"
            :right-default-checked="[1]"
            :titles="['所有班级', '指定班级']"
            :button-texts="['到左边', '到右边']"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'
            }"
            @change="handleChange"
            :data="data">
          <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
          <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
          <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
        </el-transfer>
        </el-form-item>

      </el-form>
      <el-row style="width: 65%;margin: auto;background-color: #FFFFFF;">
  
      </el-row>
      <div slot="footer" class="dialog-footer" style="padding-bottom: 25px;">
        <el-button @click="$router.push('/index/students')">返 回</el-button>
        <el-button type="primary" @click="handleSubmitForm">确 定</el-button>
      </div>
    </div>
  </template>
  
  <script>
  import commonOperate from "@/api/common";
  import operate from "./operate";
  
  export default {
    name: "UpdateStudentForm",
    created() {
      this.id = this.$route.params.id;
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
        this.student.photo = res.data
        this.avatar = res.data;
      },
      initFormForUpdate() {
        if(this.id){
          operate.getStudent(this.id).then(res => {
            console.log("运行initFormForUpdate")
            console.log(res)
            this.student.level = res.level;
            this.student = res;
            // 图像回显
            this.avatar = res.photo;
            this.student.classes.forEach((obj,index) =>{
              console.log(obj)
              this.$set(this.value,index,obj.id)
            })
            console.log()
          });
        }
      },
      handleSubmitForm: function () {
        console.log(this.student)
        operate.submitStudentForm(this.student).then((res) => {
          this.$message.success(res.msg);
          this.$router.push('/index/students');
        }).catch((error) => {
          this.$message.error(error.msg);
        });
      },
      handleChange(value, direction, movedKeys) {
        // console.log(value, direction, movedKeys);
        console.log(value);
        console.log(111, this.student.classes)
        this.student.classes = value
        console.log(this.student.classes)
        
      }
    },
    data() {
      const generateData = _ => {
        const data = [];
        operate.getClassTransfer().then((res)=>{
          console.log(res)
          for (let i = 0; i < res.length; i=i+1){
            data.push({
              key: res[i].key,
              label: res[i].label,
            });
            console.log(res[i])
          }
          console.log(data)
        })
        
        return data;
      };
      return {
        data: generateData(),
        value: [],
        renderFunc(h, option) {
          return <span>{ option.key } - { option.label }</span>;
        },
        id: 0,
        avatar: '',
        students: [],
        student: {
          id: 0,
          classId: '',
          stuNumber: '',
          email: '',
          identityCard: '',
          introduction: '',
          name: '',
          nickname: '',
          password: '',
          phone: '',
          photo: '',
          qqNumber: '',
          sex: '',
          signature: '',
          // stuNumber: '',
          // studentId: '',
          username: '',
          classes: this.value,
        },
        
      }
    }
  }
  </script>
  
  <style scoped>
  .avatar-uploader {
    width: 200px;
    height: 200px;
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
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
  }
  
  .avatar {
    width: 200px;
    height: 200px;
    display: inline-block;
  }

  .el-input {
  }

  .el-aside {
    float: right;
  }
  .el-form-item {
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 10px;
  }
  
  .textarea {
    display: block;
  
  }

  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
  </style>
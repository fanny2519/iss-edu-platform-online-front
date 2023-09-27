<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="handleClose">
    <el-form class="el-form" :model="student" label-position="left" label-width="90px" ref="StudentForm">
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
          <el-aside class="el-aside" style="width: 180px;display: flex;justify-content: center;padding-bottom: 20px;">
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

      <el-form-item label="所属班级">

        <!-- :button-texts="['到左边', '到右边']" -->
        <el-transfer
          style="text-align: left; display: block; padding: 0px"
          v-model="value"
          filterable
          :left-default-checked="[0]"
          :right-default-checked="[0]"
          :titles="['所有班级', '指定班级']"
          
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
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible=false">取 消</el-button>
      <el-button type="primary" @click="handleSubmitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import commonOperate from "@/api/common";
import operate from "./operate";

export default {
  name: "StudentForm",
  created() {
  },
  methods: {
    beforeAvatarUpload: function (file) {
      commonOperate.beforeAvatarUpload(file);
    },
    handleAvatarSuccess: function (res) {
      this.$message.success(res.msg);
      // this.avatar = this.$avatarUrl + res.data
      this.student.cover = res.data;
      this.student.photo = res.data;
      this.avatar = res.data
    },
    startInsert: function () {
      this.title = 'Insert Student Information';
      this.dialogFormVisible = true;
    },
    handleClose: function () {
      this.avatar = '';
      this.fileList = [];
      this.$refs['studentForm'].resetFields();
    },
    handleChange(value, direction, movedKeys) {
        console.log(value)
    },
    handleSubmitForm: function () {
      console.log(this.student)
      operate.submitStudentForm(this.student).then(res => {
            if (res.operate) {
              this.$message.success(res.msg);
              this.dialogFormVisible = false;
              this.$parent.getPage();
            } else {
              this.$message.error(res.msg);
            }
          }
      ).catch(error => {
      })
    }
  },
  data() {
    const generateData = _ => {
        const data = [];
        operate.getClassTransfer().then((res)=>{
          console.log(res)
          // 遍历数据源
          for (let i = 0; i < res.length; i=i+1){
            data.push({
              key: res[i].key,
              label: res[i].label,
            });
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
      dialogFormVisible: false,
      title: '',
      fileList: [],
      avatar: '',
      id: 0,
      student: {
          id: 0,
          classId: '',
          email: '',
          identityCard: '',
          introduction: '',
          name: '',
          nickname: '',
          password: '',
          phone: '',
          photo: '',
          qqNumber: '',
          stuNumber: '',
          sex: '',
          signature: '',
          username: '',
          classes: this.value,
        },
    }
  }
}
</script>

<style scoped>
.el-form{
  width: 730px;
}

.avatar-uploader {
  width: 180px;
  height: 180px;
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
  width: 180px;
  height: 180px;
  line-height: 180px;
  text-align: center;
}

.avatar {
  width: 180px;
  height: 180px;
  display: inline-block;
}

.el-aside {
  float: right;
  width: 180px;
}

.el-input{
  width: 160px;
  margin-right: 20px;
}
.el-form-item {
  display: inline-block;

}

.textarea {
  display: block;

}

.transfer-footer{
  padding: 0px;
}

.el-transfer__buttons {
  padding: 0;
}
</style>
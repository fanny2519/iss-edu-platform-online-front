<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="handleClose">
    <el-form :model="teacher" label-position="left" label-width="90px" ref="teacherForm">
      <el-container>
        <el-main style="padding: 0;">
          <el-form-item label="账号" prop="username">
            <el-input v-model="teacher.username" style="width: 300px"/>
          </el-form-item>
          <el-form-item label="姓名" prop="nickname">
            <el-input v-model="teacher.nickname" style="width: 300px"/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="teacher.password" style="width: 300px"/>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="teacher.phone" style="width: 300px"/>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="teacher.email" style="width: 300px"/>
          </el-form-item>
          <el-form-item label="级别" prop="level">
            <el-radio-group v-model="teacher.level">
              <el-radio :label="0">高级讲师</el-radio>
              <el-radio :label="1">中级讲师</el-radio>
              <el-radio :label="2">初级讲师</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-main>
        <el-aside style="width: 305px;display: flex;justify-content: center;padding-bottom: 20px;">
          <el-upload name="avatar" class="avatar-uploader" :show-file-list="false" :action="this.$uploadAvatar"
                     :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="avatar" :src="avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-aside>
      </el-container>
      <el-form-item label="教师简介" prop="introduction">
        <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="teacher.introduction"/>
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
  name: "TeacherForm",
  created() {
    // operate.getTeachersForSelect().then(res => {
    //   this.teachers = res;
    // });
  },
  methods: {
    beforeAvatarUpload: function (file) {
      commonOperate.beforeAvatarUpload(file);
    },
    handleAvatarSuccess: function (res) {
      this.$message.success(res.msg);
      this.avatar = this.$avatarUrl + res.data
      this.teacher.cover = res.data;
      this.teacher.photo = res.data;
    },
    startInsert: function () {
      this.title = 'Insert Course Information';
      this.dialogFormVisible = true;
    },
    handleClose: function () {
      this.avatar = '';
      this.fileList = [];
      this.$refs['teacherForm'].resetFields();
    },
    handleSubmitForm: function () {
      console.log(this.teacher)
      operate.submitTeacherForm(this.teacher).then(res => {
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
    return {
      dialogFormVisible: false,
      title: '',
      fileList: [],
      avatar: '',
      teachers: [],
      id: 0,
      teacher: {
        id: 0,
        username: '',
        nickname: '',
        password: '',
        classHour: '',
        phone: '',
        email: '',
        photo: '',
        level: '',
        introduction: '',
        cover: this.avatar
      }
    }
  }
}
</script>

<style scoped>
.avatar-uploader {
  width: 305px;
  height: 280px;
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
  line-height: 280px;
  text-align: center;
}

.avatar {
  width: 305px;
  height: 280px;
  display: block;
}
</style>
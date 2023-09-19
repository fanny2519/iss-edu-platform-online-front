<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="handleClose">
    <el-form :model="course" label-position="left" label-width="90px" ref="courseForm">
      <el-container>
        <el-main style="padding: 0;">
          <el-form-item label="课程名称" prop="name">
            <el-input v-model="course.name" style="width: 300px"/>
          </el-form-item>
          <el-form-item label="授课讲师" prop="teacher.id">
            <el-select v-model="course.teacher.id" filterable placeholder="请选择" style="width: 300px">
              <el-option v-for="item in teachers" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程类型" prop="isPrivate">
            <el-radio-group v-model="course.isPrivate">
              <el-radio :label="0">公开课</el-radio>
              <el-radio :label="1">内部课</el-radio>
              <el-radio :label="2">定制课</el-radio>
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
      <el-form-item label="课程课时" prop="classHour">
        <el-input v-model="course.classHour" style="width: 300px"/>
      </el-form-item>
      <el-form-item label="课程资料" prop="name">
        <el-upload name="material" class="upload-demo" :file-list="fileList" :multiple="true" :limit="10"
                   :action="this.$uploadAvatar" :on-exceed="handleMaterialsExceed" :on-remove="handleMaterialsRemove" :before-remove="beforeRemove"
                   :on-success="handleMaterialsSuccess">
          <el-button size="small" type="primary">点击上传</el-button>
          <span slot="tip" class="el-upload__tip" style="padding-left: 15px;color: #59A6D5;">只能上传 .doc/.docx/.xls/.xlsx/.ppt/.pptx/.pdf 类型的文件，且不超过10M</span>
        </el-upload>
      </el-form-item>
      <el-form-item label="课程简介" prop="introduction">
        <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="course.introduction"/>
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
  name: "CourseForm",
  created() {
    operate.getTeachersForSelect().then(res => {
      this.teachers = res;
    });
  },
  methods: {
    beforeAvatarUpload: function (file) {
      commonOperate.beforeAvatarUpload(file);
    },
    handleAvatarSuccess: function (res) {
      this.$message.success(res.msg);
      this.avatar = this.$avatarUrl + res.data
      this.course.cover = res.data;
    },
    startInsert: function () {
      this.title = 'Insert Course Information';
      this.dialogFormVisible = true;
    },
    handleMaterialsExceed: function (files, fileList) {
      this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleMaterialsSuccess: function (res) {
      if (res.operate) {
        this.course.materials.push({
          name: res.data.dbname,
          path: res.data.localname
        });
      }
    },
    beforeRemove: function (file) {
      return this.$confirm('确定移除' + file.name + '？');
    },
    handleMaterialsRemove: function (file, fileList) {
      console.log(file, fileList);
    },
    handleClose: function () {
      this.avatar = '';
      this.fileList = [];
      this.$refs['courseForm'].resetFields();
    },
    handleSubmitForm: function () {
      operate.submitCourseForm(this.course).then(res => {
            if (res.operate) {
              this.$message.success(res.msg);
              this.dialogFormVisible = false;
              this.$parent.getPage();
            } else {
              this.$message.error(res.msg);
            }
          }
      );
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      title: '',
      fileList: [],
      avatar: '',
      teachers: [],
      course: {
        id: 0,
        name: '',
        introduction: '',
        classHour: '',
        isPrivate: 0,
        catalogues: [],
        materials: [],
        teacher: {
          id: null
        },
        cover: this.avatar
      }
    }
  }
}
</script>

<style scoped>
.avatar-uploader {
  width: 305px;
  height: 120px;
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
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.avatar {
  width: 305px;
  height: 120px;
  display: block;
}
</style>
<template>
  <el-dialog title="Upload Materials" :visible.sync="dialogFormVisible" @close="handleClose">
    <el-form :model="course" label-position="left" label-width="90px" ref="courseForm">
      <el-form-item label="课程资料" prop="name">
        <el-upload name="material" class="upload-demo" :file-list="fileList" :multiple="true" :limit="10"
                   action="http://localhost:8081/edu-platform/background/upload/uploadMaterial"
                   :on-exceed="handleMaterialsExceed" :on-remove="handleMaterialsRemove" :before-remove="beforeRemove" :on-success="handleMaterialsSuccess">
          <el-button size="small" type="primary">点击上传</el-button>
          <span slot="tip" class="el-upload__tip" style="padding-left: 15px;color: #59A6D5;">只能上传 .doc/.docx/.xls/.xlsx/.ppt/.pptx/.pdf 类型的文件，且不超过10M</span>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible=false">取 消</el-button>
      <el-button type="primary" @click="handleSubmitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

import operate from "@/pages/course/operate";

export default {
  name: "uploadMaterials",
  methods: {
    startUploadMaterials: function (id) {
      this.course.id = id
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
      this.fileList = [];
      this.$refs['courseForm'].resetFields();
    },
    handleSubmitForm: function () {
      operate.submitUploadForm(this.course).then(res => {
        if (res.operate) {
          this.$message.success(res.msg);
          this.dialogFormVisible = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      fileList: [],
      course: {
        id: 0,
        catalogues: [],
        materials: [],
      }
    }
  }
}
</script>

<style scoped>

</style>
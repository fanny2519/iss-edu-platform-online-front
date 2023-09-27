<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="handleClose">
    <el-form class="el-form" :model="student" label-position="left" label-width="90px" ref="StudentClass">
      <el-form-item label="">
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
  props: {
    ids: Array,
    required: true
  },
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
      this.title = 'Student Class Information';
      this.dialogFormVisible = true;
      console.log(this.ids)
    },
    handleClose: function () {
      this.avatar = '';
      this.fileList = [];
      this.dialogFormVisible = false;
      // this.$refs['studentClass'].resetFields();
    },
    handleChange(value, direction, movedKeys) {
        // console.log(value)
        this.ids.forEach((obj,index) =>{
          console.log(obj.id)
          this.student.id.push(obj.id)
        })
        this.student.classes = this.value
        console.log(this.student.id)
    },
    handleSubmitForm: function () {
      console.log(this.student)
      operate.linkClasses(this.student.id, this.student.classes).then(res => {
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
      student: {
          id: [],
          classes: [],
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
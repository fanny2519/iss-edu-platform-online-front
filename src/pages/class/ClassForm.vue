<template>
  <div>
    <el-button type="text" @click="dialogFormVisible = true"></el-button>
    <el-dialog :title="title" class="dialog-container" :visible.sync="dialogFormVisible" @close="handleClose">   
        <el-form label-position="left" :model="classes" ref="classesForm" label-width="90px" class="dialog-body">
            <el-container>
                <el-main style="padding:0;">
                    <el-form-item label="是否私密" prop="isPrivate" >
                        <el-radio-group v-model="classes.isPrivate">
                            <el-radio :label="0">公开班级</el-radio>
                            <el-radio :label="1">私密班级</el-radio>
                        </el-radio-group>
                    </el-form-item> 
                    <el-form-item label="班级名称" prop="name">
                        <el-input v-model="classes.name" autocomplete="off" style="width:250px;"></el-input>
                    </el-form-item>
                </el-main>
                <el-aside style="width: 305px;display: flex;justify-content: center;padding-bottom: 20px;">
                    <el-upload 
                        name="avatar" class="avatar-uploader" 
                        :action="this.$uploadAvatar"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess" 
                        :before-upload="beforeAvatarUpload">
                        <img v-if="avatar" :src="avatar" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-aside>
            </el-container>
            <el-form-item label="班级简介" prop="signature">
                <el-input type="textarea" :rows="2" v-model="classes.signature" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="班主任" prop="teachers">
                <el-transfer filterable 
                  :filter-method="filterMethod" 
                  v-model="checkedData" 
                  :data="transferData" 
                  :right-default-checked="checkedData" 
                  :titles="['所有老师','指定老师']" 
                  filter-placeholder="请输入老师名称" 
                  style="width:100%;display:flex;justity-conytent:center;align-items:center">
                </el-transfer>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm()">取 消</el-button>
            <el-button type="primary" @click="submitForm()">确 定</el-button>
        </div>
    </el-dialog>

  </div>

</template>

<script>
// import commonOperate from "@/api/common";
import operate from "./operate";

  export default {
    name:"ClassForm",
    data() {
        return {
            title: '',
            dialogFormVisible:false,
            avatar: '',
            transferData:[],
            checkedData:[],
            classes:{
                id: 0,
                name: '',
                isPrivate: 0,
                signature: '',
                teachers:[],
                cover: this.avatar
            }
        }
    },
    mounted() {
      operate.getTransferData().then(res =>{
        this.transferData = res;
        console.log(this.transferData);
      })
    },
    methods: {
        startInsert(){
            this.title = "Insert Class Information";
            this.dialogFormVisible = true;
        },
        startUpdate(id){
          operate.getClass(id).then(res => {
            console.log(res)
            this.classes = res;
            this.avatar = this.$avatarUrl + res.cover;
            this.classes.teachers.forEach((obj,index) =>{
              console.log(obj)
              this.$set(this.checkedData,index,obj.id)
            })
          })
          this.title = "Update Class Information"
          this.dialogFormVisible = true;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt10M = file.size / 1024 / 1024 < 200;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt10M) {
                this.$message.error('上传头像图片大小不能超过 200MB!');
            }
            return isJPG && isLt10M;
        },
        handleAvatarSuccess(res) {
            console.log(res)
            this.$message.success(res.msg);
            this.avatar = this.$avatarUrl + res.data
            this.classes.cover = res.data;
        },
        filterMethod(query,item){
          return item.query.indexOf(query) > -1;
        },
        handleClose(){
            this.avatar = '';
            this.$refs['classesForm'].resetFields();
            this.checkedData = [];
        },
        resetForm(){
            this.dialogFormVisible = false
            this.$refs['classesForm'].resetFields();
            this.checkedData = [];
        },
        submitForm(){
            this.checkedData.forEach((id,index) => {
              console.log(id,index)
              this.classes.teachers[index]={id:id}
            })
            operate.submitClassForm(this.classes).then(res =>{
              // console.log(this.classes)
                if (res.operate) {
                    this.$message.success(res.msg);
                    this.dialogFormVisible = false;
                    this.$parent.getPage();
                } else {
                    this.$message.error(res.msg);
                }
            })
        }

    },
  };
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


.dialog-container{
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
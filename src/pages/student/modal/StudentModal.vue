<template>
  <el-dialog
    :title="title"
    width="50%"
    :visible.sync="visible"
    :destroy-on-close="true"
    :close-on-click-modal="false">
    <div v-loading="confirmLoading">
      <!-- :readOnly="disableSubmit" -->
        <el-form ref="form" :disabled="type=='view'" label-position="right" label-width="80px" :rules="rules" :model="form">
          <el-form-item label="照片"  prop="photo">
            <el-upload name="avatar" class="avatar-uploader" :show-file-list="false" :action="this.$uploadAvatar"
                     :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <el-avatar 
              v-if="form.photo"
              shape="square" 
              :size="95" 
              :src="avatarUrl + form.photo"
              style="vertical-align: middle;"/>
            <el-button v-else icon="el-icon-circle-plus" type="primary"></el-button>
          </el-upload>
            
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="form.nickname"  placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="stuNumber">
            <el-input v-model="form.stuNumber"  placeholder="请输入学号"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select
              v-model="form.sex"
              placeholder="请选择性别"
              class="w100">
              <el-option v-for="item in sexOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="form.phone"  placeholder="请输入手机"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password"  placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email"  placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="QQ号" prop="qqNumber">
            <el-input v-model="form.qqNumber"  placeholder="请输入QQ号"></el-input>
          </el-form-item>
          <el-form-item label="身份证" prop="identityCard">
            <el-input v-model="form.identityCard"  placeholder="请输入身份证"></el-input>
          </el-form-item>
          <el-form-item label="个性签名" prop="signature">
            <el-input 
                v-model="form.signature" 
                placeholder="请输入个性签名"
                type="textarea"
                :rows="2"/>
          </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleOk" :loading="confirmLoading" :disabled="disableSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import request from "@/http/axios";
import { beforeAvatarUpload } from "@/api/common";

export default {
  name:'StudentModal',
  data () {
    //这里存放数据
    return {
      avatarUrl: this.$avatarUrl,
      title:"操作",
      visible: false,
      sexOptions:[{label:'男',value:1}, {label:'女',value:0}],
      form: {
        photo:'',
        username:'',
        nickname:'',
        stuNumber:'',
        sex:'',
        phone:'',
        password:'',
        email:'',
        qqNumber:'',
        identityCard:'',
        signature:''
      },
      disableSubmit: false,
      confirmLoading:false,
      // 表单校验
      rules: {
        photo: [ { required: true, message: "请上传照片", trigger: "blur" }],
        username: [ { required: true, message: "请输入用户名", trigger: "blur" }],
        nickname: [{ required: true, message: "请选择昵称", trigger: "blur" }],
        stuNumber: [ { required: true, message: "请输入学号", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        phone: [{
          required: true,
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入手机号码",
            trigger: "blur"
          },
          { min:10, max: 11, message: '手机号码长度必须介于 10 和 11 之间', trigger: 'blur' }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [ {
          required: true,
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur"]
          }],
        qqNumber: [ { required: true, message: "请输入QQ号", trigger: "blur" }],
        identityCard: [ { required: true, message: "请输入身份证", trigger: "blur" }],
        signature: [{ required: true, message: "请输入个性签名", trigger: "blur" }],
      },
      type: null,
      school: {
        number: "",
      },
      url: {
        add: '/student/insertStudent',
        edit: 'student/updateStudent',
      },
    };
  },
  methods: {
    beforeAvatarUpload: function (file) {
      const isLt10M = file.size / 1024 / 1024 < 200;
      if (!isLt10M) {
          this.$message.error('上传头像图片大小不能超过 200MB!');
      }
      return isLt10M;
    },
    handleAvatarSuccess: function (res) {
      this.$message.success(res.msg);
      this.form.photo = res.data;
      console.log(form)
    },
    add () {
      console.log('add');
      this.type = 'add';
      this.form = {
        photo:'',
        username:'',
        nickname:'',
        stuNumber:'',
        sex:'',
        phone:'',
        password:'',
        email:'',
        qqNumber:'',
        identityCard:'',
        signature:''
      }
      this.visible = true;
      // this.$nextTick(()=>{
      //   this.$refs.form.resetFields();
      // })
    },
    edit (record) {
      console.log('edit record:', record);
      this.type = 'edit';//je 没有
      this.form = Object.assign({}, record);
      this.visible = true;
    },
    close () {
      console.log('close resetFields');
      this.form ={};
      this.$refs.form.resetFields();
      this.$emit('close');
      this.visible = false;
    },
    handleCancel () {
      this.close()
    },
    handleOk () {
      const that = this;
      this.$refs.form.validate((valid) => {
        if (valid) {
          that.confirmLoading = true;
          let httpurl = '';
          let data = this.form;
          if(this.form.id){//编辑
            httpurl+=this.url.edit;
          }else{
            httpurl+=this.url.add;
          }
          request({ url: httpurl, method: 'post', data}).then((res)=>{
            console.log('res:', res);
            if(res.operate){
              that.$message.success(res.msg);
              that.$emit('ok');
              that.close();
            }else{
              that.$message.error(res.msg);
            }
          }).catch((error)=>{
            that.$message.error(error);
          }).finally(() => {
            that.confirmLoading = false;
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

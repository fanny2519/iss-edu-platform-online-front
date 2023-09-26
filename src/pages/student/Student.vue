<template>
  <el-card>
    <Breadcrumb title="学生"/>

    <el-row style="width: 99%;margin: auto;height: 50px;" type="flex" align="middle">
      <el-col :span="18">
        <el-button class="btn-tools" plain size="small" icon="el-icon-plus" @click="handleAdd">新增</el-button>
        <el-button class="btn-tools" plain size="small" icon="el-icon-delete" @click="batchDel">批量删除</el-button>
        <el-button class="btn-tools" plain size="small" icon="el-icon-link"  @click="handleLinkClass">关联班级信息</el-button>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入昵称" v-model="queryParam.queryValue" size="medium" clearable @clear="searchReset">
          <el-button slot="append" icon="el-icon-search" @click="searchQuery"></el-button>
        </el-input>
      </el-col>
    </el-row>

    <el-row style="width: 99%;margin: auto;background-color: #FFFFFF;">
      <el-table 
        :data="dataSource" 
        :border="true" 
        size="small" 
        v-loading="loading"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" prop="id" align='center' width="40"/>
        <el-table-column type='index' label="照片" width="100" align='center'>
          <template v-slot="scope">
            <el-image fit="contain" :src="avatarUrl + scope.row.photo" style="vertical-align: middle;"/>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" align="center"/>
        <el-table-column prop="nickname" label="昵称" align="center"/>
        <el-table-column prop="stuNumber" label="学号" align="center"/>
        <el-table-column prop="sex" label="性别" align="center">
          <template v-slot="scope">  {{ scope.row.sex?'男':'女' }}</template>
        </el-table-column>
        <el-table-column prop="phone" label="手机" align="center"/>
        <el-table-column prop="password" label="密码" align="center"/>
        <el-table-column prop="email" label="邮箱" align="center"/>
        <el-table-column prop="qqNumber" label="QQ号" align="center"/>
        <el-table-column prop="identityCard" label="身份证" align="center"/>
        <el-table-column prop="signature" label="个性签名" align="center" width="210"/>
        <el-table-column label="操作" align="center"  width="150" fixed="right">
          <template v-slot="scope">
            <el-button size="mini" operate="operate='modify'" @click="handleEdit(scope.row)">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm title="确定删除吗?" @confirm="() => handleDelete(scope.row.id)">
              <el-button slot="reference" size="mini" type="danger">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="page-row">
      <el-pagination 
        style="padding: 0px;" 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        :page-sizes="ipagination.pageSizeOptions"
        :current-page="ipagination.pageNum" 
        :page-size="ipagination.pageSize" 
        :total="ipagination.total" 
        :layout="ipagination.layout"/>
    </el-row>
    <StudentModal ref="modalForm" @ok="modalFormOk"></StudentModal>
    <el-dialog
      title="绑定班级"
      width="50%"
      :visible.sync="visible2"
      :destroy-on-close="true"
      :close-on-click-modal="false">
      <div class="flex-center">
        <el-select
          v-model="classId"
          placeholder="请选择班级"
          class="w100">
          <el-option v-for="item in class_list"
            :key="item.key"
            :label="item.label"
            :value="item.key"
          ></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible2=false">取 消</el-button>
        <el-button type="primary" @click="handleBindClass">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import listMixin from '@/http/listMixin'
import Breadcrumb from '@/components/Breadcrumb'
import StudentModal from './modal/StudentModal'
import axios from "@/http/axios";
export default {
  name:'Student',
  components: { Breadcrumb, StudentModal },
  mixins: [listMixin],
  data(){
    return {
      avatarUrl: this.$avatarUrl,
      url:{
        list:'/student/getPage',
        deleteBatch:'/student/deletes',
        delete:'/student/delete',
        linkClass:'/class/getTransfer'
      },
      visible2:false,
      class_list:[],
      classId:'',
    }
  },
  created() {
    this.loadClassList();
  },
  methods: {
    handleLinkClass(){
      if (this.selectionRows.length !== 1) {
        this.$message.warning('请选择1条学生！');
        return
      }
      this.visible2 = true;
    },
    handleBindClass(){
      if(!this.classId){
        this.$message.warning('请选择班级！');
        return
      }
      let data = {
        "studentId":this.selectionRows[0].id,
        "classId":this.classId
        };
      var that = this;
      axios({
        url: '/student/bindingClass',
        method: 'post',
        data
      }).then((res) => {
        console.log('handleBindClass res:', res);
        if (res.operate) {
          that.$message.success(res.msg);
          that.visible2 =false;
        } else {
          that.$message.warning(res.msg);
        }
      });
    },
    loadClassList(){
      var that = this;
      axios({
        url: '/class/getTransfer',
        method: 'get',
      }).then((res) => {
        console.log('handleLinkClass res:', res);
        that.class_list = res;
      });
    }
  }
}
</script>
<style scoped>
.flex-center{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
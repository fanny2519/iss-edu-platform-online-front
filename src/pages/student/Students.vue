<template>
  <div v-if="tableData">
    <el-row style="width: 100%;margin: auto;height: 40px;">
      <el-breadcrumb separator="/" style="margin: 20px ">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>学生</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row style="width: 99%;margin: auto;height: 50px;" type="flex" align="middle">
      <el-col :span="18">
        <el-button class="btn-tools" plain size="small" icon="el-icon-plus" @click="handleInsert">新增</el-button>
        <el-button class="btn-tools" plain size="small" icon="el-icon-delete" @click="handleDeletes">批量删除</el-button>
        <el-button class="btn-tools" plain size="small" icon="el-icon-link" @click="associateClasses" >关联班级</el-button>
        <el-button class="btn-tools" plain size="small" icon="el-icon-link" @click="bulkImport" >批量导入</el-button>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="queryValue" size="medium">
          <el-button slot="append" icon="el-icon-search" @click="handleQuery"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row style="width: 99%;margin: auto;background-color: #FFFFFF;">
      <el-table ref="StudentTable" :data="tableData" :border="true" size="small">
        <el-table-column type="selection" prop="id" v-model="ids" align='center' width="40"/>
        <el-table-column type='index' label="照片" width="100" align='center'>
          <template v-slot="scope">
            <el-avatar shape="square" :size="75" :src="avatarUrl + scope.row.photo"
                       style="vertical-align: middle;"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="登陆账号" width="200" align="center"/>
        <el-table-column prop="nickname" label="用户姓名" width="200" align="center"/>
        <el-table-column prop="stuNumber" label="学号" width="200" align="center"/>
        <el-table-column prop="phone" label="手机" width="200" align="center"/>
        <el-table-column prop="email" label="邮箱" width="320" align="center"/>
        <el-table-column prop="lastUpdate" label="添加时间" width="180" align="center">

        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-button size="mini" operate="operate='modify'" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="page-row">
      <el-pagination style="padding: 0px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 10, 20, 30, 40, 50]"
                     :current-page="pageNum" :page-size="pageSize" :total="pageTotal" layout="prev, pager, next, jumper, sizes, total"/>
    </el-row>

    <student-form ref="StudentForm"></student-form>
    <student-class ref="StudentClass" :ids="rows"></student-class>

  </div>
</template>

<script>

import operate from './operate'
import commonOperate from "@/api/common";
import StudentForm from './StudentForm.vue';
import UpdateStudentForm from './UpdateStudentForm.vue';
import StudentClass from './StudentClass.vue';

export default {
  name: "students",
  components: { StudentForm, UpdateStudentForm, StudentClass },
  created() {
    this.getPage();
  },
  methods: {
    getPage() {
      operate.getPage(this.pageNum, this.pageSize, this.queryValue).then(res => {
        this.tableData = res.rows;
        // 调试
        // console.log(res.rows)
        this.pageTotal = res.total;
        this.pageNum = res.pageNum;
      });
    },
    handleCurrentChange: function (currentPage) {
      this.pageNum = currentPage;
      this.getPage();
    },
    handleSizeChange: function (pageSize) {
      this.pageSize = pageSize;
      this.getPage();
    },
    handleQuery: function () {
      this.getPage();
    },
    // handleFormate: function (row, column, cellValue) {
    //   let sex = '';
    //   switch (cellValue) {
    //     case 0:
    //       sex = '男';
    //       break;
    //     case 1:
    //       sex = '女';
    //       break;
    //   }
    //   return sex;
    // },
    handleInsert: function () {
      this.$refs['StudentForm'].startInsert();
    },
    handleEdit: function (id) {
      this.$router.push('/index/students/updateStudent/' + id);
    },
    handleDelete: function (id) {
      commonOperate.deleteObject.call(this).then(() => {
        operate.deleteStudent(id).then(res => {
          if (res.operate) {
            this.$message.success(res.msg);
            this.getPage();
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
    handleDeletes: function () {
      let rows = this.$refs.StudentTable.selection;
      if (rows.length == 0) {
        this.$message.info('请选择需要删除的数据进行操作！');
        return;
      }
      commonOperate.deleteObject.call(this).then(() => {
        let ids = '';
        rows.forEach(row => {
          ids += ',' + row.id;
        });
        operate.deleteStudents(ids.substring(1)).then(res => {
          if (res.operate) {
            this.$message.success(res.msg);
            this.getPage();
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
    // 关联班级
    associateClasses(){
      this.rows = this.$refs.StudentTable.selection;
      if (this.rows.length == 0) {
        this.$message.warning('请选择1条学生数据！');
        return;
      } else {
        this.$refs['StudentClass'].startInsert();
        console.log(this.rows)
        this.ids = this.rows
        console.log(this.ids)
      }
      
    },
    bulkImport(){}
  },
  data() {
    return {
      avatarUrl: this.$avatarUrl,
      rows: [],
      ids: [],
      tableData: '',
      pageNum: 1,
      pageSize: 5,
      pageTotal: 0,
      queryValue: '',
    }
  }
}
</script>

<style scoped>

.page-row {
  width: 99%;
  margin: auto;
  background-color: #FFFFFF;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center
}

.el-pagination {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  width: 80px;
}
</style>

<template>
  <div class="catalogue">
    <el-row>
      <el-col :span="24" style="text-align: center;margin-left: 12px;"><h2>{{ '课程：' + this.title }}</h2></el-col>
    </el-row>
    <el-table ref="catalogueTable" :data="tableData" row-key="id" :border="true" size="small" style="margin:auto;"
              :lazy="true" :load="load" :header-row-style="headerRowStyle"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="name" label="目 录" header-align="center" align="left"></el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot="header">
          <el-button class="btn-tools" plain size="mini" icon="el-icon-plus" @click="handleInsertRoot">新增章节</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" title="新增小节" icon="el-icon-plus" @click="handleInsert(scope.row)" style="border: 0;"></el-button>
          <el-button size="mini" title="删除小节" icon="el-icon-delete" @click="handleDelete(scope.row, scope.$index)" style="border: 0;"></el-button>
          <el-button size="mini" title="关联资源" v-show="scope.row.pid != 0" icon="el-icon-coin" @click="handleLinkMaterials(scope.row.id)" style="border: 0;"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  -->
    <el-dialog title="Linked Materials" :visible.sync="dialogMaterialsVisible" @close="handleClose">
      <el-form :model="catalogue" label-position="left" label-width="90px" ref="materialForm">
        <el-form-item label="课程资料" prop="name">
          <el-select v-model="catalogue.material.id" style="width: 620px">
            <el-option v-for="item in materialList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMaterialsVisible=false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import operate from "./operate";

export default {
  name: "CatalogueList",
  created() {
    operate.getCatalogues(0, this.courseId).then(res => {
      this.tableData = res;
    });
  },
  methods: {
    load(tree, treeNode, resolve) {
      operate.getCatalogues(tree.id, this.courseId).then(res => {
        resolve(tree.children = res);
      });
    },
    headerRowStyle: function ({rowIndex}) {
      if (rowIndex === 0) return 'font-size: 21px;';
    },
    handleLinkMaterials: function (id) {
      this.catalogue.id = id;
      operate.getMaterialsByCourseId(this.courseId).then(res => {
        this.materialList = res;
      });
      this.dialogMaterialsVisible = true;
    },
    handleSubmitForm: function () {
      operate.linkMaterials(this.catalogue).then(res => {
        if (res.operate) {
          this.$message.success(res.msg);
          this.$refs['materialForm'].resetFields();
          this.dialogMaterialsVisible = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleClose: function () {
      this.materialList = [];
    },
    handleInsertRoot() {
      this.$prompt('请输入章节名称：', '提示', {confirmButtonText: '确定', cancelButtonText: '取消'})
          .then(({value}) => {
            let node = {
              pid: 0, name: value, course: {id: this.courseId}, sort: this.tableData.length + 1
            }
            operate.insertCatalogue(node).then((res) => {
              if (res.operate) {
                node = res.data
                this.tableData.push(node);
              } else {
                this.$message.error(res.msg);
              }
            });
          });
    },
    handleInsert(row) {
      this.$prompt('请输入小节名称：', '提示', {confirmButtonText: '确定', cancelButtonText: '取消'}).then(({value}) => {
        let node = {
          pid: row.id, name: value, course: {id: this.courseId}, sort: row.children.length + 1
        }
        operate.insertCatalogue(node).then((res) => {
          if (res.operate) {
            node = res.data
            row.children.push(node);
            row.hasChildren = true;
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
    handleDelete(row, rowIndex) {
      this.$confirm('此操作将永久删除该数据及该节点下的子节点, 是否继续?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
        operate.deleteCatalogue(row.id, this.courseId).then((res) => {
          if (res.operate) {
            if (row.pid == 0) {
              this.tableData.splice(rowIndex, 1);
            } else {
              operate.iterator(this.tableData, row.id);
            }
          } else {
            this.$message.error(res.msg);
          }
        });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    }
  },
  data() {
    return {
      dialogMaterialsVisible: false,
      courseId: this.$route.params.id,
      title: this.$route.params.title,
      tableData: [],
      queryValue: '',
      materialList: [],
      catalogue: {
        id: 0,
        material: {}
      }
    }
  }
}
</script>

<style scoped>

.catalogue {
  /*border: 1px solid #ccc;*/
  /*border-radius: 5px;*/
  width: 98%;
  margin: auto;
  margin-top: 15px;
  min-height: calc(100% - 35px);
  margin-bottom: 15px;
}

/*
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 22px;
  padding-right: 8px;
}

/deep/ .el-tree-node.is-expanded > .el-tree-node__children {
  margin-top: 10px;
}

/deep/ .el-tree-node__children .custom-tree-node > span {
  font-size: 16px !important;
}

/deep/ .el-table__header-wrapper .cell {

}*/
</style>
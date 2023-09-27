<template>
    <div>
        <el-row style="width: 100%;margin: auto;height: 40px;">
            <el-breadcrumb separator="/" style="margin: 20px;">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>班级</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>
        <el-row style="width: 99%;margin: auto;height: 50px;" type="flex" align="middle">
            <el-col :span="18">
                <el-button class="btn-tools" plain size="small" icon="el-icon-plus" @click="handleInsert">新增</el-button>
                <el-button class="btn-tools" plain size="small" icon="el-icon-delete"
                    @click="handleDeletes">批量删除</el-button>
            </el-col>
            <el-col :span="6">
                <el-input placeholder="请输入内容" v-model="queryValue" size="medium">
                    <el-button slot="append" icon="el-icon-search" @click="handleQuery"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-row style="width: 99%;margin: auto;background-color: #FFFFFF;">
            <el-table ref="ClassTable" :data="tableData" :border="true" size="small">
                <el-table-column type="selection" prop="id" align='center' width="40" />
                <el-table-column prop="cover" label="封面" width="160" align="center">
                    <template v-slot="scope">
                        <el-image fit="contain" :src="avatarUrl + scope.row.cover" style="vertical-align: middle;" />
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="班级名称" align="center" width="200" />
                <el-table-column prop="signature" label="班级简介" header-align="center" align="left"
                    :show-overflow-tooltip="true" />
                <el-table-column prop="" label="班级人数" align="center" width="80" />
                <el-table-column prop="teacher.nickname" label="班主任" align="center" width="90" />
                <el-table-column prop="createTime" label="创建时间" width="90" align="center">
                    <template v-slot="scope">
                        {{ scope.row.createTime.split(' ')[1] }}<br> {{ scope.row.createTime.split(' ')[0] }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="230"> <!--fixed="right"-->
                    <template v-slot="scope">
                        <el-button size="mini" title="编辑班级" icon="el-icon-edit"
                            @click="handleUpdate(scope.row.id)"></el-button>
                        <el-button size="mini" title="关联课程" icon="el-icon-link"
                            @click="handleUploadMaterials(scope.row.id)"></el-button>
                        <el-button size="mini" title="添加计划" icon="el-icon-s-operation" @click="handlePlan(scope.row)"></el-button>
                        <el-button size="mini" icon="el-icon-delete" type="danger"
                            @click="handleDelete(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row class="page-row">
            <el-pagination style="padding: 0px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :page-sizes="[5, 10, 20, 30, 40, 50]" :current-page="pageNum" :page-size="pageSize" :total="pageTotal"
                layout="prev, pager, next, jumper, sizes, total" />
        </el-row>
        <class-form ref="ClassForm"></class-form>
        <upload-materials ref="UploadMaterials"></upload-materials>
    </div>
</template>

<script>

import operate from "./operate";
import ClassForm from './ClassForm';
import UploadMaterials from './UploadMaterials'
import commonOperate from "@/api/common";


export default {
    name: "classes",
    components: { ClassForm, UploadMaterials },
    created() {
        this.getPage();
    },
    methods: {
        getPage() {
            operate.getPage(this.pageNum, this.pageSize, this.queryValue).then(res => {
                this.tableData = res.rows;
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
        handlePlan: function (row) {
            // this.$refs['CatalogueTree'].openTree(this, row);
            this.$router.push('/index/classes/insertCatalogue/' + row.id + '/' + row.name);
        },
        handleInsert: function () {
            this.$refs['ClassForm'].startInsert();
        },
        handleUpdate: function (id) {
            this.$refs['ClassForm'].startUpdate(id);
        },
        handleDelete: function (id) {
            commonOperate.deleteObject.call(this).then(() => {
                operate.deleteClass(id).then(res => {
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
            let rows = this.$refs.ClassTable.selection;
            if (rows.length == 0) {
                this.$message.info('请选择需要删除的数据进行操作！');
                return;
            }
            commonOperate.deleteObject.call(this).then(() => {
                let ids = '';
                rows.forEach(row => {
                    ids += ',' + row.id;
                });
                operate.deleteClasss(ids.substring(1)).then(res => {
                    if (res.operate) {
                        this.$message.success(res.msg);
                        this.getPage();
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            });
        },
        handleUploadMaterials: function (id) {
            this.$refs['UploadMaterials'].startUploadMaterials(id);
        }
    },
    data() {
        return {
            dialogFormVisible: false,
            tableData: [],
            avatarUrl: this.$avatarUrl,
            pageNum: 1,
            pageSize: 5,
            pageTotal: 0,
            queryValue: ''
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
}

.el-tooltip__popper {
    max-width: 60%;
}

.el-upload {
    display: inline-block;
    text-align: center;
    cursor: pointer;
    outline: none;
}</style>
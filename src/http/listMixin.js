import axios from "@/http/axios";
export default {
  data(){
    return {
      /* 查询条件-请不要在queryParam中声明非字符串值的属性 */
      queryParam: {
        queryValue:'',
      },
      /* table加载状态 */
      loading:false,
      /* 数据源 */
      dataSource:[],
      /* table选中records*/
      selectionRows: [],
      ipagination:{
        pageNum: 1,
        pageSize: 10,
        pageSizeOptions: [5, 10, 20, 30, 40, 50],
        layout:"prev, pager, next, jumper, sizes, total",
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      url:null,
    }
  },
  created() {
    this.loadData();
  },
  methods:{
    loadData(arg) {
      if(!this.url.list){
        this.$message.error("请设置url.list属性!")
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.pageNum = 1;
      }
      var params = this.queryParam;//查询条件
      params.pageNum = this.ipagination.pageNum;
      params.pageSize = this.ipagination.pageSize;
      this.loading = true;
      
      axios({url:this.url.list, mothod:'get',params:params}).then((res) => {
        console.log('55 res:', res);
        if (res.rows) {
          this.dataSource = res.rows||[];
          this.ipagination.total = res.total || 0;
        }else{
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    handleCurrentChange (pageNumPage) {
      this.ipagination.pageNum = pageNumPage;
      this.loadData();
    },
    handleSizeChange (pageSize) {
      this.ipagination.pageSize = pageSize;
      this.loadData(1);
    },
    // 表格勾选
    handleSelectionChange(selection) {
      this.selectionRows = selection;
    },
    onClearSelected() {
      this.selectionRows = [];
    },
    searchReset() {
      this.queryParam = {}
      this.loadData(1);
    },
    searchQuery(){
      this.loadData(1);
      // 点击查询清空列表选中行
      this.selectionRows = []
    },
    handleAdd(){
      this.$refs.modalForm.add();
      this.$refs.modalForm.title = "新增";
      this.$refs.modalForm.disableSubmit = false;
    },
    handleEdit(record){
      this.$refs.modalForm.edit(record);
      this.$refs.modalForm.title = "编辑";
      this.$refs.modalForm.disableSubmit = false;
    },
    handleDetail:function(record){
      this.$refs.modalForm.edit(record);
      this.$refs.modalForm.title="详情";
      this.$refs.modalForm.disableSubmit = true;
    },
    modalFormOk() {
      // 新增/修改 成功时，重载列表
      this.loadData();
      //清空列表选中
      this.onClearSelected()
    },
    handleDelete(id){
      if(!this.url.delete){
        this.$message.error("请设置url.delete属性!")
        return
      }
      var that = this;
      axios({
        url: that.url.delete + '/' + id,
        method: 'get',
      }).then((res) => {
        console.log('handleDelete res:', res);
        if (res.operate) {
          that.$message.success(res.msg);
          that.loadData();
        } else {
          that.$message.warning(res.msg);
        }
      });
    },
    batchDel(){
      if(!this.url.deleteBatch){
        this.$message.error("请设置url.deleteBatch属性!")
        return
      }
      if (this.selectionRows.length <= 0) {
        this.$message.warning('请选择几条记录！');
        return
      }
      var ids = "";
      for (var a = 0; a < this.selectionRows.length; a++) {
        ids += this.selectionRows[a]['id'] + ",";
      }
      let str = ids.substring(0, ids.length -1)
      var that = this;
      this.$confirm("是否批量删除选中数据?", {}).then(() => {
        that.loading = true;
          axios({
            url: that.url.deleteBatch,
            method: 'get',
            params: {ids: str}
          }).then((res) => {
            if (res.operate) {
              that.$message.success(res.msg);
              that.loadData();
              that.onClearSelected();
            } else {
              that.$message.warning(res.msg);
            }
          }).catch(err => {
            console.log(err);
          }).finally(() => {
            that.loading = false;
          });
      }).catch(err => {
        console.log(err);
      });
    },
  }
}
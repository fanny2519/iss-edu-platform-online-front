<template>
  <el-row class="Breadcrumb">
    <el-breadcrumb separator="/" style="margin: 20px ">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </el-row>
</template>

<script>
export default {
  name:'Breadcrumb',
  props: {
      title: {
        type: String,
        default: '',
        required: true
      },
    },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.Breadcrumb{
  width: 100%;
  margin: auto;
  height: 40px;
  margin-bottom: 25px;
}
</style>
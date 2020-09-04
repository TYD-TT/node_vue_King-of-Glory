<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {
        name: "",
      },
    };
  },
  created() {
    this.id && this.fetch();
  },
  methods: {
    // 将新建的分类存入数据库
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/admin_users/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/admin_users", this.model);
      }
      console.log(res);
      this.$router.push("/admin_users/list");
      this.$message.success("保存成功！");
    },

    // 编辑分类时查找需要编辑的基本信息
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      this.model = res.data;
    },
    
    // 查询父级分类
  },
};
</script>

<style lang="less" scoped>
</style>
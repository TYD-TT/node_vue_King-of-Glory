<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="(item,key) in parents" :key="key" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
      parents: [],
    };
  },
  created() {
    this.id && this.fetch();
    this.fetchParents();
  },
  methods: {
    // 将新建的分类存入数据库
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`categories/${this.id}`, this.model);
      } else {
        res = await this.$http.post("categories", this.model);
      }
      console.log(res);
      this.$router.push("/categories/list");
      this.$message.success("保存成功！");
    },

    // 编辑分类时查找需要编辑的基本信息
    async fetch() {
      const res = await this.$http.get(`categories/${this.id}`);
      this.model = res.data;
    },
    
    // 查询父级分类
    async fetchParents() {
      const res = await this.$http.get(`categories`);
      console.log(res);
      this.parents = res.data;
    },
  },
};
</script>

<style lang="less" scoped>
</style>
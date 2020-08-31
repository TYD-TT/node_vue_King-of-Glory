<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items" border>
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/categories/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    // 查询已有分类
    async fetch() {
      const res = await this.$http.get("rest/categories");
      console.log(res);
      this.items = res.data;
    },
    // 删除分类
    async remove(row) {
      this.$confirm(`是否确定删除分类 "${row.name}" ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`rest/categories/${row._id}`);
        console.log(res);
        this.fetch();
        this.$message.success("删除成功!");
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
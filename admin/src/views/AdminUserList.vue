<template>
  <div>
    <h1>管理员列表</h1>
    <el-table row-key="_id" :data="items" border :tree-props="{children: 'parent'}" stripe>
      <el-table-column prop="_id" label="ID" sortable width="280"></el-table-column>
      <el-table-column prop="username" label="用户名" sortable width="200"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/admin_users/edit/${scope.row._id}`)"
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
      const res = await this.$http.get("rest/admin_users");
      this.items = res.data;
    },
    // 删除分类
    async remove(row) {
      this.$confirm(`是否确定删除 "${row.name}" ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`rest/admin_users/${row._id}`);
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

<template>
  <div>
    <h1>广告位列表</h1>
    <el-table row-key="_id" :data="items" border stripe>
      <el-table-column prop="_id" label="ID" sortable width="280"></el-table-column>
      <el-table-column prop="name" label="分类名称" sortable width="200"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/ads/edit/${scope.row._id}`)"
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
      const res = await this.$http.get("rest/ads");
      this.items = res.data;
    },
    // 删除分类
    async remove(row) {
      this.$confirm(`是否确定删除分类 "${row.name}" ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`rest/ads/${row._id}`);
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

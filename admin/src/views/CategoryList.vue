<template>
  <div>
    <el-table row-key="_id" :data="items" border :tree-props="{children: 'parent'}" stripe>
      <el-table-column prop="_id" label="ID" sortable width="280"></el-table-column>
      <el-table-column prop="name" label="分类名称" sortable width="200"></el-table-column>
      <el-table-column label="操作" width="200">
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
      children: [],
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    // 查询已有分类
    async fetch() {
      const res = await this.$http.get("rest/categories");
      this.items = res.data;
      const n = [];
      var m = 0;
      // 将所有子分类筛选出来
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].parent !== undefined) {
          this.children.push(this.items[i]);
          n[m] = i;
          m++;
        } else {
          this.items[i].parent = [];
        }
      }
      // 将原数组中的所有含有子分类的数据删除
      for (let i = 0; i < n.length; i++) {
        if (i == 0) {
          this.items.splice(n[i], 1);
        } else {
          this.items.splice(n[i] - i, 1);
        }
      }
      for (let i = 0; i < this.items.length; i++) {
        for (let j = 0; j < this.children.length; j++) {
          if (this.items[i]._id === this.children[j].parent._id) {
            this.items[i].parent.push(this.children[j]);
          }
        }
      }
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

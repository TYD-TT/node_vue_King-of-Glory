<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories">
          <el-option
            v-for="(item,key) in categories"
            :key="key"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  props: {
    id: {},
  },
  components: {
    VueEditor,
  },
  data() {
    return {
      model: {
        name: "",
      },
      categories: [],
    };
  },
  created() {
    this.id && this.fetch();
    this.fetchCategories();
  },
  methods: {
    // 将新建的分类存入数据库
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/articles", this.model);
      }
      console.log(res);
      this.$router.push("/articles/list");
      this.$message.success("保存成功！");
    },

    // 编辑分类时查找需要编辑的基本信息
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },

    // 查询父级分类
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    // 富文本编译器上传图片
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      console.log(res);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);

      resetUploader();
    },
  },
};
</script>

<style lang="less" scoped>
</style>
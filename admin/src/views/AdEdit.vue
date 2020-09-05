<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button
          type="primary"
          size="small"
          plain
          class="el-icon-plus"
          @click="model.items.push({})"
        >添加广告</el-button>
        <el-row>
          <el-col
            :md="24"
            v-for="(item,key) in model.items"
            :key="key"
            style=" border-bottom:1px dashed black; margin-top:1.5rem "
          >
            <el-form-item label="链接">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top:0.5rem">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :headers="getAuthHeaders()"
                :on-success="res=>$set(item,'image',res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" size="small" @click="model.skills.splice(key,1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
        url: "",
        items: [],
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
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/ads", this.model);
      }
      console.log(res);
      this.$router.push("/ads/list");
      this.$message.success("保存成功！");
    },

    // 编辑分类时查找需要编辑的基本信息
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
  },
};
</script>

<style lang="less" scope>
.avatar-uploader .el-upload {
  border: 1px dashed #180404;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 6rem;
  height: 6rem;
  line-height: 6rem;
  text-align: center;
}
.avatar {
  min-width:6rem;
  height: 6rem;
  display: block;
}
</style>
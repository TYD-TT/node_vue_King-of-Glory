<template>
  <div>
    <el-container style="height:100vh">
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <el-container>
        <el-aside
          :width="isCollapse ? '64px' : '200px'"
          style="background-color: rgb(238, 241, 246)"
        >
          <!-- 侧边栏的折叠和展开 -->
          <div class="toggle-button" @click="toggleCollapse">
            <i :class="arrows2" ref="caret"></i>
          </div>
          <el-menu router :default-openeds="['1', '3']" :collapse="isCollapse">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message" style="padding-right:20px;"></i>内容管理
              </template>
              <el-menu-item-group>
                <template slot="title">分类</template>
                <el-menu-item index="/categories/create">新建分类</el-menu-item>
                <el-menu-item index="/categories/list">分类列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <template slot="title">物品</template>
                <el-menu-item index="/items/create">新建物品</el-menu-item>
                <el-menu-item index="/items/list">物品列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu" style="padding-right:20px;"></i>导航二
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="2-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //   控制侧边栏的展开与收缩
      isCollapse: false,
      //   控制侧边栏展开与收缩的箭头
      arrows1: -1,
      arrows2: "el-icon-caret-left",
    };
  },
  methods: {
    //   控制侧边栏的展开与收缩
    toggleCollapse() {
      this.arrows1 = -this.arrows1;
      if (this.arrows1 > 0) {
        this.arrows2 = "el-icon-caret-right";
      } else {
        this.arrows2 = "el-icon-caret-left";
      }
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style lang="less" scope>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.toggle-button {
  background-color: #eef1f6;
  font-size: 20px;
  line-height: 24px;
  color: #b3c0d1;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>


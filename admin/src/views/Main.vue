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
          <el-menu router :default-openeds="['1']" :collapse="isCollapse" unique-opened :default-active="$route.path">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message" style="padding-right:20px;"></i>内容管理
              </template>
              <el-menu-item-group>
                <template slot="title">物品</template>
                <el-menu-item index="/items/create">新建物品</el-menu-item>
                <el-menu-item index="/items/list">物品列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <template slot="title">英雄</template>
                <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
                <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <template slot="title">文章</template>
                <el-menu-item index="/articles/create">新建文章</el-menu-item>
                <el-menu-item index="/articles/list">文章列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-message" style="padding-right:20px;"></i>运行管理
              </template>
              <el-menu-item-group>
                <template slot="title">广告位</template>
                <el-menu-item index="/ads/create">新建广告位</el-menu-item>
                <el-menu-item index="/ads/list">广告位列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-message" style="padding-right:20px;"></i>系统设置
              </template>
              <el-menu-item-group>
                <template slot="title">分类</template>
                <el-menu-item index="/categories/create">新建分类</el-menu-item>
                <el-menu-item index="/categories/list">分类列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <template slot="title">管理员</template>
                <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
                <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view :key="$route.path"></router-view>
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


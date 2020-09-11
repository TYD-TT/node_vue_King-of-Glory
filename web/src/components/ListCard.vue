<template>
  <m-card title="新闻资讯" icon="menu1">
    <div class="nav fs-md jc-between">
      <div
        class="nav-item"
        :class="{active:active === key}"
        v-for="(category, key) in categories "
        :key="key"
        @click="active = key"
      >
        <div class="nav-link">{{category.name}}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper>
        <swiper-slide v-for="(category, key) in categories " :key="key">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true },
  },
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
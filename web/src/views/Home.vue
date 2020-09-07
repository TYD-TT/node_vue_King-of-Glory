<template>
  <div>
    <!-- start of swiper -->
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide>
        <img class="w-100" src="../assets/images/f957c0a79d7403fa93afeb59f995fb4c.jpeg" alt srcset />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/9337403ad9152e9e38851c057e6b1b3d.jpeg" alt srcset />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/8bb473cb0ffab06061bdecb7780b7fa1.jpeg" alt srcset />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-grey-1">
      <div class="d-flex flex-wrap fs-sm">
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-story"></i>
          <div class="py-2">故事站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-rim"></i>
          <div class="py-2">周边商城</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-experience"></i>
          <div class="py-2">体验服</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-NewZone"></i>
          <div class="py-2">新人专区</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-honour"></i>
          <div class="py-2">荣耀·传承</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-KingCamp"></i>
          <div class="py-2">王者营地</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-OfficialAccounts"></i>
          <div>公众号</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-versions"></i>
          <div class="py-2">版本介绍</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-environment"></i>
          <div class="py-2">对局环境</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-infinite"></i>
          <div class="py-2">无限王者团</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-creativity"></i>
          <div class="py-2">创意互动营</div>
        </div>
      </div>
      <div class="bg-light py-2 d-flex ai-center jc-center">
        <i class="sprite sprite-arrow mr-2"></i>
        <span class="fs-sm">收起</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
        },
      },
    };
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: #fff;

    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}

.nav-icons {
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
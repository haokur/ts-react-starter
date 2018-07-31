<template>
  <div>
    <div class="fab-gotop" @click="goTop()" v-if="showTopFab">
      <i class="iconfont icon-dingbu"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'go-top',
  data() {
    return {
      showTopFab: false,
      bodyHeight: 0,
      showFabWhenLimit: 0
    }
  },
  mounted() {
    this.showFabWhenLimit = screen.height * 3
    document.addEventListener('scroll', this.listenScroll)
  },
  methods: {
    listenScroll() {
      var t = document.body.scrollTop
      // console.log(t,this.showFabWhenLimit)
      this.showTopFab = t > this.showFabWhenLimit
        ? true
        : false
    },
    goTop() {
      window.scroll(0, 0);
    }
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.listenScroll)
  }
}
</script>
<style lang="scss">
@import '../themes/_variable.scss';
.fab-gotop {
  position: fixed;
  z-index: 100;
  right: 10px;
  bottom: 60px;
  width: 46px;
  height: 46px;
  line-height: 46px;
  background: #fff;
  border-radius: 50%;
  border: 1px solid #e1e1e1;
  text-align: center;
  i {
    font-size: 24px;
    color: $mtc;
  }
}
</style>

<template>
  <div class="home">
    <div class="top">
      <div class="top-left">
        <i class="music musiccaidan"></i>
      </div>
      <div class="top-center">
        <ul class="tpp-center-menu">
          <li :class="{active: active == 0}" @click="switchChannel(0)"><router-link to="/my">我的</router-link></li>
          <li :class="{active: active == 1}" @click="switchChannel(1)"><router-link to="/">发现</router-link></li>
          <li :class="{active: active == 2}" @click="switchChannel(2)"><router-link to="/cloud">云村</router-link></li>
          <li :class="{active: active == 3}" @click="switchChannel(3)"><router-link to="/video">视频</router-link></li>
        </ul>
      </div>
      <div class="top-right">
        <i class="music musicsousuo" @click="$router.push('/search')"></i>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    var active = 1
    switch (this.$route.path) {
      case '/':
        active = 1
        break
      case '/my':
        active = 0
        break
      case '/cloud':
        active = 2
        break
      case '/video':
        active = 3
        break
    }
    return {
      active
    }
  },
  methods: {
    switchChannel (active) {
      this.active = active
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    .top-left {
      font-weight: 600;
      margin-left: 14px;
      i {
        font-size: 18px;
      }
    }
    .top-center {
      width: 60%;
      .tpp-center-menu {
        display: flex;
        justify-content: space-around;
        align-items: baseline;
        .active {
          font-size: 16px;
          font-weight: 600;
          a {
            color: #000;
            text-decoration: none;
          }
        }
        li {
          display: inline-block;
          a {
            color: #111;
            text-decoration: none;
          }
        }
      }
    }
    .top-right {
      font-size: 15px;
      font-weight: 600;
      margin-right: 14px;
    }
  }
}

</style>

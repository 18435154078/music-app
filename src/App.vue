<template>
  <div id="app">
    <router-view />
    <Play-control class="control" @click.native="isShowPlay = true" />
    <van-popup v-model="isShowPlay" position="bottom" style="height: 100%">
      <Play @hiddenPlay="isShowPlay = false" />
    </van-popup>
  </div>
</template>
<script>
import PlayControl from '@/components/PlayControl.vue'
import Play from '@/components/Play.vue'
export default {
  data () {
    return {
      isShowPlay: false
    }
  },
  components: {
    PlayControl,
    Play
  }
}
</script>
<style lang="less">
.control {
  width: 100%;
  position: fixed;
  bottom: -1px;
}
</style>

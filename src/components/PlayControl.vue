<template>
  <div class="play-control">
    <div class="play-view">
      <img class="avatar" :src="playList[currentIndex] && playList[currentIndex].al.picUrl || ''" alt="">
      <div class="sing-name">
        {{ playList[currentIndex] && playList[currentIndex].name || '' }}
      </div>
      <i
        :class="'music' + (paused ? ' musicbofang' : ' musicbofang1')"
        @click.stop="clickStop"
      ></i>
      <i class="music musicgedan"></i>
    </div>
    <audio
      ref="audio"
      @ended="playEnd"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[currentIndex] ? playList[currentIndex].id : ''}.mp3` || ''"
    ></audio>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'
import bus from '@/utils/globleBus.js'
export default {
  name: 'PlayControl',
  data () {
    return {
      paused: false,
      interval: null
    }
  },
  props: {},
  mounted () {
    bus.$on('stop', () => {
      this.$refs.audio.paused ? this.$refs.audio.play() : this.$refs.audio.pause()
      this.paused = !this.paused
      if (this.paused) {
        this.getPlayCurrent()
      } else {
        clearInterval(this.interval)
      }
    })
  },
  methods: {
    ...mapMutations(['GET_PLAY_CONTROL', 'GET_PLAY_INDEX']),
    ...mapActions(['reqLyric', 'undateTime']),
    playEnd () {
      if (this.paused) {
        this.getPlayCurrent()
      }
      if (this.currentIndex === this.playList.length - 1) {
        this.GET_PLAY_INDEX(0)
      } else {
        this.GET_PLAY_INDEX(this.currentIndex + 1)
      }
    },
    clickStop () {
      this.$refs.audio.paused ? this.$refs.audio.play() : this.$refs.audio.pause()
      this.paused = !this.paused
      if (this.paused) {
        this.getPlayCurrent()
      } else {
        clearInterval(this.interval)
      }
      bus.$emit('pause', this.paused)
    },
    getPlayCurrent () {
      this.interval = setInterval(() => {
        this.$store.dispatch('undateTime', this.$refs.audio.currentTime)
      }, 1000)
    }
  },
  computed: {
    ...mapState(['playList', 'currentIndex', 'currentTime']),
    ...mapGetters(['getCorrentSing', 'handleLyric'])
  },
  watch: {
    currentIndex: {
      deep: true,
      handler () {
        this.$nextTick(() => {
          this.$refs.audio.play()
          this.paused = true
          bus.$emit('pause', this.paused)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.play-control {
  .play-view {
    display: flex;
    align-items: center;
    height: 50px;
    justify-content: space-between;
    padding: 0 10px;
    background: #fff;
    border-top: 1px solid #eee;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .sing-name {
      width: 240px;
      font-size: 15px;
    }
    .musicbofang1 {
      font-size: 18px;
    }
    .musicbofang {
      font-size: 18px;
    }
    .musicgedan {
      font-size: 24px;
    }
  }
}
</style>

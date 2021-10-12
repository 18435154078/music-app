<template>
  <div class="play">
    <!-- 背景 -->
    <div class="play-bg" :style="{backgroundImage: `url(${playList[currentIndex] && playList[currentIndex].al.picUrl || ''})`}"></div>
    <!-- 头部 -->
    <div class="header">
      <i class="music musicxitongfanhui" @click="$emit('hiddenPlay')"></i>
      <div class="music-name">
        <marquee behavior="scroll" direction="center" class="marquee">
          {{ playList[currentIndex] && playList[currentIndex].name }}
        </marquee>
        <span class="author">{{ playList[currentIndex] && playList[currentIndex].al.name }}</span>
      </div>
      <i class="music musicfenxiang"></i>
    </div>
    <!-- 歌词 -->
    <div class="body" @click="isAyric = !isAyric">
      <transition name="">
        <div class="record" v-show="!isAyric">
          <img :class="'needle' + (!isPlay ? ' active' : '')" src="@/assets/needle-ab.png" alt="">
          <div id="CD" :class="{'playing': isPlay }">
            <img class="disc-plus" src="@/assets/disc-plus.png" alt="">
            <img class="play-cover" :src="playList[currentIndex] && playList[currentIndex].al.picUrl" alt="">
          </div>
          <!-- <img class="play-btn" src="@/assets/play_btn_3x.png" alt=""> -->
        </div>
      </transition>
      <transition name="">
        <div class="lyric-wrap">
          <div class="lyric" v-show="isAyric" ref="lyric">
            <p
              :class="{lyricActive: (parseInt(currentTime * 1000 - 1500) <= item.time.total) && (parseInt(currentTime * 1000 - 1500) >= handleLyric[index === 0 ? 0 : index - 1].time.total)}"
              v-for="(item, index) in handleLyric"
              :currentTime="parseInt(currentTime * 1000)"
              :total="item.time.total"
              :key="index">
              {{ item.lyric }}
            </p>
          </div>
        </div>
      </transition>
    </div>
    <div class="bottom-control">
      <!-- 播放模式 -->
      <i :class="'music ' + getPlayType()" @click="handleType" ></i>

      <!-- 上一曲 -->
      <i class="music musicshangyiqu" @click="prevMusic"></i>

      <!-- 播放/暂停 -->
      <i
        :class="'music ' + (!isPlay ? 'musicbofang1' : 'musicbofang')"
        @click="stopMusic"
      ></i>

      <!-- 下一曲 -->
      <i class="music musicxiayiqu" @click="nextMusic" ></i>
      <i class="music musicgedan"></i>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex'
import bus from '@/utils/globleBus.js'
export default {
  name: 'singList',
  data () {
    return {
      isPlay: true,
      isAyric: false
    }
  },
  mounted () {
    bus.$on('pause', (value) => {
      this.isPlay = value
    })
    this.$store.dispatch('reqLyric', { id: this.playList[this.currentIndex].id })
  },
  methods: {
    // 映射mutation
    ...mapMutations(['SET_PLAY_TYPE', 'GET_PLAY_INDEX', 'SET_PLAY_LYRIC', 'SET_PLAY_PROGRESS']),
    ...mapActions(['reqLyric', 'undateTime']),
    // 歌曲暂停/播放
    stopMusic () {
      bus.$emit('stop')
      this.isPlay = !this.isPlay
    },

    // 获取当前的播放模式
    getPlayType () {
      switch (this.type) {
        case 0:
          return 'music24gl-repeat2'
        case 1:
          return 'music24gl-repeatOnce2'
        case 2:
          return 'music24gl-shuffle'
      }
    },

    // 点击切换播放模式
    handleType () {
      if (this.type === 2) {
        this.SET_PLAY_TYPE(0)
        return
      }
      this.SET_PLAY_TYPE(this.type + 1)
    },

    // 下一曲
    nextMusic () {
      if (this.currentIndex === this.playList.length - 1) {
        this.GET_PLAY_INDEX(0)
        return
      }
      this.GET_PLAY_INDEX(this.currentIndex + 1)
    },

    // 上一曲
    prevMusic () {
      if (this.currentIndex === 0) {
        this.GET_PLAY_INDEX(this.playList.length - 1)
        return
      }
      this.GET_PLAY_INDEX(this.currentIndex - 1)
    }
  },
  computed: {
    ...mapState(['playList', 'currentIndex', 'type', 'lyric', 'currentTime']),
    ...mapGetters(['getCorrentSing', 'handleLyric'])
  },
  watch: {
    currentIndex () {
      this.$store.dispatch('reqLyric', { id: this.playList[this.currentIndex].id })
    },
    currentTime: {
      handler () {
        const active = document.querySelector('.lyricActive')
        if (active) {
          this.$refs.lyric.scrollTop = active.offsetTop - 200
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.play {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  .play-bg {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: 150% 150%;
    filter: blur(100px) sepia(1);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .header {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    .musicxitongfanhui, .musicfenxiang {
      color: #fff;
      font-size: 18px;
    }
    .music-name {
      width: 150px;
      color: #fff;
      font-size: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .marquee {
        width: 100%;
      }
      .author {
        font-size: 10px;
        color: #eee;
      }
    }
  }
  .body {
    .needle {
      width: 100px;
      position: absolute;
      top: 55px;
      left: 175px;
      z-index: 100;
      transform: rotate(-1deg);
      transform-origin: 10px 10px;
      transition: all 1s;
    }
    .active {
      transform-origin: 10px 10px;
      transform: rotate(-20deg);
      transition: all 1s;
    }
    #CD {
      width: 280px;
      height: 280px;
      position: relative;
      top: 100px;
      margin: 0 auto;
      .disc-plus {
        width: 280px;
        height: 280px;
        position: absolute;
        top: 0;
        left: 0;
      }
      .play-cover {
        width: 200px;
        position: absolute;
        top: 50px;
        left: 50px;
        width: 180px;
        height: 180px;
        border-radius: 50%;
      }
    }
    .play-btn {
      width: 70px;
    }
    .lyric-wrap {
      width: 100%;
      margin-top: 20px;
      .lyric {
        width: 390px;
        height: 500px;
        overflow-y: auto;
        p {
          text-align: center;
          color: #ccc;
        }
        .lyricActive {
          color: #fff;
          font-size: 15px;
        }
      }
    }
  }
  .bottom-control {
    display: flex;
    position: fixed;
    bottom: 0;
    height: 60px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
    box-sizing: border-box;
    .music {
      font-size: 22px;
      color: #fff;
    }
    .musicbofang1, .musicbofang {
      font-size: 36px;
    }
  }
}

</style>

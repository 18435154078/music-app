<template>
  <div class="sing-list">
    <div class="sing-list-header">
      <div class="left">
        <i class="music musicbofang1"></i>
        <span class="play-all">播放全部</span>
        <span class="list-count">(共{{ tracks.length }}首)</span>
      </div>
      <div class="right">
        + 收藏 ({{ playlist.trackCount }})
      </div>
    </div>
    <div class="list">
      <div
        class="item"
        v-for="(item, index) in tracks"
        :key="item.id"
        @click="playSing(index)"
      >
        <span class="index">
          <i v-if="item.id === playList[currentIndex] ? playList[currentIndex].id : ''" class="music musicpaixingbang"></i>
          <span v-else>{{ index + 1 }}</span>
        </span>
        <div class="sing-name">
          <span class="name">{{ item.name }}</span>
          <div class="detail">
            <span class="tag">vip</span>
            <span class="author">{{ item.ar[0].name }} - {{ item.al.name }}</span>
          </div>
        </div>
        <i class="music musiccaozuo-bofang"></i>
        <i class="music musicAndroidgengduo"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'singList',
  data () {
    return {}
  },
  props: {
    tracks: {
      type: Array,
      required: true
    },
    playlist: {
      type: Object,
      required: true
    }
  },
  mounted () {
    // console.log(this.playList[this.currentIndex])
  },
  methods: {
    ...mapMutations(['GET_PLAY_CONTROL', 'GET_PLAY_INDEX']),
    playSing (index) {
      this.GET_PLAY_CONTROL(this.tracks)
      this.GET_PLAY_INDEX(index)
    }
  },
  computed: {
    ...mapState(['playList', 'currentIndex'])
  }
}
</script>

<style lang="less" scoped>
.sing-list {
  background: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: relative;
  padding-bottom: 50px;
  .sing-list-header {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    box-shadow: 0 1px #FFFFFF;
    top: -1px;
    background: #fff;
    z-index: 10;
    .left {
      display: flex;
      align-items: center;
      .musicbofang1 {
        margin-right: 10px;
      }
      .play-all {
        font-size: 16px;
        font-weight: 600;
      }
      .list-count {
        color: #999;
        font-size: 12px;
      }
    }
    .right {
      padding: 8px;
      background: red;
      color: #fff;
      border-radius: 18px;
      font-size: 10px;
    }
  }
  .list {
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 15px;
      .index {
        width: 20px;
        font-size: 18px;
        color: #666;
        text-align: center;
        margin-right: 10px;
        .musicpaixingbang {
          color: red;
        }
      }
      .sing-name {
        width: 250px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .name {
          font-size: 14px;
          display: block;
          margin-bottom: 4px;
        }
        .detail {
          display: flex;
          align-items: center;
          color: #666;
          .tag {
            border: 1px solid #f0f;
            color: #f0f;
            font-size: 6px;
            padding: 0 2px;
            margin-right: 3px;
            border-radius: 3px;
            transform: scale(.7);
          }
          .author {
            width: 220px;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>

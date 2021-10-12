<template>
  <div class="list-view">
    <div class="list-view-header">
      <!-- 头部背景 -->
      <div class="list-view-header-bg" :style="{backgroundImage: 'url(' + songInfo.playlist.coverImgUrl + ')'}"></div>
      <div class="list-view-header-top">
        <div class="left">
          <i class="music musicxitongfanhui" @click="$router.back()"></i>
          <van-badge :content="'R'" class="badge">
            <span>歌单</span>
          </van-badge>
        </div>
        <div class="right">
          <i class="music musicsousuo"></i>
          <i class="music musicAndroidgengduo"></i>
        </div>
      </div>
      <!-- 歌单详情 -->
      <div class="song-detail">
        <img :src="songInfo.playlist.coverImgUrl" class="song-cover">
        <div class="song-info">
          <div class="title">{{ songInfo.playlist.name }}</div>
          <div class="author">
            <img class="avatar" :src="songInfo.creator.avatarUrl" alt="">
            <span class="nickname">{{ songInfo.creator.nickname }}</span>
            <i class="music musicxiangyoujiantou"></i>
          </div>
          <div v-if="songInfo.playlist.description" class="tab">
            <div class="description">{{ songInfo.playlist.description }}</div>
            <i class="music musicxiangyoujiantou"></i>
          </div>
        </div>
      </div>
      <!-- 评论分享 -->
      <van-grid :border="false" class="recomment">
        <van-grid-item :text="songInfo.playlist.commentCount + ''">
          <template #icon>
            <i class="music musicpinglun"></i>
          </template>
        </van-grid-item>
        <van-grid-item :text="songInfo.playlist.shareCount + ''">
          <template #icon>
            <i class="music musicfenxiang"></i>
          </template>
        </van-grid-item>
        <van-grid-item text="下载">
          <template #icon>
            <i class="music musiciconfontzhizuobiaozhun023146"></i>
          </template>
        </van-grid-item>
        <van-grid-item text="多选">
          <template #icon>
            <i class="music musicduoxuankuang"></i>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 歌单 -->
    <div class="playList">
      <Sing-list :tracks="songInfo.tracks" :playlist="songInfo.playlist" />
    </div>
  </div>
</template>

<script>
import {
  getRecommendSongDetail
} from '../../api/home'
import SingList from '@/components/SingList.vue'
export default {
  name: 'listView',
  data () {
    return {
      songInfo: {
        playlist: {},
        creator: {},
        tracks: []
      }
    }
  },
  components: {
    SingList
  },
  mounted () {
    this.getRecommendSongDetailList()
  },
  methods: {
    async getRecommendSongDetailList () {
      const id = this.$route.query.id
      const res = await getRecommendSongDetail('/playlist/detail', id)
      console.log(res.data)
      this.songInfo.playlist = res.data.playlist
      this.songInfo.creator = res.data.playlist.creator
      this.songInfo.tracks = res.data.playlist.tracks
    }
  }
}
</script>

<style lang="less" scoped>
.list-view {
  .list-view-header {
    width: 92%;
    margin: 0 auto;
    padding: 0 2%;
    color: #fff;
    position: relative;
    .list-view-header-bg {
      filter: blur(100px);
      background-size: 100% 100% !important;
      background: #222 !important;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    .list-view-header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      .left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .musicxitongfanhui {
          margin-right: 8px;
        }
        /deep/ .badge {
          .van-badge--fixed {
            transform: scale(.5);
            top: -6px;
            right: -7px;
            background:  unset;
          }
        }
      }
      .right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .musicsousuo {
          margin-right: 10px;
        }
      }
    }
    .song-detail {
      display: flex;
      margin-top: 15px;
      .song-cover {
        width: 120px;
        height: 120px;
        border-radius: 10px;
      }
      .song-info {
        margin-left: 10px;
        .title {
          font-size: 16px;
        }
        .author {
          display: flex;
          align-items: center;
          margin-top: 15px;
          .avatar {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin-right: 6px;
          }
          .nickname {
            margin-right: 5px;
            display: block;
            margin-top: 1px;
          }
          .musicxiangyoujiantou {
            font-size: 10px;
          }
        }
        .tab {
          margin-top: 15px;
          display: flex;
          align-items: center;
          .description {
             text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .musicxiangyoujiantou {
            font-size: 10px;
          }
        }
      }
    }
    /deep/ .recomment {
      margin-top: 5px;
      .van-grid-item {
        .van-grid-item__content {
          background: unset;
          .van-grid-item__text {
            color: #eee;
            font-size: 12px;
            margin-top: 5px;
          }
          .van-grid-item__icon-wrapper {
            .musicpinglun {
              color: #eee;
            }
          }
        }
      }
    }
  }
}
</style>

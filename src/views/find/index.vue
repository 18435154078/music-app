<template>
  <div class="my">
    <!-- 轮播banner -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in banner" :key="index">
        <img :src="item.imageUrl" alt="">
      </van-swipe-item>
    </van-swipe>
    <!-- 频道列表 -->
    <div class="channels">
      <swiper class="channels-wrap" :options="channelsOption">
        <swiper-slide class="channels-item" v-for="item in channels" :key="item.id">
          <div class="channels-icon">
            <img :src="item.iconUrl" alt="">
          </div>
          <span>{{item.name}}</span>
        </swiper-slide>
      </swiper>
    </div>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <div class="recommend-top">
        <h3>推荐歌单</h3>
        <span class="look-over-more">查看更多</span>
      </div>
      <swiper class="song-swiper" :options="swiperOption">
        <swiper-slide v-for="item in recommendList" :key="item.id" class="song-swiper-item">
          <router-link :to="'/listView?id=' + item.id">
            <div class="song-swiper-item-cover">
              <img :src="item.picUrl" class="cover">
              <div class="play-count">
                <i class="music musicbofangsanjiaoxing"></i>
                <span>{{ item.playCount | handlePlayCount }}</span>
              </div>
            </div>
            <span class="song-swiper-item-info">{{ item.name }}</span>
          </router-link>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import {
  getChannel,
  getSwipeImg,
  getRecommendSongLst
} from '../../api/home'
export default {
  name: 'my',
  data () {
    return {
      channels: [],
      banner: [],
      recommendList: [],
      swiperOption: {
        slidesPerView: 3.5,
        spaceBetween: 10
      },
      channelsOption: {
        slidesPerView: 5.2,
        spaceBetween: 10
      }
    }
  },
  mounted () {
    this.getChannelList()
    this.getSwipeImgList()
    this.getRecommendList()
  },
  methods: {
    async getChannelList () {
      const res = await getChannel('/homepage/dragon/ball')
      this.channels = res.data.data
    },
    async getSwipeImgList () {
      const res = await getSwipeImg('/banner')
      this.banner = res.data.banners
      // console.log(this.banner)
    },
    async getRecommendList () {
      const res = await getRecommendSongLst('/personalized', {
        limit: 6
      })
      // console.log(res)
      this.recommendList = res.data.result
    }
  },
  filters: {
    handlePlayCount (value) {
      if (value >= 100000000) {
        return parseInt(value / 100000000) + '亿'
      } else if (value >= 10000) {
        return parseInt(value / 10000) + '万'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my {
  /deep/ .my-swipe {
    width: 92%;
    margin: 0 auto 0;
    border-radius: 5px;
    .van-swipe__track {
      border-radius: 5px;
      height: 118px;
      .van-swipe-item {
        border-radius: 5px;
        img {
          width: 100%;
        }
      }
    }
  }
  .channels {
    width: 92%;
    margin: 10px auto 0;
    height: 65px;
    overflow: hidden;
    .channels-wrap {
      height: 65px;
      .channels-item {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .channels-icon {
          background: #FB271D;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-weight: 600;
          color: #fff;
          font-size: 20px;
          margin-bottom: 5px;
          img {
            width: 40px;
          }
        }
      }
    }
  }
  .recommend {
    width: 92%;
    // height: 130px;
    margin: 10px auto 0;
    .recommend-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .look-over-more {
        display: block;
        padding: 3px 8px;
        border: 1px solid #ccc;
        border-radius: 12px;
        font-size: 10px;
        color: #333;
      }
    }
    /deep/ .song-swiper {
      height: 100%;
      .swiper-wrapper {
        .song-swiper-item {
          .song-swiper-item-cover {
            height: 90px;
            position: relative;
            .cover {
              width: 100%;
              height: 100%;
              border-radius: 10px;
            }
            .play-count {
              position: absolute;
              top: 5px;
              right: 5px;
              color: #eee;
              display: flex;
              justify-content: right;
              align-items: baseline;
              font-size: 12px;
              .musicbofangsanjiaoxing {
                font-size: 12px;
              }
            }
          }
          .song-swiper-item-info {
            color: #333;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
}
</style>

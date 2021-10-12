import request from '../utils/request'

// 获取首页频道列表
export const getChannel = (url) => {
  return request({
    url
  })
}

// 获取首页轮播图片
export const getSwipeImg = (url) => {
  return request({
    url
  })
}

// 获取每日推荐歌单
export const getRecommendSongLst = (url, params) => {
  return request({
    url,
    params
  })
}

// 获取歌单详情
export const getRecommendSongDetail = (url, id) => {
  return request({
    url,
    params: {
      id
    }
  })
}

import request from '../utils/request'

// 获取歌词
export const getMusicAyric = (url, id) => {
  return request({
    url,
    params: {
      id
    }
  })
}

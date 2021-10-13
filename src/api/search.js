import request from '../utils/request'

// 联想建议
export const suggest = (url, params) => {
  return request({
    url,
    params
  })
}

// 默认搜索关键词
export const defaultKeyword = url => {
  return request({
    url
  })
}

// 搜索结果
export const searchResult = (url, keywords) => {
  return request({
    url,
    params: {
      keywords
    }
  })
}

import request from '../utils/request'

// 获取国家编码列表
export const getCountriesCode = (url) => {
  return request({
    url
  })
}

// 获取验证码
export const getMobileCode = (url, params) => {
  return request({
    url,
    params
  })
}

// 验证验证码
export const CheckMobileCode = (url, params) => {
  return request({
    url,
    params
  })
}

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

// 登录状态
export const loginStatus = url => {
  return request({
    url
  })
}

// 注册，修改密码
export const register = (url, params) => {
  return request({
    url,
    params
  })
}

// 用户登录
export const login = (url, params) => {
  return request({
    url,
    params
  })
}

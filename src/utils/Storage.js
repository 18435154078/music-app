export const getStorage = function (key) {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

export const setStorage = function (key, value) {
  if (typeof value === 'string') {
    return window.localStorage.setItem(key, value)
  }
  return window.localStorage.setItem(key, JSON.stringify(value))
}

export const removeStorage = function (key) {
  return window.localStorage.removeItem(key)
}

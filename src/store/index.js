import Vue from 'vue'
import Vuex from 'vuex'
import { getMusicAyric } from '@/api/music.js'
import { setStorage, getStorage } from '@/utils/Storage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 播放列表
    playList: getStorage('playList') || [],
    // 当前播放歌曲
    currentIndex: getStorage('currentIndex') || 0,
    // 当前播放模式，默认为0：顺序，1：随机；2：单曲循环
    type: 1,
    // 歌词
    lyric: '',
    // 当前音乐播放的进度
    currentTime: 0,
    searchHistory: [],
    userToken: getStorage('userToken') || ''
  },
  getters: {
    getCorrentSing: state => {
      return state.playList[state.currentIndex]
    },
    handleLyric: state => {
      const lyricObj = []
      if (!state.lyric) {
        return
      }
      // console.log(state.lyric)
      state.lyric.split(/\n/).forEach(item => {
        const timer = item.split(']')[0]
        const lyrics = item.split(']')[1]
        lyricObj.push({
          time: {
            min: timer.substring(1, 3),
            second: timer.substring(4, 6),
            mill: timer.substring(7),
            total: Number(timer.substring(1, 3)) * 60 * 1000 + Number(timer.substring(4, 6)) * 1000 + Number(timer.substring(7))
          },
          lyric: lyrics
        })
      })
      return lyricObj
    }
  },
  mutations: {
    GET_PLAY_CONTROL: (state, option) => {
      state.playList = option
      setStorage('playList', option)
    },
    GET_PLAY_INDEX: (state, option) => {
      state.currentIndex = option
      setStorage('currentIndex', option)
    },
    SET_PLAY_TYPE: (state, option) => {
      state.type = option
    },
    SET_PLAY_LYRIC: (state, option) => {
      state.lyric = option
    },
    SET_PLAY_PROGRESS: (state, option) => {
      state.currentTime = option
    },
    SET_SEARCH_HISTORY: (state, option) => {
      if (option.type === 'delete') {
        state.searchHistory = []
        return
      }
      const index = state.searchHistory.findIndex(item => {
        return item === option.value
      })
      if (index >= 0) {
        state.searchHistory.splice(index, 1)
      }
      state.searchHistory.unshift(option.value)
    },
    SET_USER_TOKEN: (state, option) => {
      state.userToken = option
      setStorage('userToken', option)
    }
  },
  actions: {
    reqLyric: async ({ commit }, payload) => {
      const res = await getMusicAyric('/lyric', payload.id)
      commit('SET_PLAY_LYRIC', res.data.lrc ? res.data.lrc.lyric : '')
    },
    undateTime: ({ commit }, payload) => {
      commit('SET_PLAY_PROGRESS', payload)
    }
  },
  modules: {
  }
})

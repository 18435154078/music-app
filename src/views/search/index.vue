<template>
  <div class="search-view">
    <div class="search-header">
      <i class="music musicxitongfanhui" @click="$router.back()"></i>
      <div class="search-input">
        <input
          ref="search"
          type="text"
          v-model="searchValue"
          @keydown.enter="handleSearch"
          @focus="isSearch = false"
          :placeholder="keyword.showKeyword"
        >
        <i
          class="music musiccancel-1-copy"
          v-show="searchValue"
          @click="searchValue = ''; isSearch = false"
        ></i>
      </div>
    </div>
    <div v-if="isSearch" class="result">
      搜索结果
    </div>
    <div v-else-if="!searchValue" class="default">
      <div class="history" v-if="searchHistory && searchHistory.length">
        <div class="title">历史</div>
        <div class="history-list">
          <span class="history-item" v-for="(item, index) in searchHistory" :key="index">{{ item }}</span>
        </div>
        <i class="music musicshanchu" @click="deleteSearchHistory"></i>
      </div>
    </div>
    <div v-else class="suggestion">
      <div class="suggestion-list">
        <div class="suggestion-item" v-for="(item, index) in suggests" :key="index" @click="clickResult(item.keyword)">
          <i class="music musicsousuo"></i>
          <div class="suggestion-text">{{ item.keyword }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { suggest, defaultKeyword, searchResult } from '@/api/search.js'
export default {
  name: 'search',
  data () {
    return {
      searchValue: '',
      isSearch: false,
      suggests: [],
      keyword: {
        realkeyword: '',
        showKeyword: ''
      }
    }
  },
  props: {},
  mounted () {
    this.getAefaultKeyword()
  },
  methods: {
    ...mapMutations(['SET_SEARCH_HISTORY']),
    handleSearch () {
      if (!this.searchValue) {
        this.searchValue = this.keyword.realkeyword
      }
      this.isSearch = true
      this.getSearchResult()
      this.$refs.search.blur()
      this.$store.commit('SET_SEARCH_HISTORY', { type: 'add', value: this.searchValue })
    },
    deleteSearchHistory () {
      this.$store.commit('SET_SEARCH_HISTORY', { type: 'delete' })
    },
    clickResult (keyword) {
      this.searchValue = keyword
      this.isSearch = true
      this.$refs.search.blur()
      this.getSearchResult()
      this.$store.commit('SET_SEARCH_HISTORY', { type: 'add', value: this.searchValue })
    },
    async getAefaultKeyword () {
      const res = await defaultKeyword('/search/default')
      this.keyword.showKeyword = res.data.data.showKeyword
      this.keyword.realkeyword = res.data.data.realkeyword
    },
    async getSearchResult () {
      const res = await searchResult('/search/multimatch', this.searchValue)
      console.log(res)
    }
  },
  computed: {
    ...mapState(['searchHistory'])
  },
  watch: {
    async searchValue () {
      if (!this.searchValue) {
        return
      }
      const res = await suggest('/search/suggest', {
        keywords: this.searchValue,
        type: 'mobile'
      })
      this.suggests = res.data.result.allMatch
    }
  }
}
</script>
<style lang="less" scoped>
.search-view {
  padding: 0 15px;
  .search-header {
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    margin-top: 10px;
    .musicxitongfanhui {
      font-size: 20px;
    }
    .search-input {
      width: 310px;
      height: 40px;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      input {
        border: none;
        font-size: 16px;
        height: 35px;
        display: block;
        margin-top: 3px;
      }
      .musiccancel-1-copy {
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
  .suggestion {
    margin-top: 10px;
    .suggestion-list {
      .suggestion-item {
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .musicsousuo {
          font-size: 14px;
          color: #888;
        }
        .suggestion-text {
          width: 320px;
          height: 100%;
          border-bottom: 1px solid #eee;
          line-height: 40px;
          font-size: 14px;
        }
      }
    }
  }
  .default {
    .history {
      height: 40px;
      position: relative;
      margin-top: 10px;
      .title {
        height: 100%;
        width: 40px;
        line-height: 40px;
        font-size: 15px;
        font-weight: 600;
        display: inline-block;
      }
      .history-list {
        position: absolute;
        left: 50px;
        width: 290px;
        white-space: nowrap;
        overflow-x: hidden;
        top: 2px;
        padding: 10px 0;
        .history-item {
          padding: 5px 10px;
          background: #eee;
          margin-right: 10px;
          border-radius: 10px;
        }
      }
      .musicshanchu {
        font-size: 16px;
        position: absolute;
        display: block;
        right: 0;
        top: 0;
        padding: 10px 0px 10px 10px;
        background: #fff;
        border-left: 10px solid rgba(256, 256, 256, .1);
      }
    }
  }
}
</style>

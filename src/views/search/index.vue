<template>
  <div class="search-view">
    <div class="search-header">
      <i class="music musicxitongfanhui"></i>
      <div class="search-input">
        <input
          type="text"
          v-model="searchValue"
          @keydown.enter="handleSearch"
        >
        <i
          class="music musiccancel-1-copy"
          v-show="searchValue"
          @click="searchValue = ''"
        ></i>
      </div>
    </div>
    <div v-if="isSearch" class="result">
      搜索结果
    </div>
    <div v-else-if="!searchValue" class="default">
      历史
    </div>
    <div v-else class="suggestion">
      联想建议
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      searchValue: '',
      isSearch: false
    }
  },
  props: {},
  mounted () {},
  methods: {
    handleSearch () {
      this.isSearch = true
      console.log(this.searchValue)
    }
  },
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped>
.search-view {
  padding: 0 15px;
  .search-header {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    .musicxitongfanhui {
      font-size: 20px;
    }
    .search-input {
      width: 315px;
      height: 45px;
      border-bottom: 1px solid #aaa;
      display: flex;
      justify-content: space-between;
      align-items: center;
      input {
        border: none;
        font-size: 16px;
        height: 40px;
        display: block;
      }
      .musiccancel-1-copy {
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
}
</style>

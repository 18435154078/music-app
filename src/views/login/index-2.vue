<template>
  <div class="login">
    <div class="header">
      <i class="music musiccancel-1-copy to-home"></i>
      <div class="title">手机号登录</div>
    </div>
    <div class="nickname">
      <span>手机号：</span>
      <input type="text" v-model="nickname">
    </div>
    <div class="passwords">
      <span>密 码：</span>
      <input type="password" v-model="password">
    </div>
    <a style="display:block;float:right;margin-top:10px;" href="/register">没有账号？去注册</a>
    <van-button type="primary" size="large" class="next" @click="login">下一步</van-button>
  </div>
</template>

<script>
import { login } from '../../api/login'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      password: '123456',
      nickname: '13243648467'
    }
  },
  mounted () {
    // this.getCountriesCodeList()
  },
  methods: {
    ...mapMutations(['SET_USER_TOKEN']),
    async login () {
      const res = await login('/login/cellphone', {
        phone: this.nickname,
        password: this.password
      })
      console.log(res)
      if (res.data.code === 200) {
        this.SET_USER_TOKEN(res.data.token)
        this.$toast.success('登录成功')
        const path = this.$route.query.redirect
        this.$router.push(path || '/')
      }
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.login {
  width: 92%;
  margin: 0 auto;
  .header {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    .to-home {
      font-size: 16px;
      color: #666;
      display: block;
    }
    .title {
      font-size: 18px;
      margin-left: 20px;
    }
  }
  .nickname {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    span {
      display: block;
      width: 70px;
      font-size: 16px;
    }
    input {
      width: 280px;
      height: 35px;
      border: none;
      font-size: 18px;
      margin-top: 10px;
    }
  }
  .passwords {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    span {
      display: block;
      width: 70px;
      font-size: 16px;
    }
    input {
      width: 280px;
      height: 35px;
      border: none;
      font-size: 18px;
      margin-top: 10px;
    }
  }
  .next {
    background-color: #FA452F;
    height: 40px;
    border-radius: 20px;
    border: none;
    margin-top: 30px;
  }
}
</style>

<template>
  <div class="login">
    <div class="header">
      <i class="music musiccancel-1-copy to-home"></i>
      <div class="title">手机号登录</div>
    </div>
    <transition-group name="fade" mode="out-in">
      <div class="login-mobile" v-if="isShowMobile" key="mobile">
        <div style="font-size: 18px;margin-top:20px;">登录体验更多精彩</div>
        <span style="margin-top:5px;color:#666;display:block">未注册手机号登录后将自动创建账号</span>
        <van-field placeholder="请输入手机号" class="mobileNum" v-model="mobile" type="number">
          <template #label>
            <div @click="isShow = true">
              <span>+86</span>
              <i class="music musicicon_sanjiaoxing"></i>
            </div>
          </template>
        </van-field>
        <van-button type="primary" size="large" class="next" @click="setMobile">下一步</van-button>
      </div>
      <div class="login-code" v-else key="code">
        <div style="font-size: 15px;margin-top:20px;">验证码已发送至</div>
        <div class="count-down">
          +86 {{ mobile.substring(0, 3) + '****' + mobile.substring(7) }}
          <div class="count">
            <van-count-down
              v-if="isShowCountDown"
              :time="61 * 1000"
              format="ss s"
              @finish="isShowCountDown = false"
            />
            <span v-else @click="reGetCode">重新获取</span>
          </div>
        </div>
        <!-- 密码输入框 -->
        <van-password-input
          :value="code"
          :mask="false"
          gutter="10px"
          class="codeInput"
          length="4"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />
        <!-- 数字键盘 -->
        <van-number-keyboard
          v-model="code"
          :show="showKeyboard"
          @blur="showKeyboard = false"
        />
      </div>
    </transition-group>
    <!-- 国家手机编码 -->
    <van-popup v-model="isShow">内容</van-popup>
  </div>
</template>

<script>
import { getCountriesCode, getMobileCode, CheckMobileCode } from '../../api/login'
export default {
  name: 'Login',
  data () {
    return {
      CountriesCodeList: [],
      mobile: '',
      ctcode: '',
      isShowMobile: true,
      code: '',
      showKeyboard: true,
      isShowCountDown: true,
      isShow: false
    }
  },
  mounted () {
    // this.getCountriesCodeList()
  },
  methods: {
    // 点击获取验证码
    setMobile () {
      if (this.mobile.length !== 11) {
        return
      }
      this.isShowMobile = false
      // this.getCode()
    },

    // 获取验证码
    async getCode () {
      const res = await getMobileCode('/captcha/sent', {
        phone: this.mobile,
        ctcode: this.ctcode
      })
      console.log(res)
    },

    // 验证验证码
    async checkCode () {
      try {
        const res = await CheckMobileCode('/captcha/verify', {
          phone: this.mobile,
          captcha: this.code
        })
        console.log(res)
        if (res.data.code === 200) {
          this.$toast('登录成功')
          this.$router.push('/')
        }
      } catch (err) {
        this.$toast('验证码错误')
      }
    },

    // 获取国家编码
    async getCountriesCodeList () {
      const res = await getCountriesCode('/countries/code/list')
      this.CountriesCodeList = res.data.data
    },

    // 重新获取验证码
    reGetCode () {
      this.isShowCountDown = true
      this.getCode()
    }
  },
  watch: {
    code: function (newVal) {
      if (newVal.length === 4) {
        this.checkCode()
      }
    }
  }
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
  .login-mobile {
    /deep/ .mobileNum {
    border-bottom: 1px solid #aaa;
    padding: 5px;
    margin-top: 20px;
    height: 36px;
    font-size: 18px;
      .van-cell__title {
        width: 55px;
        margin-right: 0px;
        display: flex;
        align-items: center;
        .musicicon_sanjiaoxing {
          font-size: 20px;
        }
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
  .login-code {
    .count-down {
      font-size: 14px;
      margin-top:10px;
      color:#666;
      display:flex;
      justify-content: space-between;
      .count {
        span {
          color: blue
        }
      }
    }
    /deep/ .codeInput {
      margin-top: 15px;
      .van-password-input__item {
        border-bottom: 1px solid #ccc;
      }
    }
  }
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  animation: fadeIn .5s;
}
.fade-leave {
  opacity: 0;
}
.fade-leave-active {
  animation: fadeOut 0;
}

</style>

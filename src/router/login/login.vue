<template>
  <div>
    <div :show="show" v-if="show==='err'">
      <h2>系统错误</h2>
    </div>
    <div :show="show" v-if="show==='fail'">
      <h2>登录失败</h2>
    </div>
  </div>
</template>

<script>
import { STORAGE_PREFIX, CODING_CALLBACK, CODING_CLIENTID } from '../../config';

export default {
  data() {
    return {};
  },
  computed: {
    show() {
      return this.$route.query.result || '';
    }
  },
  beforeMount() {
    const result = this.$route.query.result;
    if (result === undefined) {
      location.href = `https://coding.net/oauth_authorize.html?client_id=${CODING_CLIENTID}&redirect_uri=${CODING_CALLBACK}&response_type=code&scope=user,team,project`;
    } else if (result !== 'err' && result !== 'fail') {
      // 登录成功, 存储Access Token
      localStorage.setItem(`${STORAGE_PREFIX}:token`, result);
      this.$router.push('/');
    }
  }
};
</script>

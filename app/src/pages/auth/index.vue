<script setup lang="ts">
import { ref } from "vue";
import Login from "../auth/components/login.vue";
import Register from "../auth/components/register.vue";

const isLogin = ref(true);
</script>

<template>
  <uni-title
    type="h2"
    align="center"
    :title="isLogin ? '登录' : '注册'"
  ></uni-title>
  <view class="auth-login" v-if="isLogin"><Login /> </view>
  <view class="auth-register" v-else><Register /> </view>

  <view class="auth-footer">
    <a @click="isLogin = false" v-if="isLogin">还没有账号？去注册</a>
    <a @click="isLogin = true" v-else>已有账号？去登录</a>
  </view>
</template>

<style lang="scss" scoped>
.auth-footer {
  padding: 0 40rpx;
  color: #007aff;
  font-size: 24rpx;
}
</style>

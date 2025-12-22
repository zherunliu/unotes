<script setup lang="ts">
import { ref } from "vue";
import { loginApi } from "@/api/auth";
import { IUser } from "@/types/auth";

const formData = ref<IUser>({
  username: "",
  password: "",
});

const submit = async () => {
  try {
    const res = await loginApi(formData.value);
    uni.setStorageSync("token", res.token);
    uni.showToast({
      title: "登录成功",
      icon: "success",
    });
    uni.reLaunch({
      url: "/pages/index/index",
    });
  } catch (err) {
    console.error("登录失败：", err);
    uni.showToast({
      title: "登录失败",
      icon: "error",
    });
  }
};
</script>

<template>
  <view class="login">
    <view class="login-container">
      <uni-forms :modelValue="formData">
        <uni-forms-item label="用户名" prop="username" required>
          <uni-easyinput
            type="text"
            v-model="formData.username"
            placeholder="请输入用户名"
          />
        </uni-forms-item>
        <uni-forms-item label="密码" prop="password" required>
          <uni-easyinput
            type="password"
            v-model="formData.password"
            placeholder="请输入密码"
          />
        </uni-forms-item>
        <button type="primary" @click="submit">登录</button>
      </uni-forms>
    </view>
  </view>
</template>

<style lang="sass" scoped>
.login
  .login-container
    padding: 0 40rpx
</style>

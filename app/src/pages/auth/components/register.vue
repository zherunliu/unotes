<script setup lang="ts">
import { ref } from "vue";
import { registerApi } from "@/api/auth";
import type { IUser } from "@/types/auth";

const formData = ref<IUser>({
  username: "",
  password: "",
});

const submit = async () => {
  try {
    await registerApi(formData.value);
    uni.reLaunch({
      url: "/pages/auth/index",
    });
  } catch (err) {
    console.error("注册失败：", err);
  }
};
</script>

<template>
  <view class="register">
    <view class="register-container">
      <uni-forms :model="formData">
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
        <button class="button-primary" @click="submit">注册</button>
      </uni-forms>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.register {
  .register-container {
    padding: 0 40rpx;
  }
}
.button-primary {
  background-color: $uni-icon-color-active;
  color: $uni-text-color-inverse;
}
</style>

<script setup lang="ts">
import { updatePasswordApi } from "@/api/auth";
import type { IAuth } from "@/types/auth";
import { ref } from "vue";

const form = ref();
const formData = ref<IAuth>({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const rules = {
  oldPassword: {
    rules: [
      {
        required: true,
        errorMessage: "请输入旧密码",
      },
    ],
  },
  newPassword: {
    rules: [
      {
        required: true,
        errorMessage: "请输入新密码",
      },
    ],
  },
  confirmPassword: {
    rules: [
      {
        required: true,
        errorMessage: "请再次输入新密码",
      },
    ],
  },
};

const submit = () => {
  form.value
    .validate()
    .then(async () => {
      if (formData.value.newPassword !== formData.value.confirmPassword) {
        return uni.showToast({
          title: "两次输入的密码不一致",
          icon: "none",
          mask: true,
        });
      }
      await updatePasswordApi(formData.value);
      uni.reLaunch({ url: "/pages/auth/index" });
    })
    .catch((err: any) => {
      console.log("Update failed.", err);
    });
};
</script>

<template>
  <view class="container">
    <uni-forms
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="80px"
      label-align="right"
    >
      <uni-forms-item label="旧密码" name="oldPassword" required>
        <uni-easyinput
          type="password"
          v-model="formData.oldPassword"
        ></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item label="新密码" name="newPassword" required>
        <uni-easyinput
          type="password"
          v-model="formData.newPassword"
        ></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item label="确认密码" name="confirmPassword" required>
        <uni-easyinput
          type="password"
          v-model="formData.confirmPassword"
        ></uni-easyinput>
      </uni-forms-item>
      <button @click="submit">修改</button>
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
}
</style>

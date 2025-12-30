<script setup lang="ts">
import { getUserApi, updateUserApi } from "@/api/user";
import { onMounted, ref } from "vue";
import dayjs from "dayjs";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const userInfo = ref();
const popup = ref();
const newName = ref("");

const confirmName = async () => {
  if (newName.value === "") {
    uni.showToast({
      title: "Username can not be null.",
      icon: "error",
      mask: true,
    });
  } else {
    try {
      await updateUserApi({ ...userInfo.value, username: newName.value });
      getUser();
    } catch (err) {
      console.log("Update failed.", err);
    }
  }
};

const getUser = () =>
  getUserApi().then((res) => {
    userInfo.value = res.data;
  });

onMounted(getUser);
</script>

<template>
  <view class="container">
    <view class="header">
      <img
        :src="
          userInfo.avatar
            ? `${baseUrl}/${userInfo.avatar}`
            : '../../static/tabbar/personal.png'
        "
      />
      <view class="content">
        <p class="name">{{ userInfo.username }}</p>
        <p class="info">
          JoinTime: {{ dayjs(userInfo.createdAt).format("YYYY-MM-DD") }}
        </p>
      </view>
    </view>
    <view class="list-items">
      <p @click="popup.open('center')">昵称修改</p>
      <p>密码修改</p>
      <p>退出登录</p>
      <p>注销账号</p>
    </view>
    <view>
      <uni-popup ref="popup" type="dialog">
        <uni-popup-dialog
          v-model="newName"
          title="修改昵称"
          mode="input"
          :placeholder="userInfo.username"
          message="成功消息"
          :duration="2000"
          :before-close="true"
          @close="
            newName = '';
            popup.close();
          "
          @confirm="
            confirmName();
            popup.close();
          "
        ></uni-popup-dialog>
      </uni-popup>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  .header {
    padding: 10rpx 10rpx 10rpx 40rpx;
    display: flex;
    align-items: center;
    border-bottom: 5rpx solid #eee;
    img {
      width: 100rpx;
      height: 100rpx;
      border: solid $uni-text-color-grey 1px;
      margin: 10rpx;
      border-radius: 50%;
    }
    .content {
      padding-left: 10rpx;
      .name {
        font-size: 35rpx;
        font-weight: bold;
      }
      .info {
        color: $uni-text-color-grey;
        font-size: 25rpx;
      }
    }
  }
  .list-items {
    p {
      padding-left: 50rpx;
      align-content: center;
      height: 80rpx;
      font-size: 30rpx;
      border-bottom: 1rpx solid #eee;
    }
  }
}
</style>

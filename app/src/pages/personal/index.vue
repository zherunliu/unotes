<script setup lang="ts">
import { deleteUserApi, getUserApi, updateUserApi } from "@/api/user";
import { ref } from "vue";
import dayjs from "dayjs";
import { onLoad } from "@dcloudio/uni-app";
import type { IProfile } from "@/types/user";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const userInfo = ref();
const popupChangeName = ref();
const popupDelete = ref();
const newName = ref("");

const editUserInfo = async (editData: IProfile) => {
  try {
    await updateUserApi(editData);
    getUser();
  } catch (err) {
    console.log("Update failed.", err);
  }
};

const changeAvatar = () => {
  uni.chooseImage({
    count: 1,
    success: (res: any) => {
      console.log(res);
      uni.uploadFile({
        fileType: "image",
        url: baseUrl + "/upload",
        filePath: res.tempFilePaths[0],
        name: "file",
        success: (uploadFileRes) => {
          const data = JSON.parse(uploadFileRes.data);
          editUserInfo({ avatar: data.filename });
        },
        fail: (err) => {
          uni.showToast({
            title: "上传失败",
            icon: "error",
            mask: true,
          });
          console.error("File upload failed.", err);
        },
      });
    },
  });
};

const confirmName = () => {
  if (newName.value === "") {
    uni.showToast({
      title: "Username can not be null.",
      icon: "error",
      mask: true,
    });
  } else {
    editUserInfo({ username: newName.value });
  }
};

const getUser = () =>
  getUserApi().then((res) => {
    userInfo.value = res.data;
  });

const logout = () => {
  uni.removeStorageSync("token");
  uni.reLaunch({ url: "/pages/auth/index" });
};

const deleteUser = async () => {
  try {
    await deleteUserApi();
    uni.reLaunch({ url: "/pages/auth/index" });
  } catch (err) {
    console.log("Delete failed.", err);
  }
};

const toPassword = () => {
  uni.navigateTo({ url: "/pages/auth/password" });
};

onLoad(getUser);
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
        @click="changeAvatar"
      />
      <view class="content">
        <p class="name">{{ userInfo.username }}</p>
        <p class="info">
          JoinTime: {{ dayjs(userInfo.createdAt).format("YYYY-MM-DD") }}
        </p>
      </view>
    </view>
    <view class="list-items">
      <p @click="popupChangeName.open('center')">昵称修改</p>
      <p @click="toPassword">密码修改</p>
      <p @click="logout">退出登录</p>
      <p @click="popupDelete.open('center')">注销账号</p>
    </view>
    <view>
      <uni-popup ref="popupChangeName" type="dialog">
        <uni-popup-dialog
          v-model="newName"
          title="修改昵称"
          mode="input"
          :placeholder="userInfo.username"
          :duration="2000"
          :before-close="true"
          @close="
            newName = '';
            popupChangeName.close();
          "
          @confirm="
            confirmName();
            popupChangeName.close();
          "
        ></uni-popup-dialog>
      </uni-popup>
      <uni-popup ref="popupDelete" type="dialog">
        <uni-popup-dialog
          title="注销账号"
          type="error"
          content="确定要注销账号吗？"
          :duration="2000"
          :before-close="true"
          @close="popupDelete.close()"
          @confirm="
            deleteUser();
            popupDelete.close();
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
      object-fit: cover;
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

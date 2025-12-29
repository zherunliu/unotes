<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { deleteArticleApi, getArticleApi } from "@/api/article";
import { ref } from "vue";
import dayjs from "dayjs";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
declare global {
  interface Uni {
    $appParams?: { id: number };
  }
}
const article = ref();
const getArticle = async (id: number) => {
  const res = await getArticleApi(id);
  article.value = res.data;
};

const toEdit = (id: number) => {
  /* switchTab 不支持传递 URL 参数，此处使用全局变量挂载（不推荐） */
  uni.$appParams = { id: id };
  uni.switchTab({ url: "/pages/publish/index" });
};

onLoad((data) => {
  getArticle((data as { id: number }).id);
});

const deleteArticle = (id: number) => {
  deleteArticleApi(id);
  uni.navigateBack();
};
</script>

<template>
  <view class="container">
    <view class="title">
      <p>{{ article.title }}</p>
      <span>{{ dayjs(article.createdAt).format("YYYY-MM-DD HH:mm:ss") }}</span>
    </view>
    <view class="content">
      <img
        v-if="article.img"
        :src="`${baseUrl}/${article.img}`"
        alt="coverImg"
      />
      {{ article.content }}
    </view>

    <view class="button-group">
      <button @click="toEdit(article.id)">编辑</button>
      <button class="button-danger" @click="deleteArticle(article.id)">
        删除
      </button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
  .title {
    text-align: center;
    p {
      font-size: 30rpx;
      font-weight: bold;
      color: $uni-text-color;
    }
    color: $uni-text-color-grey;
    font-size: 20rpx;
    margin-bottom: 20rpx;
  }
  .content {
    img {
      width: 100%;
      height: 400rpx;
      object-fit: contain;
    }
    font-size: 25rpx;
    margin-bottom: 20rpx;
  }
  .button-group {
    display: flex;
    gap: 20rpx;
    button {
      width: 100%;
    }
    .button-danger {
      background-color: $uni-color-error;
      color: $uni-text-color-inverse;
    }
  }
}
</style>

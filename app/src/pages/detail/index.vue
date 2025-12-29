<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { deleteArticleApi, getArticleApi } from "@/api/article";
import { ref } from "vue";
import dayjs from "dayjs";

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
      {{ article.content }}
    </view>

    <view>
      <button @click="toEdit(article.id)">编辑</button>
      <button @click="deleteArticle(article.id)">删除</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
  .title {
    text-align: center;
    p {
      font-size: large;
      font-weight: bold;
      color: $uni-text-color;
    }
    color: $uni-text-color-grey;
    font-size: small;
    margin-bottom: 20rpx;
  }
  .content {
    margin-bottom: 20rpx;
  }
}
</style>

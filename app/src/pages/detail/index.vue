<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { deleteArticleApi, getArticleApi } from "@/api/article";
import { ref } from "vue";
import dayjs from "dayjs";

const article = ref();
const getArticle = async (id: number) => {
  const res = await getArticleApi(id);
  article.value = res.data;
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
      <button>编辑</button>
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

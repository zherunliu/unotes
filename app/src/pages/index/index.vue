<script setup lang="ts">
import { getArticleListApi } from "@/api/article";
import type { IArticle } from "@/types/article";
import { onMounted, ref } from "vue";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
interface IArticleItem extends IArticle {
  id: number;
}
const articleList = ref<IArticleItem[]>([]);
const getList = async () => {
  const res = await getArticleListApi();
  articleList.value = res.data;
};

const toDetail = (id: number) => {
  uni.navigateTo({ url: `/pages/detail/index?id=${id}` });
};

onMounted(getList);
</script>

<template>
  <view>
    <view
      class="list-item"
      v-for="item of articleList"
      :key="item.id"
      @click="toDetail(item.id)"
    >
      <view class="title">{{ item.title }}</view>
      <view class="content">
        <img v-if="item.img" :src="`${baseUrl}/${item.img}`" />
        <view class="text">
          <p>
            {{ item.content }}
          </p>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.list-item {
  padding: 20rpx;
  gap: 20rpx;
  border-bottom: 1rpx solid #eee;
  .title {
    font-size: 30rpx;
    margin-bottom: 10rpx;
  }
  .content {
    img {
      width: 160rpx;
      height: 160rpx;
    }
    display: flex;
    gap: 20rpx;
    p {
      font-size: 25rpx;
      line-height: 40rpx;
      height: 160rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }
}
</style>

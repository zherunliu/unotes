<script setup lang="ts"></script>

<template>
  <view>
    <view class="list-item">
      <view class="title">This is article title</view>
      <view class="content">
        <img src="../../static/logo.png" />
        <view class="text">
          <p>
            This is the article content. This is the article content. This is
            the article content. This is the article content. This is the
            article content. This is the article content. This is the article
            content.
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

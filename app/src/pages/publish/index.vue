<script setup lang="ts">
import { postArticleApi } from "@/api/article";
import { reactive, ref } from "vue";

const formData = reactive({
  title: "",
  content: "",
  img: "",
});

const form = ref();

const rules = {
  title: {
    rules: [
      {
        required: true,
        errorMessage: "请输入文章标题",
      },
    ],
  },
  content: {
    rules: [
      {
        required: true,
        errorMessage: "请输入文章内容",
      },
    ],
  },
};

const handleSelect = (e: any) => {
  const tempFilePath = e.tempFilePaths[0];
  uni.uploadFile({
    fileType: "image",
    url: import.meta.env.VITE_API_BASE_URL + "/upload",
    filePath: tempFilePath,
    name: "file",
    success: (uploadFileRes) => {
      const data = JSON.parse(uploadFileRes.data);
      formData.img = data.filename;
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
};

const submit = () => {
  form.value
    .validate()
    .then(async () => {
      const res = await postArticleApi(formData);
      console.log(res);
    })
    .catch((err: any) => {
      console.log("表单验证失败", err);
    });
};
</script>

<template>
  <view class="publish">
    <uni-forms
      ref="form"
      :rules="rules"
      :model="formData"
      labelWidth="80"
      label-position="top"
    >
      <uni-forms-item required label="文章标题" name="title">
        <uni-easyinput
          v-model="formData.title"
          type="text"
          placeholder="请输入文章标题"
        />
      </uni-forms-item>
      <uni-forms-item required label="文章内容" name="content">
        <uni-easyinput
          v-model="formData.content"
          type="textarea"
          placeholder="请输入文章内容"
        />
      </uni-forms-item>
      <uni-forms-item label="上传文件" name="img">
        <uni-file-picker
          v-model="formData.img"
          :limit="1"
          file-mediatype="image"
          @select="handleSelect"
        />
      </uni-forms-item>
      <button class="button-primary" @click="submit">提交</button>
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>
.publish {
  padding: 20rpx;
}
.button-primary {
  background-color: $uni-icon-color-active;
  color: $uni-text-color-inverse;
}
</style>

<script setup lang="ts">
import { postArticleApi, getArticleApi, updateArticleApi } from "@/api/article";
import { onHide, onShow } from "@dcloudio/uni-app";
import { reactive, ref } from "vue";

const formDataDefault = {
  title: "",
  content: "",
  img: "",
};

const formData = reactive({ ...formDataDefault });

const getArticle = async (id: number) => {
  const res = await getArticleApi(id);
  Object.assign(formData, res.data);
  console.log(formData);
};

const editData = reactive({
  isEdit: false,
  articleId: 0,
});

onShow(() => {
  const id = uni.$appParams?.id;
  if (id) {
    // 清空全局变量，避免后续干扰
    uni.$appParams = undefined;
    editData.articleId = id;
    editData.isEdit = true;
    getArticle(editData.articleId);
  }
});

const handleCancel = () => {
  editData.isEdit = false;
  editData.articleId = 0;
  Object.assign(formData, formDataDefault);
};

onHide(handleCancel);

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

const editArticle = async (id: number) => {
  form.value
    .validate()
    .then(async () => {
      const res = await updateArticleApi(id, formData);
      console.log(res);
      uni.switchTab({ url: "/pages/index/index" });
    })
    .catch((err: any) => {
      console.log("表单验证失败", err);
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
          :maxlength="2000"
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
      <button v-if="!editData.isEdit" class="button-primary" @click="submit()">
        提交
      </button>
      <view v-else>
        <button class="button-primary" @click="editArticle(editData.articleId)">
          修改
        </button>
        <button @click="handleCancel">取消</button>
      </view>
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

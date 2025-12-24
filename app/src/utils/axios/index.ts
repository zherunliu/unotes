import axios from "axios";
import { UniAdapter } from "uniapp-axios-adapter";

const instance = axios.create({
  adapter: UniAdapter,
  timeout: 3000,
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    uni.showLoading({
      title: "加载中...",
    });
    return config;
  },
  (err) => {
    uni.hideLoading();
    return Promise.reject(err);
  }
);

instance.interceptors.response.use((response) => {
  uni.hideLoading();
  const { data, status } = response;
  if (status !== 201) {
    uni.showToast({
      title: data.message || "请求失败",
      icon: "none",
    });
    return Promise.reject(data);
  }
  uni.showToast({
    title: "请求成功",
    icon: "success",
    mask: true,
  });
  return response;
});

export default instance;

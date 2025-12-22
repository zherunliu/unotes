import axios from "axios";
import { UniAdapter } from "uniapp-axios-adapter";

const instance = axios.create({
  adapter: UniAdapter,
  timeout: 3000,
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  return config;
});

instance.interceptors.response.use((response) => {
  console.log(response);
  return response.data;
});

export default instance;

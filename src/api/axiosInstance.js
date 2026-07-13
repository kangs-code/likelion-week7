import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => {
    const { isSuccess, result, message } = response.data;

    if (isSuccess) {
      return result;
    }

    return Promise.reject({ message, raw: response.data });
  },
  (error) => {
    const serverMessage = error.response?.data?.message;
    return Promise.reject({
      message: serverMessage || "서버와 통신 중 오류가 발생했습니다.",
      raw: error.response?.data,
    });
  },
);

export default instance;

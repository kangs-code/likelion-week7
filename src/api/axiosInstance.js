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

let isSessionExpiredHandled = false;

const handleSessionExpired = () => {
  if (isSessionExpiredHandled) {
    return;
  }

  isSessionExpiredHandled = true;

  localStorage.removeItem("accessToken");
  localStorage.removeItem("isLogin");

  alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
  window.location.href = "/login";
};

instance.interceptors.response.use(
  (response) => {
    const { isSuccess, result, message } = response.data;

    if (isSuccess) {
      return result;
    }

    return Promise.reject({ message, raw: response.data });
  },
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem("accessToken")) {
      handleSessionExpired();
    }

    const serverMessage = error.response?.data?.message;
    return Promise.reject({
      message: serverMessage || "서버와 통신 중 오류가 발생했습니다.",
      raw: error.response?.data,
    });
  },
);

export default instance;

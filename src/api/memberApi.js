import instance from "./axiosInstance";

export const signup = ({ email, password, name }) => {
  return instance.post("/api/v1/auth/signup", { email, password, name });
};

export const login = ({ email, password }) => {
  return instance.post("/api/v1/auth/login", { email, password });
};

export const getMyInfo = () => {
  return instance.get("/api/v1/members/me");
};

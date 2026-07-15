import instance from "./axiosInstance";

// 주문 생성 
export const createOrder = () => {
  return instance.post("/api/v1/orders", {});
};
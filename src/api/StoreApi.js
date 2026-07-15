import instance from "./axiosInstance";

export const getStores = (categoryId) => {
  const params = categoryId ? { categoryId } : {};
  return instance.get("/api/v1/stores", { params });
};

export const getStoreDetail = (storeId) => {
  return instance.get(`/api/v1/stores/${storeId}`);
};
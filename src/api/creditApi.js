import instance from "./axiosInstance";

export const getCredit = () => {
  return instance.get("/api/v1/credits");
};

export const chargeCredit = (amount) => {
  return instance.post("/api/v1/credits/charge", { amount });
};

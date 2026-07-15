import instance from "./axiosInstance";

// 장바구니 조회
export const getCart = () => {
  return instance.get("/api/v1/carts");
};

// 장바구니 메뉴 추가
export const addCartItem = ({ menuId, quantity, selectedOptions }) => {
  return instance.post("/api/v1/carts/items", { menuId, quantity, selectedOptions });
};

// 장바구니 메뉴 수량 변경 
export const updateCartItemQuantity = (cartItemId, quantity) => {
  return instance.patch(`/api/v1/carts/items/${cartItemId}`, { quantity });
};

// 장바구니 메뉴 삭제
export const deleteCartItem = (cartItemId) => {
  return instance.delete(`/api/v1/carts/items/${cartItemId}`);
};
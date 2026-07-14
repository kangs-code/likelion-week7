import { create } from "zustand";
import {
  getCart,
  addCartItem,
  updateCartItemQuantity,
  deleteCartItem,
} from "../api/cartApi";

const useCartStore = create((set, get) => ({
  cartItems: [],   
  totalPrice: 0,
  isLoading: false,

  // 장바구니 조회 
  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const result = await getCart();
      set({
        cartItems: result?.cartItems || [],
        totalPrice: result?.totalPrice || 0,
      });
    } catch (error) {
      console.error("장바구니 조회 실패:", error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  // 장바구니 추가 
  addItem: async (menuId, quantity, selectedOptions) => {
    await addCartItem({ menuId, quantity, selectedOptions });
    await get().fetchCart();
  },

  // 수량 변경 
  updateQuantity: async (cartItemId, newQuantity) => {
    await updateCartItemQuantity(cartItemId, newQuantity);
    await get().fetchCart();
  },

  // 삭제
  removeItem: async (cartItemId) => {
    await deleteCartItem(cartItemId);
    await get().fetchCart();
  },
}));

export default useCartStore;
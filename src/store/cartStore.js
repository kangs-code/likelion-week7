import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: {},

  addItem: (menu, storeName, storeId) =>
  set((state) => ({
    cart: {
      ...state.cart,
      [`${storeId}-${menu.id}`]: { ...menu, quantity: 1, storeName, storeId },
    },
  })),

  removeItem: (menuId) =>
    set((state) => {
      const next = { ...state.cart };
      delete next[menuId];
      return { cart: next };
    }),

  updateQuantity: (menuId, delta) =>
    set((state) => {
      const item = state.cart[menuId];
      if (!item) return state;
      const newQty = item.quantity + delta;
      if (newQty <= 0) {
        const next = { ...state.cart };
        delete next[menuId];
        return { cart: next };
      }
      return {
        cart: { ...state.cart, [menuId]: { ...item, quantity: newQty } },
      };
    }),

  clearCart: () => set({ cart: {} }),
}));

export default useCartStore;
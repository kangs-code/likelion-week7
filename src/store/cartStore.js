import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: {},

  addItem: (menu, storeName, storeId, selectedOption) =>
    set((state) => {
      const cartKey = `${storeId}-${menu.id}-${selectedOption.label}`;
      const existing = state.cart[cartKey];
      return {
        cart: {
          ...state.cart,
          [cartKey]: existing
            ? { ...existing, quantity: existing.quantity + 1 }
            : {
                ...menu,
                quantity: 1,
                storeName,
                storeId,
                selectedOption,
                totalPrice: menu.price + selectedOption.extra,
              },
        },
      };
    }),

  removeItem: (cartKey) =>
    set((state) => {
      const next = { ...state.cart };
      delete next[cartKey];
      return { cart: next };
    }),

  updateQuantity: (cartKey, delta) =>
    set((state) => {
      const item = state.cart[cartKey];
      if (!item) return state;
      const newQty = item.quantity + delta;
      if (newQty <= 0) {
        const next = { ...state.cart };
        delete next[cartKey];
        return { cart: next };
      }
      return {
        cart: { ...state.cart, [cartKey]: { ...item, quantity: newQty } },
      };
    }),

  clearCart: () => set({ cart: {} }),
}));

export default useCartStore;
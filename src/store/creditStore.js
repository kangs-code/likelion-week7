import { create } from "zustand";
import { getCredit, chargeCredit } from "../api/creditApi";

const useCreditStore = create((set, get) => ({
  credit: 0,
  isLoading: false,

  fetchCredit: async () => {
    set({ isLoading: true });
    try {
      const result = await getCredit();
      set({ credit: result?.balance ?? 0 });
    } catch (error) {
      console.error("크레딧 조회 실패:", error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  charge: async (amount) => {
    await chargeCredit(amount);
    await get().fetchCredit();
  },

  deduct: (amount) =>
    set((state) => ({ credit: Math.max(state.credit - amount, 0) })),

  hasEnough: (amount) => get().credit >= amount,
}));

export default useCreditStore;

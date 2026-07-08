import { create } from "zustand";

// 크레딧(적립/포인트) 잔액을 관리하는 store.
// - 지금은 클라이언트 상태로만 관리하지만, 다음 주 API 연동 과제에서는
//   charge/deduct 내부 로직만 서버 요청(fetch)으로 바꿔주면 되도록
//   "상태 + 액션" 형태로 분리해두었다. (컴포넌트는 액션 이름만 알면 됨)
const useCreditStore = create((set, get) => ({
  // TODO(API 연동): 로그인한 유저의 실제 보유 크레딧 조회 값으로 대체
  credit: 5000,

  // 크레딧 충전
  charge: (amount) =>
    set((state) => ({ credit: state.credit + amount })),

  // 크레딧 차감 (결제)
  deduct: (amount) =>
    set((state) => ({ credit: Math.max(state.credit - amount, 0) })),

  // 현재 크레딧으로 amount를 결제할 수 있는지 여부
  hasEnough: (amount) => get().credit >= amount,
}));

export default useCreditStore;

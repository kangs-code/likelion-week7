import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import useCreditStore from "../store/creditStore";
import { createOrder } from "../api/OrderApi";
import Layout from "../components/Layout";
import "./Cart.css";

function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const credit = useCreditStore((state) => state.credit);
  const fetchCredit = useCreditStore((state) => state.fetchCredit);

  const [isOrdered, setIsOrdered] = useState(false);
  const [orderResult, setOrderResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    fetchCart();
    fetchCredit();
  }, [fetchCart, fetchCredit]);

  const remainingCredit = credit - totalPrice;
  const isEnough = totalPrice > 0 && remainingCredit >= 0;
 

  const handleQuantityChange = async (item, delta) => {
    const newQty = item.quantity + delta;
    try {
      if (newQty <= 0) {
        await removeItem(item.cartItemId);
      } else {
        await updateQuantity(item.cartItemId, newQty);
      }
    } catch (error) {
      alert(error.message || "수량 변경에 실패했습니다.");
    }
  };

 

  const handleRemove = async (item) => {
    try {
      await removeItem(item.cartItemId);
    } catch (error) {
      alert(error.message || "삭제에 실패했습니다.");
    }
  };



  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    try {
      setIsSubmitting(true);
      const result = await createOrder();
      setOrderResult(result);
      setIsOrdered(true);
      await fetchCredit(); // 크레딧 잔액 갱신
    } catch (error) {
      const code = error.raw?.code || "";
      const msg = error.message || "";

      if (code === "ORDER400_2" || msg.includes("잔액") || msg.includes("부족")) {
        alert("크레딧이 부족합니다. 충전 후 다시 결제해주세요.");
        navigate("/charge");
      } else if (code === "ORDER404_1") {
        alert("크레딧 계좌가 개설되지 않았습니다. 충전 페이지에서 개설해주세요.");
        navigate("/charge");
      } else {
        alert(msg || "주문에 실패했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

 

  if (isOrdered) {
    return (
      <Layout>
        <div className="order-complete">
          <h2>주문 완료!</h2>
          <p>음식이 배달 됩니다 ...</p>
          {orderResult && (
            <p className="order-total">
              결제 금액: {orderResult.totalPrice?.toLocaleString()}원
            </p>
          )}
          <Link to="/main" className="btn-home">
            홈으로
          </Link>
        </div>
      </Layout>
    );
  }

  

  return (
    <Layout>
      <div className="cart-container">
        <h2>장바구니</h2>

        {isLoading ? (
          <p className="cart-empty">로딩 중...</p>
        ) : cartItems.length === 0 ? (
          <p className="cart-empty">장바구니가 비어있습니다.</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="cart-item">
                  <div className="cart-item-info">
                    <h4>{item.menuName}</h4>
                    {item.selectedOptionsNames?.length > 0 && (
                      <span className="cart-item-option">
                        {item.selectedOptionsNames.join(", ")}
                      </span>
                    )}
                    <p>
                      {(item.expectPrice * item.quantity).toLocaleString()}원
                    </p>
                  </div>
                  <div className="cart-item-controls">
                    <button onClick={() => handleQuantityChange(item, -1)}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item, 1)}>
                      +
                    </button>
                    <button
                      className="btn-remove"
                      onClick={() => handleRemove(item)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>결제하기 (크레딧)</h3>

              <div className="credit-box">
                <div className="credit-row">
                  <span>보유 크레딧</span>
                  <span>{credit.toLocaleString()}C</span>
                </div>
                <div className="credit-row">
                  <span>차감 예정 크레딧</span>
                  <span className="credit-negative">
                    -{totalPrice.toLocaleString()}C
                  </span>
                </div>
                <div className="credit-row">
                  <span>결제 후 잔액</span>
                  <span
                    className={
                      isEnough ? "credit-positive" : "credit-insufficient"
                    }
                  >
                    {remainingCredit.toLocaleString()}C
                  </span>
                </div>
                <div className="credit-row credit-row-final">
                  <span>총 결제금액</span>
                  <span>{totalPrice.toLocaleString()}원</span>
                </div>
              </div>

              {!isEnough && (
                <Link to="/charge" className="btn-charge-link">
                  크레딧이 부족해요. 충전하러 가기 →
                </Link>
              )}

              <button
                className="btn-checkout"
                onClick={handleCheckout}
                disabled={!isEnough || isSubmitting}
              >
                {isSubmitting
                  ? "결제 중..."
                  : `${totalPrice.toLocaleString()}원 결제하기`}
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Cart;

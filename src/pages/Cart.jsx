import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import useCreditStore from "../store/creditStore";
import "./Cart.css";

function Cart() {
  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const credit = useCreditStore((state) => state.credit);
  const deduct = useCreditStore((state) => state.deduct);

  const [isOrdered, setIsOrdered] = useState(false);
  const navigate = useNavigate();

  const cartEntries = Object.entries(cart);
  const cartItems = Object.values(cart);
  const grouped = cartEntries.reduce((acc, [cartKey, item]) => {
    if (!acc[item.storeName]) acc[item.storeName] = [];
    acc[item.storeName].push({ cartKey, ...item });
    return acc;
  }, {});
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.totalPrice * item.quantity,
    0
  );

  const remainingCredit = credit - totalPrice;
  const isEnough = totalPrice > 0 && remainingCredit >= 0;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    if (!isEnough) {
      alert("크레딧이 부족합니다. 충전 후 다시 결제해주세요.");
      navigate("/charge");
      return;
    }

    deduct(totalPrice);
    clearCart();
    setIsOrdered(true);
  };

  if (isOrdered) {
    return (
      <div className="order-complete">
        <h2>주문 완료!</h2>
        <p>음식이 배달 됩니다 ...</p>
        <Link to="/main" className="btn-home">홈으로</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>장바구니</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">장바구니가 비어있습니다.</p>
      ) : (
        <>
          <div className="cart-items">
            {Object.entries(grouped).map(([storeName, items]) => (
              <div key={storeName} className="cart-store-group">
                <h3 className="cart-store-name">{storeName}</h3>
                {items.map((item) => (
                  <div key={item.cartKey} className="cart-item">
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <span className="cart-item-option">{item.selectedOption.label}</span>
                      <p>{(item.totalPrice * item.quantity).toLocaleString()}원</p>
                    </div>
                    <div className="cart-item-controls">
                      <button onClick={() => updateQuantity(item.cartKey, -1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartKey, 1)}>+</button>
                      <button className="btn-remove" onClick={() => removeItem(item.cartKey)}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>결제하기 (크레딧)</h3>

            <div className="credit-box">
              <div className="credit-row">
                <span>총 결제금액</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </div>
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
              <div className="credit-row credit-row-final">
                <span>결제 후 잔액</span>
                <span className={isEnough ? "credit-positive" : "credit-insufficient"}>
                  {remainingCredit.toLocaleString()}C
                </span>
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
              disabled={!isEnough}
            >
              {totalPrice.toLocaleString()}원 결제하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

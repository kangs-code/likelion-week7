import { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";
import "./Cart.css";

function Cart() {
  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isOrdered, setIsOrdered] = useState(false);

  const cartItems = Object.values(cart);
  const grouped = cartItems.reduce((acc, item) => {
    if (!acc[item.storeName]) acc[item.storeName] = [];
    acc[item.storeName].push(item);
    return acc;
  }, {});
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!paymentMethod) {
      alert("결제 방법을 선택해주세요.");
      return;
    }
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
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>{(item.price * item.quantity).toLocaleString()}원</p>
                    </div>
                    <div className="cart-item-controls">
                      <button onClick={() => updateQuantity(`${item.storeId}-${item.id}`, -1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(`${item.storeId}-${item.id}`, 1)}>+</button>
                      <button className="btn-remove" onClick={() => removeItem(`${item.storeId}-${item.id}`)}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>결제하기</h3>
            <div className="cart-payment">
              <p className="payment-label">결제 방법</p>
              <div className="payment-options">
                {["카카오페이", "네이버페이", "카드 결제", "무통장 입금"].map((method) => (
                  <button
                    key={method}
                    className={paymentMethod === method ? "active" : ""}
                    onClick={() => setPaymentMethod(method)}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
            <div className="cart-total">
              <span>총 결제금액</span>
              <span>{totalPrice.toLocaleString()}원</span>
            </div>
            <button className="btn-checkout" onClick={handleCheckout}>
              {totalPrice.toLocaleString()}원 결제하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
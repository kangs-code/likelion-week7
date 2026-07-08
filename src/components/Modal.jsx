import { useState } from "react";
import useCartStore from "../store/cartStore";
import "./Modal.css";

function Modal({ menus, onClose, name, rate, storeId }) {
  const cart = useCartStore((state) => state.cart);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const [selectedOptions, setSelectedOptions] = useState({});

  const getOption = (menu) =>
    selectedOptions[menu.id] || menu.option[0];

  const handleOption = (menuId, opt) => {
    setSelectedOptions((prev) => ({ ...prev, [menuId]: opt }));
  };

  const handleAdd = (menu) => {
    const opt = getOption(menu);
    addItem(menu, name, storeId, opt);
    alert(`${menu.name} (${opt.label}) 장바구니에 담겼습니다.`);
  };

  const handleNum = (cartKey, delta) => {
    const current = cart[cartKey]?.quantity || 0;
    const menuName = cart[cartKey]?.name;
    updateQuantity(cartKey, delta);
    if (current + delta <= 0) {
      alert(`${menuName} 삭제되었습니다.`);
    } else {
      alert(`${menuName} 수량이 ${current + delta}개로 변경되었습니다.`);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{name}</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-rate">⭐ {rate}</div>
        {menus.map((menu) => {
          const opt = getOption(menu);
          const cartKey = `${storeId}-${menu.id}-${opt.label}`;
          return (
            <div key={menu.id} className="menu-item">
              <div className="menu-info">
                <h4>{menu.name}</h4>
                <p className="menu-desc">{menu.desc}</p>
                <p className="menu-price">
                  {(menu.price + opt.extra).toLocaleString()}원
                </p>
                <div className="option-list">
                  {menu.option.map((o) => (
                    <button
                      key={o.label}
                      className={`menu-option ${opt.label === o.label ? "selected" : ""}`}
                      onClick={() => handleOption(menu.id, o)}
                    >
                      {o.label}
                      {o.extra > 0 && ` (+${o.extra.toLocaleString()}원)`}
                    </button>
                  ))}
                </div>
              </div>
              {cart[cartKey] ? (
                <div className="quantity-control">
                  <button onClick={() => handleNum(cartKey, -1)}>−</button>
                  <span>{cart[cartKey].quantity}</span>
                  <button onClick={() => handleNum(cartKey, 1)}>+</button>
                </div>
              ) : (
                <button className="btn-add" onClick={() => handleAdd(menu)}>
                  담기
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Modal;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import "./Modal.css";

function Modal({ menus, onClose, name, rate, storeId }) {
  const cart = useCartStore((state) => state.cart);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState({});

  const isMultiple = (menu) => menu.multiple === true;

  const getSelected = (menu) => {
    if (isMultiple(menu)) {
      return selectedOptions[menu.id] || [];
    }
    return selectedOptions[menu.id] || menu.option[0];
  };

  const isOptionSelected = (menu, opt) => {
    const selected = getSelected(menu);
    return isMultiple(menu)
      ? selected.some((o) => o.label === opt.label)
      : selected.label === opt.label;
  };

  const handleOptionClick = (menu, opt) => {
    if (isMultiple(menu)) {
      setSelectedOptions((prev) => {
        const current = prev[menu.id] || [];
        const already = current.some((o) => o.label === opt.label);
        const next = already
          ? current.filter((o) => o.label !== opt.label)
          : [...current, opt];
        return { ...prev, [menu.id]: next };
      });
    } else {
      setSelectedOptions((prev) => ({ ...prev, [menu.id]: opt }));
    }
  };

  const getCombinedOption = (menu) => {
    const selected = getSelected(menu);
    if (!isMultiple(menu)) return selected;

    if (selected.length === 0) {
      return { label: "옵션 없음", extra: 0 };
    }
    return {
      label: selected.map((o) => o.label).join(", "),
      extra: selected.reduce((sum, o) => sum + o.extra, 0),
    };
  };

  const handleAdd = (menu) => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    if (!isLogin) {
      alert("로그인이 필요한 기능입니다.");
      onClose();
      navigate("/login");
      return;
    }

    const opt = getCombinedOption(menu);
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
          const opt = getCombinedOption(menu);
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
                      className={`menu-option ${isOptionSelected(menu, o) ? "selected" : ""}`}
                      onClick={() => handleOptionClick(menu, o)}
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

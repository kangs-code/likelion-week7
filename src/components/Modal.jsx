import { useState } from "react";
import "./Modal.css";

function Modal({ menus, onClose, name, rate }) {
  const [num, setNum] = useState({});

  const handleAdd = (menuId) => {
    //담기 누르면 수량 1로 세팅
    setNum({ ...num, [menuId]: 1 });
    const menu = menus.find((menu) => menu.id === menuId);
    alert(`${menu.name}이(가) 장바구니에 담겼습니다.`);
  };

  const handleNum = (menuId, add) => {
    const current = num[menuId] + add;
    const menu = menus.find((m) => m.id === menuId);
    if (current <= 0) {
      const next = { ...num };
      delete next[menuId];
      setNum(next);
      alert(`${menu.name}이(가) 삭제되었습니다.`);
    } else {
      setNum({ ...num, [menuId]: current });
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
        {menus.map((menu) => (
          <div key={menu.id} className="menu-item">
            <div className="menu-info">
              <h4>{menu.name}</h4>
              <p className="menu-desc">{menu.description}</p>
              <p className="menu-price">{menu.price.toLocaleString()}원</p>
            </div>
            {num[menu.id] ? (
              <div className="quantity-control">
                <button onClick={() => handleNum(menu.id, -1)}>-</button>
                <span>{num[menu.id]}</span>
                <button onClick={() => handleNum(menu.id, 1)}>+</button>
              </div>
            ) : (
              <button className="btn-add" onClick={() => handleAdd(menu.id)}>
                담기
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Modal;

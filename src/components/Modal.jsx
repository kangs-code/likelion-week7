import useCartStore from "../store/cartStore";
import "./Modal.css";

function Modal({ menus, onClose, name, rate, storeId }) {
  const cart = useCartStore((state) => state.cart);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const handleAdd = (menuId) => {
    const menu = menus.find((m) => m.id === menuId);
    addItem(menu, name, storeId);
    alert(`${menu.name}이(가) 장바구니에 담겼습니다.`);
  };

  const handleNum = (cartKey, add) => {
    const current = cart[cartKey]?.quantity || 0;
    const menuName = cart[cartKey]?.name;
    updateQuantity(cartKey, add);
    if (current + add <= 0) {
      alert(`${menuName}이(가) 삭제되었습니다.`);
    } else {
      alert(`${menuName} 수량이 ${current + add}개로 변경되었습니다.`);
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
          const cartKey = `${storeId}-${menu.id}`;
          return (
            <div key={menu.id} className="menu-item">
              <div className="menu-info">
                <h4>{menu.name}</h4>
                <p className="menu-desc">{menu.desc}</p>
                <p className="menu-price">{menu.price.toLocaleString()}원</p>
              </div>
              {cart[cartKey] ? (
                <div className="quantity-control">
                  <button onClick={() => handleNum(cartKey, -1)}>−</button>
                  <span>{cart[cartKey].quantity}</span>
                  <button onClick={() => handleNum(cartKey, 1)}>+</button>
                </div>
              ) : (
                <button className="btn-add" onClick={() => handleAdd(menu.id)}>
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

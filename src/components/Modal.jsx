import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import "./Modal.css";

function Modal({ store, onClose }) {
  const addItem = useCartStore((state) => state.addItem);
  const navigate = useNavigate();

  
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isAdding, setIsAdding] = useState(false);

 

  const getSelectedIds = (menuId, groupId) => {
    return selectedOptions[menuId]?.[groupId] || [];
  };

  const isOptionSelected = (menuId, groupId, optionId) => {
    return getSelectedIds(menuId, groupId).includes(optionId);
  };

  const handleOptionClick = (menuId, group, option) => {
    setSelectedOptions((prev) => {
      const menuOpts = prev[menuId] || {};
      const groupOpts = menuOpts[group.optionGroupId] || [];
      const optId = option.menuOptionId;

      let next;

      if (group.maxSelectCount === 1) {
       
        next = groupOpts.includes(optId) ? [] : [optId];
      } else {
        
        if (groupOpts.includes(optId)) {
          next = groupOpts.filter((id) => id !== optId);
        } else if (groupOpts.length < group.maxSelectCount) {
          next = [...groupOpts, optId];
        } else {
          return prev; 
        }
      }

      return {
        ...prev,
        [menuId]: { ...menuOpts, [group.optionGroupId]: next },
      };
    });
  };

  

  const getExtraPrice = (menu) => {
    const menuOpts = selectedOptions[menu.menuId] || {};
    let extra = 0;

    for (const group of menu.optionGroups || []) {
      for (const opt of group.options) {
        const ids = menuOpts[group.optionGroupId] || [];
        if (ids.includes(opt.menuOptionId)) {
          extra += opt.optionPrice;
        }
      }
    }
    return extra;
  };

  

  const getAllSelectedOptionIds = (menu) => {
    const menuOpts = selectedOptions[menu.menuId] || {};
    return Object.values(menuOpts).flat();
  };

  

  const handleAdd = async (menu) => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    if (!isLogin) {
      alert("로그인이 필요한 기능입니다.");
      onClose();
      navigate("/login");
      return;
    }

    
    for (const group of menu.optionGroups || []) {
      if (group.essential) {
        const selected = getSelectedIds(menu.menuId, group.optionGroupId);
        if (selected.length === 0) {
          alert(`"${group.title}" 옵션을 선택해주세요.`);
          return;
        }
      }
    }

    const optionIds = getAllSelectedOptionIds(menu);

    try {
      setIsAdding(true);
      await addItem(menu.menuId, 1, optionIds);
      alert(`${menu.menuName} 장바구니에 담겼습니다.`);
    } catch (error) {
      alert(error.message || "장바구니 담기에 실패했습니다.");
    } finally {
      setIsAdding(false);
    }
  };

  

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{store.storeName}</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {(store.menus || []).map((menu) => (
          <div key={menu.menuId} className="menu-item">
            <div className="menu-info">
              <h4>{menu.menuName}</h4>
              {menu.description && (
                <p className="menu-desc">{menu.description}</p>
              )}
              <p className="menu-price">
                {(menu.price + getExtraPrice(menu)).toLocaleString()}원
              </p>

              {/* 옵션 그룹 */}
              {(menu.optionGroups || []).map((group) => (
                <div key={group.optionGroupId} className="option-group">
                  <p className="option-group-title">
                    {group.title}
                    {group.essential && (
                      <span className="required"> (필수)</span>
                    )}
                    {group.maxSelectCount > 1 && (
                      <span className="max-count">
                        {" "}
                        (최대 {group.maxSelectCount}개)
                      </span>
                    )}
                  </p>
                  <div className="option-list">
                    {group.options.map((opt) => (
                      <button
                        key={opt.menuOptionId}
                        className={`menu-option ${
                          isOptionSelected(
                            menu.menuId,
                            group.optionGroupId,
                            opt.menuOptionId
                          )
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          handleOptionClick(menu.menuId, group, opt)
                        }
                      >
                        {opt.optionName}
                        {opt.optionPrice > 0 &&
                          ` (+${opt.optionPrice.toLocaleString()}원)`}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="btn-add"
              onClick={() => handleAdd(menu)}
              disabled={isAdding}
            >
              {isAdding ? "담는 중..." : "담기"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Modal;

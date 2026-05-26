import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLogin") === "true",
  );

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    setIsLogin(false);
    setIsOpen(false);
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        배달주문
      </Link>

      <button className="navbar-menu-button" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <nav className={isOpen ? "navbar-links active" : "navbar-links"}>
        {isLogin ? (
          <>
            <Link to="/cart" onClick={closeMenu}>
              장바구니
            </Link>
            <button className="navbar-logout" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={closeMenu}>
              로그인
            </Link>
            <Link to="/signup" onClick={closeMenu}>
              회원가입
            </Link>
            <Link to="/" onClick={closeMenu}>
              메인
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;

import { useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar">
      <Link to="/main" className="navbar-logo">
        배달주문
      </Link>

      <button className="navbar-menu-button" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <nav className={isOpen ? "navbar-links active" : "navbar-links"}>
        <Link to="/login">로그인</Link>

        <Link to="/signup">회원가입</Link>

        <Link to="/main">메인</Link>
      </nav>
    </header>
  );
}

export default Navbar;

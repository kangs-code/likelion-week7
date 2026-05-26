import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const isValid = id !== "" && password !== "";

  const handleLogin = (e) => {
    e.preventDefault();

    if (!isValid) {
      return;
    }

    const savedUser = localStorage.getItem("userInfo");

    if (!savedUser) {
      alert("회원가입된 정보가 없습니다.");
      return;
    }

    const userInfo = JSON.parse(savedUser);

    if (id === userInfo.id && password === userInfo.password) {
      localStorage.setItem("isLogin", "true");

      alert("로그인 성공");
      navigate("/");
      window.location.reload();
    } else {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <main className="login-page">
      <form className="login-box" onSubmit={handleLogin}>
        <h1>로그인</h1>

        <input
          type="text"
          placeholder="아이디 입력"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled={!isValid}>로그인</button>

        <div className="signup-link">
          <span>계정이 없나요?</span>
          <Link to="/signup">회원가입</Link>
        </div>
      </form>
    </main>
  );
}

export default Login;

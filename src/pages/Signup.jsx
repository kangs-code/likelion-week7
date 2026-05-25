import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const isValid = id !== "" && password !== "" && nickname !== "";

  const handleSignup = (e) => {
    e.preventDefault();

    if (!isValid) {
      return;
    }

    const userInfo = {
      id: id,
      password: password,
      nickname: nickname,
    };

    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    alert("회원가입 완료");

    navigate("/login");
  };

  return (
    <main className="signup-page">
      <form className="signup-box" onSubmit={handleSignup}>
        <h1>회원가입</h1>

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

        <input
          type="text"
          placeholder="닉네임 입력"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <button disabled={!isValid}>회원가입</button>

        <div className="login-link">
          <span>이미 계정이 있나요?</span>

          <Link to="/login">로그인</Link>
        </div>
      </form>
    </main>
  );
}

export default Signup;

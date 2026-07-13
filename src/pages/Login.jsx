import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import { login } from "../api/memberApi";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = email !== "" && password !== "";

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isValid || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await login({ email, password });

      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("isLogin", "true");

      alert("로그인 성공");
      navigate("/");
      window.location.reload();
    } catch (error) {
      alert(error.message || "아이디 또는 비밀번호가 일치하지 않습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout center>
      <form className="login-box" onSubmit={handleLogin}>
        <h1>로그인</h1>

        <input
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled={!isValid || isSubmitting}>
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>

        <div className="signup-link">
          <span>계정이 없나요?</span>
          <Link to="/signup">회원가입</Link>
        </div>
      </form>
    </Layout>
  );
}

export default Login;

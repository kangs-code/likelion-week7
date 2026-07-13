import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import { signup } from "../api/memberApi";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = email !== "" && password !== "" && name !== "";

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isValid || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      await signup({ email, password, name });

      alert("회원가입 완료");
      navigate("/login");
    } catch (error) {
      alert(error.message || "회원가입에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout center>
      <form className="signup-box" onSubmit={handleSignup}>
        <h1>회원가입</h1>

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

        <input
          type="text"
          placeholder="이름 입력"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button disabled={!isValid || isSubmitting}>
          {isSubmitting ? "가입 중..." : "회원가입"}
        </button>

        <div className="login-link">
          <span>이미 계정이 있나요?</span>

          <Link to="/login">로그인</Link>
        </div>
      </form>
    </Layout>
  );
}

export default Signup;

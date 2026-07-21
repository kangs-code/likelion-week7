import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import { signup } from "../api/memberApi";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isPasswordMatch = passwordCheck === "" || password === passwordCheck;
  const isValid =
    email !== "" &&
    password !== "" &&
    passwordCheck !== "" &&
    password === passwordCheck;

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isValid || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      await signup({ email, password });

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

        <span className="password-hint">
          영문, 숫자, 특수문자를 포함한 8자 이상 입력해주세요.
        </span>

        <input
          type="password"
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        {!isPasswordMatch && (
          <span className="password-mismatch">비밀번호가 일치하지 않습니다.</span>
        )}

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

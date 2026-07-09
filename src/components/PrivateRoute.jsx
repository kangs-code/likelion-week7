import { useEffect } from "react";
import { Navigate } from "react-router-dom";

// 로그인이 필요한 라우트를 감싸는 가드.
// Navbar.jsx와 동일하게 localStorage의 isLogin 값으로 로그인 여부를 판단한다.
// 비로그인 상태로 접근하면 로그인 페이지로 돌려보낸다.
function PrivateRoute({ children }) {
  const isLogin = localStorage.getItem("isLogin") === "true";

  useEffect(() => {
    if (!isLogin) {
      alert("로그인이 필요한 서비스입니다.");
    }
  }, [isLogin]);

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;

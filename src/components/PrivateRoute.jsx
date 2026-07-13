import { useEffect } from "react";
import { Navigate } from "react-router-dom";

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

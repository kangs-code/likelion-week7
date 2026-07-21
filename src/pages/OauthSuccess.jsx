import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";

function OauthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");

    if (!accessToken) {
      alert("로그인에 실패했습니다.");
      navigate("/login", { replace: true });
      return;
    }

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("isLogin", "true");

    navigate("/", { replace: true });
    window.location.reload();
  }, [searchParams, navigate]);

  return (
    <Layout center>
      <p>로그인 처리 중입니다...</p>
    </Layout>
  );
}

export default OauthSuccess;

import "./Layout.css";

// 모든 페이지가 각자 padding-top 값을 따로 들고 있던 걸 공통으로 관리하기 위한 컴포넌트.
// Navbar가 position: fixed라서, 그 아래 콘텐츠는 항상 navbar 높이만큼 띄워줘야 하는데
// 그 계산(및 화면 크기별 값)을 여기서 한 번만 해준다.
//
// center=true 로 주면 로그인/회원가입처럼 화면 가운데 정렬이 필요한 페이지에 쓸 수 있다.
function Layout({ children, center = false }) {
  return (
    <main className={center ? "page-layout page-layout-center" : "page-layout"}>
      {children}
    </main>
  );
}

export default Layout;

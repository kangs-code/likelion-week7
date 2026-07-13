import "./Layout.css";

function Layout({ children, center = false }) {
  return (
    <main className={center ? "page-layout page-layout-center" : "page-layout"}>
      {children}
    </main>
  );
}

export default Layout;

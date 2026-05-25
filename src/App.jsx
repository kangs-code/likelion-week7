import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import "./index.css";

function MainTemp() {
  return (
    <div className="temp-page">
      <h1>메인 페이지</h1>
      <p>팀원이 Main.jsx 구현 후 연결 예정</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/main" element={<MainTemp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

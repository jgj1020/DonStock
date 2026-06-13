import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import SignUp from "./pages/SignUp";
import MainDashboard from "./pages/MainDashboard";

function LoginPage() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(
      localStorage.getItem("ds_users") || "[]"
    );

    const user = users.find(
      (u: any) =>
        u.id === id &&
        u.pw === pw
    );

    if (!user) {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    // 현재 로그인 사용자 저장
    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    navigate("/dashboard");
  };

  return (
    <div className="container">

      {/* 로고 */}
      <div className="logo-area">
        <img
          src="/logo.png"
          alt="DonStock Logo"
          className="logo"
        />
      </div>

      {/* 로그인 카드 */}
      <form
        className="login-card"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >

        <h1 className="title">
          돈스탁에 어서오세요!
          <span className="wave">👋</span>
        </h1>

        <p className="sub-text">
          모의투자로 경제 감각을 키워보세요.
        </p>

        {/* 아이디 */}
        <div className="input-group">
          <label>아이디 (ID)</label>

          <input
            type="text"
            placeholder="아이디를 입력하세요"
            value={id}
            onChange={(e) =>
              setId(e.target.value)
            }
          />
        </div>

        {/* 비밀번호 */}
        <div className="input-group">
          <label>비밀번호 (Password)</label>

          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={pw}
            onChange={(e) =>
              setPw(e.target.value)
            }
          />
        </div>

        {/* 로그인 버튼 */}
        <button
          type="submit"
          className="login-btn"
        >
          시작하기 (로그인)
        </button>

        {/* 회원가입 */}
        <div className="signup">
          처음이신가요?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{
              cursor: "pointer"
            }}
          >
            회원가입하기
          </span>
        </div>

      </form>

      {/* 하단 */}
      <div className="footer">
        Developer:
        <span> KJun </span>
        |
        Email:
        <span> s2433@e-mirim.hs.kr </span>
      </div>

    </div>
  );
}

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<LoginPage />}
      />

      <Route
        path="/signup"
        element={<SignUp />}
      />

      <Route
        path="/dashboard"
        element={<MainDashboard />}
      />

    </Routes>
  );
}

export default App;
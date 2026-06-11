import "./App.css";

function App() {
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
      <div className="login-card">
        <h1 className="title">
          돈스탁에 어서오세요!
          <span className="wave">👋</span>
        </h1>

        <p className="sub-text">
          모의투자로 경제 감각을 키워보세요.
        </p>

        <div className="input-group">
          <label>아이디 (ID)</label>
          <input
            type="text"
            placeholder="아이디를 입력하세요"
          />
        </div>

        <div className="input-group">
          <label>비밀번호 (Password)</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        <button className="login-btn">
          시작하기 (로그인)
        </button>

        <div className="signup">
          처음이신가요? <span>회원가입하기</span>
        </div>
      </div>

      <div className="footer">
        Developer: <span>KJun</span> | Email: s2433@e-mirim.hs.kr
      </div>
    </div>
  );
}

export default App;
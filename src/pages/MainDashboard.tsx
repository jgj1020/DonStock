import "./MainDashboard.css";

export default function MainDashboard() {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );

  const nickname =
    currentUser.nickname || "사용자";

  return (
    <div className="dashboard">

      {/* 배경 떠다니는 주식 */}
      <div className="floating-stock stock1">
        ▲ SAMSUNG +2.4%
      </div>

      <div className="floating-stock stock2">
        ▲ APPLE +1.7%
      </div>

      <div className="floating-stock stock3">
        ▼ TESLA -0.8%
      </div>

      {/* 상단 */}
      <header className="top-bar">

        <div className="logo-section">

          <img
            src="/logo.png"
            alt="돈스탁"
            className="dashboard-logo"
          />

          <div>
            <h1>돈스탁</h1>

            <p>
              {nickname}님
            </p>

          </div>

        </div>

        <button className="profile-btn">
          👤 내 정보
        </button>

      </header>


      {/* 카드 영역 */}
      <div className="card-grid">

        {/* 보유 자산 */}
        <div className="card">

          <h3>
            💰 보유 자산
          </h3>

          <h1>
            ₩1,000,000
          </h1>

          <p>
            가상 자산으로 투자 중
          </p>

        </div>


        {/* 오늘의 수익률 */}
        <div className="card">

          <h3>
            📈 오늘의 수익률
          </h3>

          <h1 className="up">
            +2.35%
          </h1>

          <p>
            ▲ 23,500원
          </p>

        </div>


        {/* 관심 종목 */}
        <div className="card">

          <h3>
            ⭐ 관심 종목
          </h3>

          <div className="stock-item">
            <span>삼성전자</span>
            <span className="up">
              +1.8%
            </span>
          </div>

          <div className="stock-item">
            <span>카카오</span>
            <span className="down">
              -0.4%
            </span>
          </div>

          <div className="stock-item">
            <span>네이버</span>
            <span className="up">
              +3.1%
            </span>
          </div>

        </div>


        {/* 오늘의 투자 한마디 */}
        <div className="card">

          <h3>
            📢 오늘의 투자 한마디
          </h3>

          <p className="quote">
            "분산 투자와 장기 투자가 중요해요."
          </p>

        </div>

      </div>


      {/* 하단 메뉴 */}
      <div className="bottom-nav">

        <div className="nav-item active">
          🏠
          <span>홈</span>
        </div>

        <div className="nav-item">
          🤖
          <span>AI 추천</span>
        </div>

        <div className="nav-item">
          📚
          <span>주식 설명</span>
        </div>

        <div className="nav-item">
          📈
          <span>증권</span>
        </div>

      </div>

    </div>
  );
}
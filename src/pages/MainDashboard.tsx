import React, { useState, useEffect } from 'react';
import './MainDashboard.css';

interface User {
  id: string;
  pw: string;
  nickname: string;
  createdAt: string;
}

interface Stock {
  id: string;
  name: string;
  code: string;
  price: number;
  change: number;
  changePercent: number;
}

interface StatCard {
  label: string;
  icon: string;
  value: string;
  change: string;
  isPositive: boolean;
}

interface MainDashboardProps {
  logoIcon?: string;
  appName?: string;
  onNavigate?: (page: string) => void;
}

const LogoMark: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="16" width="5" height="9" rx="1.5" fill="white" opacity="0.75"/>
    <rect x="11" y="10" width="5" height="15" rx="1.5" fill="white"/>
    <rect x="20" y="4" width="5" height="21" rx="1.5" fill="white" opacity="0.9"/>
    <polyline
      points="4.5,15 13.5,9 22.5,3"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="22.5" cy="3" r="2" fill="#63B3FF"/>
  </svg>
);

const NavIconHome: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#2196f3' : '#94a3b8'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>
);

const NavIconAI: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#2196f3' : '#94a3b8'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V4a1 1 0 0 1 1-1z"/>
    <path d="M18.364 5.636a1 1 0 0 1 0 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0z"/>
    <path d="M21 12a1 1 0 0 1-1 1h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1z"/>
    <path d="M17.657 17.657a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414z"/>
    <path d="M12 19a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1z"/>
    <path d="M6.343 17.657a1 1 0 0 1 0-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414 0z"/>
    <path d="M3 12a1 1 0 0 1 1-1h1a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1z"/>
    <path d="M5.636 5.636a1 1 0 0 1 1.414 0l.707.707A1 1 0 0 1 6.343 7.757l-.707-.707a1 1 0 0 1 0-1.414z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const NavIconBook: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#2196f3' : '#94a3b8'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <line x1="9" y1="7" x2="15" y2="7"/>
    <line x1="9" y1="11" x2="15" y2="11"/>
  </svg>
);

const NavIconChart: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#2196f3' : '#94a3b8'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="8" y1="17" x2="8" y2="9"/>
    <line x1="12" y1="17" x2="12" y2="13"/>
    <line x1="16" y1="17" x2="16" y2="7"/>
    <polyline points="5,12 8,9 12,13 16,7"/>
  </svg>
);

const MainDashboard: React.FC<MainDashboardProps> = ({
  appName = '돈스탁',
  onNavigate,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeNav, setActiveNav] = useState<string>('홈');

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('ds_users') || '[]');
    if (users.length > 0) {
      const lastUser = users[users.length - 1];
      setCurrentUser(lastUser);
    }
  }, []);

  const getUserInitial = (nickname: string): string => {
    return nickname.charAt(0).toUpperCase();
  };

  const statCards: StatCard[] = [
    {
      label: '보유 자산',
      icon: '💰',
      value: '₩1,250,000',
      change: '+2.35%',
      isPositive: true,
    },
    {
      label: '오늘의 수익률',
      icon: '📈',
      value: '+23,500',
      change: '+1.93%',
      isPositive: true,
    },
    {
      label: '관심 종목',
      icon: '⭐',
      value: '8',
      change: '삼성전자 +1.8%',
      isPositive: true,
    },
    {
      label: '이번 주 순위',
      icon: '🏆',
      value: '#24',
      change: '어제보다 ↓ 3위',
      isPositive: false,
    },
  ];

  const popularStocks: Stock[] = [
    {
      id: '1',
      name: '삼성전자',
      code: 'SAMSUNG',
      price: 70500,
      change: 1200,
      changePercent: 1.8,
    },
    {
      id: '2',
      name: '카카오',
      code: 'KAKAO',
      price: 92000,
      change: -400,
      changePercent: -0.4,
    },
    {
      id: '3',
      name: '현대차',
      code: 'HYUNDAI',
      price: 185300,
      change: 5600,
      changePercent: 3.1,
    },
  ];

  const watchlistItems = [
    { code: 'SK', price: 250000, changePercent: 2.1 },
    { code: 'LG', price: 78900, changePercent: -0.8 },
    { code: 'NAVER', price: 135000, changePercent: 1.5 },
    { code: 'COUPANG', price: 29350, changePercent: 0.9 },
  ];

  const navigationItems = [
    {
      name: '홈',
      icon: (active: boolean) => <NavIconHome active={active} />,
      action: () => {
        setActiveNav('홈');
        onNavigate?.('home');
      },
    },
    {
      name: 'AI 추천',
      icon: (active: boolean) => <NavIconAI active={active} />,
      action: () => {
        setActiveNav('AI 추천');
        onNavigate?.('ai-recommend');
      },
    },
    {
      name: '주식 설명',
      icon: (active: boolean) => <NavIconBook active={active} />,
      action: () => {
        setActiveNav('주식 설명');
        onNavigate?.('stock-guide');
      },
    },
    {
      name: '증권',
      icon: (active: boolean) => <NavIconChart active={active} />,
      action: () => {
        setActiveNav('증권');
        onNavigate?.('securities');
      },
    },
  ];

  return (
    <div className="main-dashboard">
      {/* 떠있는 주식 틱 */}
      <div className="floating-ticker ticker1">▲ SAMSUNG +1.8%</div>
      <div className="floating-ticker ticker2">▲ HYUNDAI +3.1%</div>
      <div className="floating-ticker ticker3">▼ NAVER -0.6%</div>
      <div className="floating-ticker ticker4">▲ SK +2.1%</div>

      <div className="dashboard-container">
        {/* 헤더 */}
        <header className="dashboard-header">
          <div className="header-left">
            <div className="logo-icon">
              <LogoMark />
            </div>
            <div className="logo-text">{appName}</div>
          </div>
          <div className="header-right">
            <div className="user-info">
              <div className="user-avatar">
                {currentUser ? getUserInitial(currentUser.nickname) : '사'}
              </div>
              <div className="user-name">
                {currentUser ? currentUser.nickname : '사용자'}
              </div>
            </div>
            <button className="header-btn">설정</button>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="dashboard-content">
          {/* 통계 카드 그리드 */}
          <div className="stats-grid">
            {statCards.map((card, index) => (
              <div key={index} className="stat-card">
                <div className="stat-label">
                  <span className="stat-icon">{card.icon}</span>
                  {card.label}
                </div>
                <div className="stat-value">{card.value}</div>
                <div className={`stat-change ${card.isPositive ? 'up' : 'down'}`}>
                  {card.isPositive ? '▲' : '▼'} <span>{card.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 인기 종목 */}
          <section className="stocks-section">
            <h2 className="section-title">🔥 인기 종목</h2>
            <div className="stocks-container">
              {popularStocks.map((stock) => (
                <div key={stock.id} className="stock-card">
                  <div className="stock-header">
                    <div>
                      <div className="stock-name">{stock.name}</div>
                      <div className="stock-code">{stock.code}</div>
                    </div>
                    <div
                      className={`stock-change-badge ${stock.change >= 0 ? 'up' : 'down'}`}
                    >
                      {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                    </div>
                  </div>
                  <div className="stock-price">
                    {stock.price.toLocaleString()}
                  </div>
                  <div
                    className={`stock-change-large ${stock.change >= 0 ? 'up' : 'down'}`}
                  >
                    {stock.change >= 0 ? '▲' : '▼'}{' '}
                    <span>{Math.abs(stock.change).toLocaleString()}원</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 관심 종목 */}
          <section className="watchlist">
            <div className="watchlist-title">
              <span>⭐</span>
              내 관심 종목
            </div>
            <div className="watchlist-items">
              {watchlistItems.map((item, index) => (
                <div key={index} className="watchlist-item">
                  <div className="watchlist-code">{item.code}</div>
                  <div className="watchlist-price">
                    {item.price.toLocaleString()}
                  </div>
                  <div
                    className={`watchlist-change ${item.changePercent >= 0 ? 'up' : 'down'}`}
                  >
                    {item.changePercent >= 0 ? '▲' : '▼'}{' '}
                    {Math.abs(item.changePercent)}%
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* 하단 네비게이션 */}
      <nav className="bottom-nav">
        {navigationItems.map((item) => (
          <button
            key={item.name}
            className={`nav-btn ${activeNav === item.name ? 'active' : ''}`}
            onClick={item.action}
          >
            <span className="nav-icon">{item.icon(activeNav === item.name)}</span>
            <span className="nav-label">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default MainDashboard;
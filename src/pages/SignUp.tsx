import { useState, useCallback } from "react";
import "./SignUp.css";

// ───────────────── 유효성 검사 ─────────────────

function validateId(val: string): string {
  if (!val) return "";
  if (/\s/.test(val)) return "아이디에 공백을 포함할 수 없어요.";
  if (val.length < 2) return "아이디는 2자리 이상이어야 해요.";
  if (val.length > 12) return "아이디는 12자리 이하여야 해요.";
  if (!/^[a-zA-Z0-9]+$/.test(val))
    return "영문과 숫자만 사용할 수 있어요.";

  return "ok";
}

function validatePw(val: string): string {
  if (!val) return "";

  if (/\s/.test(val))
    return "비밀번호에 공백을 포함할 수 없어요.";

  if (val.length < 8)
    return "비밀번호는 8자리 이상이어야 해요.";

  if (!/[a-zA-Z]/.test(val))
    return "영문자를 포함해야 해요.";

  if (!/[0-9]/.test(val))
    return "숫자를 포함해야 해요.";

  return "ok";
}

function validatePwConfirm(
  pw: string,
  confirm: string
): string {
  if (!confirm) return "";

  if (pw !== confirm)
    return "비밀번호가 일치하지 않아요.";

  return "ok";
}

function validateNickname(val: string): string {
  if (!val) return "";

  if (/\s/.test(val))
    return "닉네임에 공백을 포함할 수 없어요.";

  if (val.length < 2)
    return "닉네임은 2자리 이상이어야 해요.";

  if (val.length > 10)
    return "닉네임은 10자리 이하여야 해요.";

  return "ok";
}

// ───────────────── Field ─────────────────

interface FieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  hint: string;
  status: string;
  showToggle?: boolean;
  show?: boolean;
  onToggle?: () => void;
  maxLength?: number;
}

function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  hint,
  status,
  showToggle,
  show,
  onToggle,
  maxLength,
}: FieldProps) {
  const isError =
    status !== "" && status !== "ok";

  const isOk = status === "ok";

  return (
    <div className="field-wrap">

      <label
        htmlFor={id}
        className="field-label"
      >
        {label}
      </label>

      <div className="field-row">

        <input
          id={id}
          className={`field-input ${
            isError
              ? "error"
              : isOk
              ? "ok"
              : ""
          }`}
          type={
            showToggle
              ? show
                ? "text"
                : "password"
              : type
          }
          value={value}
          maxLength={maxLength}
          autoComplete="off"
          placeholder={placeholder}
          onChange={(e) =>
            onChange(
              e.target.value.replace(/\s/g, "")
            )
          }
        />

        {showToggle && (
          <button
            type="button"
            className="toggle-btn"
            onClick={onToggle}
          >
            {show ? "🙈" : "👁️"}
          </button>
        )}

        {isOk && (
          <span className="field-check">
            ✓
          </span>
        )}

      </div>

      {isError ? (
        <p className="field-error">
          ⚠ {status}
        </p>
      ) : (
        <p className="field-hint">
          {hint}
        </p>
      )}

    </div>
  );
}

// ───────────────── StrengthBar ─────────────────

function StrengthBar({
  password,
}: {
  password: string;
}) {
  if (!password) return null;

  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  const labels = [
    "",
    "매우 약함",
    "약함",
    "보통",
    "강함",
    "매우 강함",
  ];

  const colors = [
    "",
    "#ef4444",
    "#f97316",
    "#eab308",
    "#3b82f6",
    "#22c55e",
  ];
    return (
    <div className="strength-wrap">

      <div className="strength-bars">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="strength-bar"
            style={{
              background:
                i <= score
                  ? colors[score]
                  : "#e2e8f0",
            }}
          />
        ))}
      </div>

      <p
        className="strength-text"
        style={{
          color: colors[score],
        }}
      >
        비밀번호 강도 : {labels[score]}
      </p>

    </div>
  );
}

// ───────────────── SignUp ─────────────────

export default function SignUp() {

  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");

  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");

  const [showPw, setShowPw] = useState(false);
  const [showPwC, setShowPwC] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);

  const idStatus = validateId(id);
  const pwStatus = validatePw(pw);
  const pwCStatus = validatePwConfirm(
    pw,
    pwConfirm
  );
  const nickStatus = validateNickname(
    nickname
  );

  const allOk =
    idStatus === "ok" &&
    pwStatus === "ok" &&
    pwCStatus === "ok" &&
    nickStatus === "ok";

  const handleSubmit = useCallback(() => {

    setSubmitted(true);

    if (!allOk) return;

    const users = JSON.parse(
      localStorage.getItem("ds_users") || "[]"
    );

    const exists = users.find(
      (u: { id: string }) => u.id === id
    );

    if (exists) {
      alert("이미 사용 중인 아이디예요.");
      return;
    }

    users.push({
      id,
      pw,
      nickname,
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem(
      "ds_users",
      JSON.stringify(users)
    );

    setDone(true);

  }, [allOk, id, pw, nickname]);

  // ───────── 가입 완료 화면 ─────────

  if (done) {

    return (
      <div className="done-page">

        <div className="done-card">

          <div className="done-icon">
            📈
          </div>

          <h2 className="done-title">
            가입 완료!
          </h2>

          <p className="done-name">
            <strong>{nickname}</strong>님,
            환영해요!
          </p>

          <p className="done-sub">
            돈스탁과 함께
            모의 투자 실력을 키워보세요 💰
          </p>

          <button
            className="done-button"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            로그인하러 가기
          </button>

        </div>

      </div>
    );
  }

  // ───────── 회원가입 화면 ─────────

  return (
        <div className="signup-page">

      {/* 배경 원 */}
      <div className="bg-circle bg-circle1"></div>
      <div className="bg-circle bg-circle2"></div>

      {/* 떠다니는 주식 */}
      <div className="floating-stock stock1">
        ▲ SAMSUNG +2.4%
      </div>

      <div className="floating-stock stock2">
        ▲ KAKAO +1.8%
      </div>

      <div className="floating-stock stock3">
        ▼ NAVER -0.6%
      </div>

      <div className="floating-stock stock4">
        ▲ HYUNDAI +3.1%
      </div>

      <div className="signup-container">

        {/* 로고 */}
        <div className="logo-area">

          <div className="logo-badge">

            <img
              src="/logo.png"
              alt="돈스탁"
              className="logo-image"
            />

            <span className="logo-text">
              돈스탁
            </span>

          </div>

        </div>

        {/* 회원가입 카드 */}
        <div className="signup-card">

          <h1 className="card-title">
            회원가입
          </h1>

          <p className="card-sub">
            계정을 만들고 가상 투자를 시작해보세요.
          </p>

          <Field
            label="아이디"
            id="signup-id"
            value={id}
            onChange={setId}
            placeholder="영문 + 숫자, 2~12자리"
            hint="영문과 숫자만 사용 가능 · 2~12자리"
            status={
              submitted && !id
                ? "아이디를 입력해주세요."
                : idStatus
            }
            maxLength={12}
          />

          <Field
            label="닉네임"
            id="signup-nickname"
            value={nickname}
            onChange={setNickname}
            placeholder="2~10자리"
            hint="앱에서 보이는 이름이에요 · 2~10자리"
            status={
              submitted && !nickname
                ? "닉네임을 입력해주세요."
                : nickStatus
            }
            maxLength={10}
          />

          <Field
            label="비밀번호"
            id="signup-pw"
            value={pw}
            onChange={setPw}
            placeholder="영문 + 숫자 포함 8자리 이상"
            hint="공백 없이 · 영문 + 숫자 필수 · 8자리 이상"
            status={
              submitted && !pw
                ? "비밀번호를 입력해주세요."
                : pwStatus
            }
            showToggle
            show={showPw}
            onToggle={() =>
              setShowPw(!showPw)
            }
          />

          <StrengthBar password={pw} />

          <Field
            label="비밀번호 확인"
            id="signup-confirm"
            value={pwConfirm}
            onChange={setPwConfirm}
            placeholder="비밀번호를 한 번 더 입력하세요"
            hint="위에 입력한 비밀번호와 동일하게 입력하세요"
            status={
              submitted && !pwConfirm
                ? "비밀번호 확인을 입력해주세요."
                : pwCStatus
            }
            showToggle
            show={showPwC}
            onToggle={() =>
              setShowPwC(!showPwC)
            }
          />

          <button
            className={`signup-button ${
              allOk
                ? "active"
                : "inactive"
            }`}
            onClick={handleSubmit}
          >
            가입하기
          </button>

          <p className="login-link">
            이미 계정이 있으신가요?{" "}
            <a href="/">
              로그인
            </a>
          </p>

        </div>

        {/* 하단 정보 */}
        <div className="rule-grid">

          <div className="rule-item">
            <span>📊</span>
            <span>모의 주식으로 실전 연습</span>
          </div>

          <div className="rule-item">
            <span>💰</span>
            <span>가상 자산으로 부담 없이 투자</span>
          </div>

          <div className="rule-item">
            <span>📈</span>
            <span>포트폴리오 직접 관리</span>
          </div>

          <div className="rule-item">
            <span>🏆</span>
            <span>친구와 수익률 경쟁</span>
          </div>

        </div>

      </div>

    </div>
  );
}
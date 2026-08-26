"use client";

export function TopNav() {
  return (
    <nav
      style={{
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #e8e4df",
        height: "56px",
      }}
      className="sticky top-0 z-50 flex items-center px-6"
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Go back"
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            border: "1px solid #e2ddd8",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="#6b6560"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex items-center gap-1.5">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="2"
              width="14"
              height="12"
              rx="1.5"
              stroke="#8a8480"
              strokeWidth="1.25"
            />
            <path
              d="M1 5H15"
              stroke="#8a8480"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
            <path
              d="M5 5V14"
              stroke="#8a8480"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "#4a4540",
              letterSpacing: "-0.01em",
            }}
          >
            Exams
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="ml-auto flex items-center gap-2">
        {/* Help */}
        <button
          type="button"
          aria-label="Help"
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            border: "1px solid #e2ddd8",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="7.5" cy="7.5" r="6.5" stroke="#8a8480" strokeWidth="1.25" />
            <path
              d="M5.8 5.6C6 4.7 6.7 4.1 7.6 4.1c1 0 1.8.8 1.8 1.7 0 .9-.6 1.4-1.2 1.8C7.7 8 7.5 8.3 7.5 8.7"
              stroke="#8a8480"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
            <circle cx="7.5" cy="11" r="0.7" fill="#8a8480" />
          </svg>
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            border: "1px solid #e2ddd8",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 1.5C5 1.5 3 3.5 3 6v3l-1 1.5h11L12 9V6c0-2.5-2-4.5-4.5-4.5Z"
              stroke="#8a8480"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.5 12.5c0 .6.4 1 1 1s1-.4 1-1"
              stroke="#8a8480"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              position: "absolute",
              top: 4,
              right: 4,
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#e8521a",
              border: "1.5px solid #fff",
            }}
          />
        </button>

        {/* Add */}
        <button
          type="button"
          aria-label="Add"
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            border: "1px solid #e2ddd8",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 2V12M2 7H12"
              stroke="#8a8480"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* User avatar */}
        <button
          type="button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "4px 10px 4px 4px",
            borderRadius: 20,
            border: "1px solid #e2ddd8",
            background: "#fff",
            cursor: "pointer",
            marginLeft: 4,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #e8521a, #ff9a6c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            MR
          </div>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#2a2520" }}>
            Madhur Rastogi
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="#8a8480"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}

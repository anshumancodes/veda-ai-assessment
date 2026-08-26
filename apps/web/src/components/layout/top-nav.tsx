"use client";

import Image from "next/image";

export function TopNav() {
  return (
    <nav
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid #e8e4df",
        height: "56px",
      }}
      className="sticky top-0 z-50 flex items-center px-4"
    >
      {/* Left , Logo + breadcrumb */}
      <div className="flex items-center gap-2">
        {/* Back button */}
        <button
          type="button"
          aria-label="Go back"
          style={{
            width: 30,
            height: 30,
            borderRadius: 7,
            border: "1px solid #e2ddd8",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.15s",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="#6b6560" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 20, background: "#e2ddd8", margin: "0 4px" }} />

        {/* Brand logo */}
        <div className="flex items-center gap-2">
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "linear-gradient(135deg, #fff0eb 0%, #ffe0d0 100%)",
              border: "1px solid rgba(232, 82, 26, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Image
              src="/orange_star.png"
              alt="Veda AI"
              width={18}
              height={18}
              style={{ objectFit: "contain" }}
            />
          </div>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
            }}
          >
            veda
          </span>
        </div>

        {/* Breadcrumb separator */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "#c4bfba", margin: "0 2px" }}>
          <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Exams breadcrumb */}
        <div className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="2" width="14" height="12" rx="1.5" stroke="#8a8480" strokeWidth="1.25" />
            <path d="M1 5H15" stroke="#8a8480" strokeWidth="1.25" strokeLinecap="round" />
            <path d="M5 5V14" stroke="#8a8480" strokeWidth="1.25" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#4a4540", letterSpacing: "-0.01em" }}>
            Exams
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="ml-auto flex items-center gap-1.5">
        {/* Help */}
        <button
          type="button"
          aria-label="Help"
          style={{
            width: 30,
            height: 30,
            borderRadius: 7,
            border: "1px solid #e2ddd8",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="7.5" cy="7.5" r="6.5" stroke="#8a8480" strokeWidth="1.25" />
            <path d="M5.8 5.6C6 4.7 6.7 4.1 7.6 4.1c1 0 1.8.8 1.8 1.7 0 .9-.6 1.4-1.2 1.8C7.7 8 7.5 8.3 7.5 8.7" stroke="#8a8480" strokeWidth="1.25" strokeLinecap="round" />
            <circle cx="7.5" cy="11" r="0.7" fill="#8a8480" />
          </svg>
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          style={{
            width: 30,
            height: 30,
            borderRadius: 7,
            border: "1px solid #e2ddd8",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            transition: "background 0.15s",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 1.5C5 1.5 3 3.5 3 6v3l-1 1.5h11L12 9V6c0-2.5-2-4.5-4.5-4.5Z" stroke="#8a8480" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.5 12.5c0 .6.4 1 1 1s1-.4 1-1" stroke="#8a8480" strokeWidth="1.25" strokeLinecap="round" />
          </svg>
          <span
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              width: 6,
              height: 6,
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
            width: 30,
            height: 30,
            borderRadius: 7,
            border: "1px solid #e2ddd8",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 2V12M2 7H12" stroke="#8a8480" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 20, background: "#e2ddd8", margin: "0 4px" }} />

        {/* User avatar */}
        <button
          type="button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "3px 10px 3px 3px",
            borderRadius: 20,
            border: "1px solid #e2ddd8",
            background: "#fff",
            cursor: "pointer",
            transition: "border-color 0.15s, box-shadow 0.15s",
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #e8521a, #ff9a6c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 9,
              fontWeight: 700,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            MR
          </div>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#2a2520" }}>
            Madhur Rastogi
          </span>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="#8a8480" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

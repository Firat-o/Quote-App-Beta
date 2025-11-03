import React from "react";

const Flame = ({ size = 260, playing = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 512 512"
    role="img"
    aria-label="Ambient flame"
    className={`flame ${playing ? "is-on" : ""}`}
  >
    <defs>
      <linearGradient id="f1" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#38bdf8" />
      </linearGradient>
      <linearGradient id="f2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
    </defs>

    {/* outer flame */}
    <path
      d="M256 24c40 70 59 133 15 180 54-12 92-49 108-99 40 61 52 120 43 179-12 83-73 176-166 196-116 24-196-56-194-160 1-61 29-116 81-154-7 59 25 91 70 108-17-77 43-131 43-250z"
      fill="url(#f1)"
    />
    {/* inner flame */}
    <path
      d="M308 180c30 66-12 102-60 119 28-44 6-78-18-100-62 56-84 169 26 204 98-16 126-126 52-223z"
      fill="url(#f2)"
      opacity=".95"
    />
    {/* spark */}
    <path
      d="M248 292c22 0 38 16 38 36s-16 36-38 36-38-16-38-36c0-40 26-68 72-82-22 13-34 30-34 46z"
      fill="#ff7043"
      opacity=".95"
    />
  </svg>
);

export default Flame;

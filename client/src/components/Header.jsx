import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">Learnato Forum</h1>
        <span className="badge">Microservice • Realtime</span>
      </div>
    </header>
  );
}

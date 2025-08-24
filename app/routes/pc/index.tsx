import React, { useEffect } from "react";

export default function PCLayout() {
  useEffect(() => {
    document.body.style.backgroundColor = "white";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center max-w-[720px] mx-auto">
      {/* 좌측 로고 영역 */}
      <div className="flex-1 flex flex-col justify-start items-start gap-3">
        <img
          src="/logo.png"
          alt="KaiaPay Logo"
          className="w-32 h-auto object-contain cursor-pointer transition-opacity"
        />
        <p className="text-[18px] font-bold font-kakao-big-sans text-black">
          링크 하나로 주고받는
          <br />
          USDT와 KRW
        </p>
      </div>

      {/* 중앙 모바일 컨테이너 */}
      <div
        className="w-[390px] h-[760px] bg-white rounded-xl overflow-hidden relative mx-8"
        style={{ boxShadow: "0 8px 40px 0 rgba(0,0,0,0.35)" }}
      >
        <iframe
          src="/"
          className="w-full h-full border-0"
          title="KaiaPay Mobile App"
        />
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderWithBackButton from "~/components/HeaderWithBackButton";
import KakaoIcon from "~/components/icons/KakaoIcon";
import EmailIcon from "~/components/icons/EmailIcon";
import LineIcon from "~/components/icons/LineIcon";
import GoogleIcon from "~/components/icons/GoogleIcon";
import UserIcon from "~/components/icons/UserIcon";
import ChevronRightIcon from "~/components/icons/chevron-right";

type AccountType = "kakao" | "email" | "line" | "google";

interface AccountInfo {
  type: AccountType;
  name: string;
  email?: string;
  connected: boolean;
}

export default function AccountPage() {
  const navigate = useNavigate();

  // 계정 정보 상태 관리 (API 연동 시 쉽게 확장 가능)
  const [accounts, setAccounts] = useState<AccountInfo[]>([
    {
      type: "kakao",
      name: "카카오 계정",
      email: "kaiapay@kakao.com",
      connected: true,
    },
    {
      type: "email",
      name: "이메일",
      email: "kaiapay@kakao.com",
      connected: true,
    },
    {
      type: "line",
      name: "LINE 계정",
      email: undefined,
      connected: false,
    },
    {
      type: "google",
      name: "Google 계정",
      email: undefined,
      connected: false,
    },
  ]);

  const handleAccountConnect = (accountType: AccountType) => {
    console.log(accountType);
  };

  // 아이콘 렌더링 함수
  const renderAccountIcon = (type: AccountType) => {
    switch (type) {
      case "kakao":
        return <KakaoIcon size={20} className="text-white" />;
      case "email":
        return <EmailIcon size={16} className="text-white" />;
      case "line":
        return <LineIcon size={18} className="text-white" />;
      case "google":
        return <GoogleIcon size={18} className="text-white" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#040404] flex flex-col">
      {/* 헤더 */}
      <HeaderWithBackButton heading="계정" />

      {/* 메인 콘텐츠 */}
      <div className="flex-1 px-4 pb-6 pt-[20px]">
        <div className="space-y-3">
          {/* 로그인 정보 섹션 */}
          <div className="bg-white/10 backdrop-blur-[14px] rounded-2xl p-4">
            <h2 className="text-white/50 text-[14px] font-medium mb-4">
              로그인 정보
            </h2>

            <div className="space-y-3">
              {accounts.map((account) => (
                <div
                  key={account.type}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-5 h-10 flex items-center justify-center">
                      {renderAccountIcon(account.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-[16px] font-medium">
                        {account.name}
                      </p>
                      {account.email && (
                        <p className="text-white/50 text-[14px]">
                          {account.email}
                        </p>
                      )}
                    </div>
                  </div>
                  {!account.connected && (
                    <button
                      onClick={() => handleAccountConnect(account.type)}
                      className="bg-white/20 backdrop-blur-[14px] rounded-full px-4 py-2 hover:bg-white/30 transition-colors"
                    >
                      <span className="text-white/90 text-[14px] font-medium">
                        연동
                      </span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 계정 정보 섹션 */}
          <div className="bg-white/10 backdrop-blur-[14px] rounded-2xl p-4">
            <div className="space-y-3">
              {/* KaiaPay 아이디 */}
              <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={() =>
                  navigate("/account/change-id")
                }
              >
                <div className="w-5 h-10 flex items-center justify-center">
                  <UserIcon size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-[16px] font-medium">
                    KaiaPay 아이디
                  </p>
                  <p className="text-white/50 text-[14px]">@KaiaPay공식계정</p>
                </div>
                <div className="w-5 h-10 flex items-center justify-center">
                  <ChevronRightIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

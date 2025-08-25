import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import HeaderWithBackButton from "~/components/HeaderWithBackButton";
import EmailIcon from "~/components/icons/EmailIcon";
import LineIcon from "~/components/icons/LineIcon";
import GoogleIcon from "~/components/icons/GoogleIcon";
import UserIcon from "~/components/icons/UserIcon";
import ChevronRightIcon from "~/components/icons/chevron-right";
import { useUser } from "~/stores/userStore";
import { useCustomPrivy } from "~/hooks/use-custom-privy";
import { useLinkAccount } from "@privy-io/react-auth";

type AccountType = "email" | "google_oauth" | "line_oauth";

interface AccountInfo {
  type: AccountType;
  name: string;
  email?: string;
  connected: boolean;
}

export default function AccountPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { user: privyUser } = useCustomPrivy();

  const accounts = useMemo<AccountInfo[]>(() => {
    const linkedAccounts = privyUser?.linkedAccounts || [];
    
    return [
      {
        type: "email" as const,
        name: "이메일",
        email: linkedAccounts.find(acc => acc.type === "email")?.address,
        connected: linkedAccounts.some(acc => acc.type === "email"),
      },
      {
        type: "google_oauth" as const,
        name: "Google 계정",
        email: linkedAccounts.find(acc => acc.type === "google_oauth")?.email,
        connected: linkedAccounts.some(acc => acc.type === "google_oauth"),
      },
      {
        type: "line_oauth" as const,
        name: "LINE 계정",
        email: linkedAccounts.find(acc => acc.type === "line_oauth")?.name || linkedAccounts.find(acc => acc.type === "line_oauth")?.email,
        connected: linkedAccounts.some(acc => acc.type === "line_oauth"),
      },
    ];
  }, [privyUser?.linkedAccounts]);

  const { linkEmail, linkGoogle, linkLine } = useLinkAccount();

  const handleAccountConnect = async (accountType: AccountType) => {
    try {
      switch (accountType) {
        case "email":
          linkEmail();
          break;
        case "google_oauth":
          linkGoogle();
          break;
        case "line_oauth":
          linkLine();
          break;
        default:
          console.log(`지원되지 않는 계정 타입: ${accountType}`);
      }
      console.log(`${accountType} 계정 연동 시도`);
    } catch (error) {
      console.error("계정 연동 실패:", error);
    }
  };

  // 아이콘 렌더링 함수
  const renderAccountIcon = (type: AccountType) => {
    switch (type) {
      case "email":
        return <EmailIcon size={16} className="text-white" />;
      case "google_oauth":
        return <GoogleIcon size={18} className="text-white" />;
      case "line_oauth":
        return <LineIcon size={18} className="text-white" />;
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
                  <p className="text-white/50 text-[14px]">@{user?.kaiapayId}</p>
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

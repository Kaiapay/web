import HeaderWithBackButton from "../../components/HeaderWithBackButton";
import ContentCard from "../../components/ContentCard";
import Button from "../../components/Button";
import IconButton from "../../components/IconButton";

export default function WalletConnect() {
  const handleDownloadClick = () => {
    // 다운로드 페이지로 이동 로직
  };

  const handleLearnMoreClick = () => {
    // 지갑 생성 방법 알아보기 로직
  };

  const handleConnectClick = () => {
    // 연동하기 로직
  };

  return (
    <div className="min-h-screen bg-[#040404] flex flex-col">
      {/* 헤더 */}
      <HeaderWithBackButton heading="지갑 연동하기" />

      {/* 콘텐츠 */}
      <div className="flex-1 flex flex-col px-[16px] pt-[24px] pb-[12px] gap-[12px]">
        {/* 지갑 준비하기 섹션 */}
        <ContentCard backgroundColor="bg-white/10">
          <div className="flex flex-col gap-[16px]">
            <h3 className="text-white/50 text-[14px] font-medium font-pretendard leading-[1.571em] tracking-[-0.714%]">
              지갑 준비하기
            </h3>

            <div className="flex flex-col gap-[20px]">
              {/* 앱 다운로드 */}
              <div className="flex gap-[12px]">
                <IconButton
                  iconSrc="/icons/arrow-circle-broken-down.svg"
                  size={40}
                />
                <div className="flex flex-col gap-[16px] flex-1 items-start">
                  <div className="flex flex-col gap-[4px]">
                    <h4 className="text-white text-[16px] font-normal font-pretendard leading-[1.375em] tracking-[-0.625%]">
                      Kaia Wallet 앱 다운로드
                    </h4>
                    <p className="text-white/50 text-[14px] font-normal font-pretendard leading-[1.286em] tracking-[-0.714%]">
                      구글 플레이스토어 또는 앱스토어에서 무료로 다운로드하세요.
                      설치 후 실행하면 지갑을 생성하거나 불러올 수 있습니다.
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadClick}
                    className="text-[#BFF009]/80 text-[14px] font-medium font-pretendard leading-[1.571em] tracking-[-0.714%] hover:opacity-80 transition-opacity"
                  >
                    다운로드 페이지로 이동
                  </button>
                </div>
              </div>

              {/* 지갑 생성 */}
              <div className="flex gap-[12px]">
                <IconButton iconSrc="/icons/wallet2.svg" size={40} />
                <div className="flex flex-col gap-[16px] flex-1 items-start">
                  <div className="flex flex-col gap-[4px]">
                    <h4 className="text-white text-[16px] font-normal font-pretendard leading-[1.375em] tracking-[-0.625%]">
                      지갑 생성
                    </h4>
                    <p className="text-white/50 text-[14px] font-normal font-pretendard leading-[1.286em] tracking-[-0.714%]">
                      앱 설치 후 처음 이용자는 새 지갑 만들기를 선택하세요. 이미
                      다른 지갑이 있다면 가져오기로 연결할 수 있습니다.
                    </p>
                  </div>
                  <button
                    onClick={handleLearnMoreClick}
                    className="text-[#BFF009]/80 text-[14px] font-medium font-pretendard leading-[1.571em] tracking-[-0.714%] hover:opacity-80 transition-opacity"
                  >
                    지갑 생성 방법 알아보기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ContentCard>

        {/* Kaia Pay와 지갑 연동 섹션 */}
        <ContentCard backgroundColor="bg-white/10">
          <div className="flex flex-col gap-[16px]">
            <h3 className="text-white/50 text-[14px] font-medium font-pretendard leading-[1.571em] tracking-[-0.714%]">
              Kaia Pay와 지갑 연동
            </h3>

            <div className="flex gap-[12px]">
              <IconButton iconSrc="/icons/check-circle-broken.svg" size={40} />
              <div className="flex flex-col gap-[4px] flex-1 items-start">
                <h4 className="text-white text-[16px] font-normal font-pretendard leading-[1.375em] tracking-[-0.625%]">
                  서명
                </h4>
                <p className="text-white/50 text-[14px] font-normal font-pretendard leading-[1.286em] tracking-[-0.714%]">
                  아래 '연동하기' 버튼을 눌러주세요. Kaia Wallet 앱이 열리며
                  서명 요청이 표시됩니다. 서명을 완료하면 KaiaPay와 지갑이
                  안전하게 연결됩니다.
                </p>
              </div>
            </div>
          </div>
        </ContentCard>
      </div>

      {/* 하단 버튼 */}
      <div className="px-[16px] pb-[24px] pt-[4px]">
        <Button
          onClick={handleConnectClick}
          backgroundColor="bg-white"
          textColor="text-black"
          className="h-[52px] rounded-full"
        >
          연동하기
        </Button>
      </div>
    </div>
  );
}

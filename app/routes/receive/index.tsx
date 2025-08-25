import { useState } from "react";
import BottomSheet from "~/components/BottomSheet";
import ChevronRightIcon from "~/components/icons/chevron-right";
import ExclamationIcon from "~/components/icons/ExclamationIcon";
import ContentCard from "../../components/ContentCard";
import HeaderWithBackButton from "../../components/HeaderWithBackButton";
import IconButton from "../../components/IconButton";
import { useUser } from "~/stores/userStore";

export default function Receive() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { user } = useUser();

  const handleErrorSheetClose = () => {
    setIsBottomSheetOpen(false);
  };

  const handleErrorSheetButtonClick = () => {
    setIsBottomSheetOpen(false);
  };

  const handleCopyClick = () => {
    // TODO
  };

  return (
    <div className="min-h-screen bg-[#040404] flex flex-col">
      {/* 헤더 */}
      <HeaderWithBackButton heading="돈 받기" />

      {/* 콘텐츠 */}
      <div className="flex-1 flex flex-col px-[16px] pt-[24px] pb-[12px] gap-[12px]">
        {/* 지갑 준비하기 섹션 */}
        <ContentCard backgroundColor="bg-white/10">
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[20px]">
              {/* 앱 다운로드 */}
              <div className="flex gap-[12px]">
                <IconButton
                  iconSrc="/icons/arrow-circle-broken-down.svg"
                  size={40}
                />
                <div className="flex flex-col gap-[16px] flex-1 items-start ">
                  <div className="flex flex-col gap-[4px]">
                    <h4 className="text-white text-[16px] font-normal font-pretendard leading-[1.375em] tracking-[-0.625%]">
                      KaiaPay 아이디로 받기
                    </h4>
                    <p className="text-white/50 text-[14px] font-normal font-pretendard leading-[1.286em] tracking-[-0.714%]">
                      내 KaiaPay 아이디로 송금받을 수 있어요. 상대방에게 내
                      아이디를 알려주세요.
                    </p>
                  </div>
                  <div className="flex gap-[12px] justify-between w-full">
                    <div className="flex flex-col gap-[4px]">
                      <h4 className="text-white text-[14px] font-normal font-pretendard leading-[1.571em] tracking-[-0.714%]">
                        내 KaiaPay 아이디
                      </h4>
                    </div>
                    <button
                      onClick={handleCopyClick}
                      className="text-[#BFF009]/80 text-[14px] font-medium font-pretendard leading-[1.571em] tracking-[-0.714%] hover:opacity-80 transition-opacity"
                    >
                      @{user?.kaiapayId}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContentCard>

        {/* Kaia Pay와 지갑 연동 섹션 */}

        <ContentCard
          backgroundColor="bg-white/10"
          onClick={() => {
            setIsBottomSheetOpen(true);
          }}
        >
          <div className="flex flex-col gap-[16px]">
            {/* <h3 className="text-white/50 text-[14px] font-medium font-pretendard leading-[1.571em] tracking-[-0.714%]">
              Kaia Pay와 지갑 연동
            </h3> */}

            <div className="flex gap-[12px]">
              <IconButton iconSrc="/icons/check-circle-broken.svg" size={40} />
              <div className="flex flex-col gap-[4px] flex-1 items-start">
                <h4 className="text-white text-[16px] font-normal font-pretendard leading-[1.375em] tracking-[-0.625%]">
                  결제 페이지 만들기
                </h4>
                <p className="text-left text-white/50 text-[14px] font-normal font-pretendard leading-[1.286em] tracking-[-0.714%]">
                  받을 금액을 미리 정해요. 상대방이 링크를 확인 후 지정한 금액을
                  송금합니다.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <ChevronRightIcon />
              </div>
            </div>
          </div>
        </ContentCard>
      </div>

      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleErrorSheetClose}
        icon={<ExclamationIcon />}
        title={"준비중인 기능입니다"}
        buttonText="확인"
        onButtonClick={handleErrorSheetButtonClick}
      >
        곧 결제 페이지를 비롯한 다양한 기능이
        <br />
        업데이트를 통해 제공될 예정입니다
      </BottomSheet>
    </div>
  );
}

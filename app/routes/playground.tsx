import { useState } from "react";
import Button from "../components/Button";
import BottomSheet from "../components/BottomSheet";
import Alert from "../components/Alert";
import DownloadIcon from "../components/icons/DownloadIcon";

export default function Playground() {
  const [isBasicSheetOpen, setIsBasicSheetOpen] = useState(false);
  const [isSuccessSheetOpen, setIsSuccessSheetOpen] = useState(false);
  const [isErrorSheetOpen, setIsErrorSheetOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleBasicSheetClose = () => {
    setIsBasicSheetOpen(false);
  };

  const handleSuccessSheetClose = () => {
    setIsSuccessSheetOpen(false);
  };

  const handleErrorSheetClose = () => {
    setIsErrorSheetOpen(false);
  };

  const handleBasicSheetButtonClick = () => {
    setIsBasicSheetOpen(false);
  };

  const handleSuccessSheetButtonClick = () => {
    setIsSuccessSheetOpen(false);
  };

  const handleErrorSheetButtonClick = () => {
    setIsErrorSheetOpen(false);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleAlertButtonClick = () => {
    setIsAlertOpen(false);
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          컴포넌트 플레이그라운드
        </h1>

        <div className="space-y-8">
          {/* 버튼 섹션 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Button</h2>
            <div className="space-y-4">
              <Button>Primary 버튼</Button>

              <Button backgroundColor="bg-secondary" textColor="text-primary">
                Secondary 버튼
              </Button>

              <Button disabled={true}>Primary 버튼 disabled</Button>
            </div>
          </section>

          {/* BottomSheet 섹션 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              BottomSheet
            </h2>
            <div className="space-y-4">
              <Button
                backgroundColor="bg-secondary"
                textColor="text-primary"
                onClick={() => {
                  setIsBasicSheetOpen(true);
                }}
              >
                기본 BottomSheet
              </Button>

              <Button
                backgroundColor="bg-secondary"
                textColor="text-primary"
                onClick={() => {
                  setIsSuccessSheetOpen(true);
                }}
              >
                아이콘 포함 BottomSheet
              </Button>

              <Button
                backgroundColor="bg-secondary"
                textColor="text-primary"
                onClick={() => {
                  setIsErrorSheetOpen(true);
                }}
              >
                아이콘 포함 BottomSheet2
              </Button>
            </div>
          </section>

          {/* Alert 섹션 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Alert</h2>
            <div className="space-y-4">
              <Button
                backgroundColor="bg-secondary"
                textColor="text-primary"
                onClick={() => {
                  setIsAlertOpen(true);
                }}
              >
                송금 알림 Alert
              </Button>
            </div>
          </section>
        </div>

        {/* BottomSheet */}
        <BottomSheet
          isOpen={isBasicSheetOpen}
          onClose={handleBasicSheetClose}
          title="준비중인 기능입니다"
          buttonText="확인"
          onButtonClick={handleBasicSheetButtonClick}
        >
          곧 검색을 비롯한 다양한 기능이
          <br />
          업데이트를 통해 제공될 예정입니다.
        </BottomSheet>

        <BottomSheet
          isOpen={isSuccessSheetOpen}
          onClose={handleSuccessSheetClose}
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12L10 18L20 6"
                stroke="#BFF009"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          title={
            <>
              KP PRO 결제 페이지가
              <br />
              생성되었어요
            </>
          }
          buttonText="확인"
          onButtonClick={handleSuccessSheetButtonClick}
        >
          <a
            href="https://kaiapay.link/.../8pL1aB9xQm7Ez5N"
            className="text-[#BFF009] underline"
          >
            kaiapay.link/.../8pL1aB9xQm7Ez5N
          </a>
        </BottomSheet>

        <BottomSheet
          isOpen={isErrorSheetOpen}
          onClose={handleErrorSheetClose}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#FF6B6B" strokeWidth="2" />
              <path
                d="M15 9L9 15M9 9L15 15"
                stroke="#FF6B6B"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          }
          title="이자를 받을 수 없어요"
          buttonText="확인"
          onButtonClick={handleErrorSheetButtonClick}
        >
          받을 이자가 없어요.
          <br />
          현재 이율 약 1.02%
        </BottomSheet>

        {/* Alert 컴포넌트 */}
        <Alert
          isOpen={isAlertOpen}
          onClose={handleAlertClose}
          icon={<DownloadIcon />}
          title="10.50 USDT"
          buttonText="받기"
          onButtonClick={handleAlertButtonClick}
        >
          @김카이아님이 보냈어요 <br />아래 '받기' 버튼을 눌러야 송금이 완료돼요
        </Alert>
      </div>
    </div>
  );
}

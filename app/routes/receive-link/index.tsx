import { useEffect, useState } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import bs58 from "bs58";
import Alert from "~/components/Alert";
import BottomSheet from "~/components/BottomSheet";
import CheckIcon from "~/components/icons/CheckIcon";
import CloseXIcon from "~/components/icons/CloseXIcon";
import DownloadIcon from "~/components/icons/DownloadIcon";
import useWindowSize from "~/hooks/use-window-size";
import { privateKeyToAccount } from "viem/accounts";
import { useCustomPrivy } from "~/hooks/use-custom-privy";

function getAccountFromCompressed(compressedKey: string) {
  try {
    // base58 디코딩
    const privateKeyBytes = bs58.decode(compressedKey);

    // hex 문자열로 변환하고 0x 접두사 추가
    const privateKeyHex = Buffer.from(privateKeyBytes).toString("hex");
    const privateKey = `0x${privateKeyHex}` as const;
    const account = privateKeyToAccount(privateKey);
    const publicAddress = account.address;

    return {
      privateKey,
      publicAddress,
    };
  } catch (error) {
    throw new Error(`Failed to decompress private key from: ${compressedKey}`);
  }
}
export default function ReceiveLink() {
  const { hash } = useParams<{ hash: string }>();
  const { login, authenticated } = useCustomPrivy();

  const { publicAddress } = getAccountFromCompressed(hash!);
  console.log(publicAddress);
  const isExpoApp = /Expo/.test(navigator.userAgent);
  const navigate = useNavigate();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { height: windowHeight } = useWindowSize();

  const logoMt = windowHeight / 2 - 144 - 62;

  const handleErrorSheetClose = () => {
    setIsBottomSheetOpen(false);
  };

  const handleErrorSheetButtonClick = () => {
    setIsBottomSheetOpen(false);
    navigate("/home");
  };

  const onButtonClick = async () => {
    // 로그인이 안되어있으면 privy 로그인
    if (!authenticated) {
      await login();
      return;
    } else {
      setIsBottomSheetOpen(true);
    }
  };

  const onClose = () => {
    navigate("/home");
  };
  return (
    <div
      className="flex flex-col h-screen gap-2 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/grid-bg.png')",
      }}
    >
      <Alert
        isOpen={true}
        onClose={() => {}}
        icon={<DownloadIcon />}
        title="10.50 USDT"
        buttonText="받기"
        onButtonClick={onButtonClick}
        overlay={<div className="" />}
      >
        @김카이아님이 보냈어요 <br />
        아래 '받기' 버튼을 눌러야 송금이 완료돼요
      </Alert>
      {isExpoApp ? (
        <div className="h-16 flex justify-start items-center pr-4">
          <button
            className="w-16 h-16 flex justify-center items-center transition-all duration-200 hover:opacity-50 active:opacity-50 z-55"
            onClick={onClose}
          >
            <CloseXIcon />
          </button>
        </div>
      ) : (
        <div
          className="h-16 flex justify-start items-center pr-4"
          style={{
            backgroundImage: "url('/logo.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "32px",
            marginTop: `${logoMt}px`,
          }}
        />
      )}

      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleErrorSheetClose}
        icon={<CheckIcon />}
        title="돈 받기 완료"
        buttonText="확인"
        onButtonClick={handleErrorSheetButtonClick}
      >
        거래 세부 내역과 트랜잭션 주소는
        <br />
        거래 내역 상세에서 확인하실 수 있어요
      </BottomSheet>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomSheet from "~/components/BottomSheet";
import HeaderWithBackButton from "~/components/HeaderWithBackButton";
import { LoadingOverlay } from "~/components/LoadingOverlay";
import ChevronRightIcon from "~/components/icons/chevron-right";
import ExclamationIcon from "~/components/icons/ExclamationIcon";
import LinkIcon from "~/components/icons/LinkIcon";
import PhoneIcon from "~/components/icons/PhoneIcon";
import UserIcon from "~/components/icons/UserIcon";
import WalletIcon from "~/components/icons/WalletIcon";
import { useGetUserMe } from "~/generated/api";

export default function Send() {
  const navigate = useNavigate();
  const { data, isLoading, isRefetching, refetch, isPending } = useGetUserMe({
    query: {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  });

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const handleErrorSheetClose = () => {
    setIsBottomSheetOpen(false);
  };
  const handleErrorSheetButtonClick = () => {
    setIsBottomSheetOpen(false);
    navigate("/account/change-id");
  };

  useEffect(() => {
    // 페이지가 포커스될 때마다 transations 새로고침
    const handleFocus = () => {
      refetch();
    };

    // 컴포넌트 마운트 시 transations 새로고침
    refetch();

    // 이벤트 리스너 등록
    window.addEventListener("focus", handleFocus);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const items = [
    {
      icon: LinkIcon,
      title: "링크 공유로 보내기",
      description:
        "상대방에게 링크를 공유할 수 있어요. 받는 사람이 링크를 열면 돈이 송금돼요.",
      via: "link",
      route: "/send/amount",
    },
    {
      icon: PhoneIcon,
      title: "핸드폰 번호로 보내기",
      description: "상대방의 휴대폰 번호만 입력하면 보낼 수 있어요.",
      via: "phone",
      route: "/send/via-phone",
    },
    {
      icon: UserIcon,
      title: "KaiaPay 아이디",
      description:
        "상대방의 KaiaPay 아이디를 통해 페이머니로 바로 보낼 수 있어요.",
      via: "kaiapay-id",
      route: "/send/via-kaiapay-id",
    },
    {
      icon: WalletIcon,
      title: "지갑으로 보내기",
      description: "상대방의 지갑 주소를 직접 입력하여 보낼 수 있어요.",
      via: "wallet-address",
      route: "/send/via-wallet-address",
    },
  ];

  console.log(data);
  return (
    <div className="flex flex-col h-screen gap-2">
      <LoadingOverlay
        isVisible={isLoading || isRefetching || isPending || data === undefined}
      />
      <HeaderWithBackButton heading="돈 보내기" />
      <div className="flex flex-col gap-4 px-4 py-6">
        {items.map((i) => (
          <div
            key={i.via}
            className="flex flex-row gap-5 pt-[14px] pb-4 pr-6 pl-4 bg-white/10 backdrop-blur-[14px] rounded-[16px] cursor-pointer hover:opacity-90 active:opacity-50 transition-all duration-300"
            onClick={() => {
              // @ts-ignore
              if (!data?.user?.kaiapayId) {
                setIsBottomSheetOpen(true);
                return;
              }
              navigate(`/send/amount?via=${i.via}`);
            }}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-[14px] flex-shrink-0">
              <i.icon size={24} color="white" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-normal text-[16px] leading-[22px] tracking-[-0.1px]">
                {i.title}
              </h3>
              <p className="font-normal text-[14px] leading-[18px] tracking-[-0.1px] text-gray-400">
                {i.description}
              </p>
            </div>
            <div className="h-full flex items-center justify-center flex-shrink-0">
              <ChevronRightIcon />
            </div>
          </div>
        ))}
      </div>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleErrorSheetClose}
        icon={<ExclamationIcon />}
        title={"KaiaPay 아이디 설정이 필요해요"}
        buttonText="확인"
        onButtonClick={handleErrorSheetButtonClick}
      >
        페이머니를 보내기 전에
        <br />
        KaiaPay 아이디를 설정해주세요.
      </BottomSheet>
    </div>
  );
}

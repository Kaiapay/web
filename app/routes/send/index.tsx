import { useNavigate } from "react-router";
import ArrowLeftIcon from "~/components/icons/ArrowLeftIcon";
import ChevronRightIcon from "~/components/icons/chevron-right";
import LinkIcon from "~/components/icons/LinkIcon";
import PhoneIcon from "~/components/icons/PhoneIcon";
import UserIcon from "~/components/icons/UserIcon";
import WalletIcon from "~/components/icons/WalletIcon";

export default function Send() {
  const navigate = useNavigate();

  const items = [
    {
      icon: LinkIcon,
      title: '링크 공유로 보내기',
      description: '상대방에게 링크를 공유할 수 있어요. 받는 사람이 링크를 열면 돈이 송금돼요.',
      path: 'via-link'
    },
    {
      icon: PhoneIcon,
      title: '핸드폰 번호로 보내기',
      description: '상대방의 휴대폰 번호만 입력하면 보낼 수 있어요.',
      path: 'via-phone'
    },
    {
      icon: UserIcon,
      title: 'KaiaPay 아이디',
      description: '상대방의 KaiaPay 아이디를 통해 페이머니로 바로 보낼 수 있어요.',
      path: 'via-kaiapay-id'
    },
    {
      icon: WalletIcon,
      title: '지갑으로 보내기',
      description: '상대방의 지갑 주소를 직접 입력하여 보낼 수 있어요.',
      path: 'to-wallet'
    },
  ];

  return (
    <div className="flex flex-col h-screen gap-2">
      <div className="flex items-center h-9 px-4 pt-3">
        <button className="hover:opacity-90 active:opacity-75 cursor-pointer" onClick={() => navigate('/')}>
            <ArrowLeftIcon />   
        </button>
      </div>
      <div className="px-4">
        <span className="font-semibold text-[32px] leading-none tracking-[0.5px] text-center">
          돈 보내기
        </span>
      </div>
      <div className="flex flex-col gap-4 px-4 py-6">
        {items.map(i => (
          <div 
            key={i.path}
            className="flex flex-row gap-5 pt-[14px] pb-4 pr-6 pl-4 bg-white/10 backdrop-blur-[14px] rounded-[16px] cursor-pointer hover:opacity-90 active:opacity-50 transition-all duration-300"
            onClick={() => navigate(`/send/${i.path}`)}
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
    </div>
  );
}

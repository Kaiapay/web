import IconButton from "../IconButton";
import UserIcon from "../../routes/assets/icons/user.svg";
import GiftIcon from "../../routes/assets/icons/gift.svg";
import CardIcon from "../../routes/assets/icons/card.svg";
import SearchIcon from "../../routes/assets/icons/search.svg";
import { useNavigate } from "react-router";

interface HomeHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function HomeHeader({
  searchQuery,
  onSearchChange,
}: HomeHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row gap-[8px] pt-[12px] px-[16px]">
      <IconButton
        iconSrc={UserIcon}
        iconAlt="User"
        onClick={() => navigate("/account", { viewTransition: true })}
      />

      {/* 검색 영역 */}
      <div className="flex-1 bg-white/20 backdrop-blur-[10px] rounded-full px-3 py-1.5 flex items-center gap-1.5">
        <img src={SearchIcon} alt="Search" className="w-[24px] h-[24px]" />
        <input
          type="text"
          placeholder="검색"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 bg-transparent text-white text-sm placeholder-white/70 outline-none border-none text-[14px] font-pretendard"
        />
      </div>

      <IconButton
        iconSrc={GiftIcon}
        iconAlt="Gift"
        hasRedDot={true}
        onClick={() => navigate("/luckybox", { viewTransition: true })}
      />
      <IconButton
        iconSrc={CardIcon}
        iconAlt="Card"
        onClick={() => navigate("/kaiapay-card", { viewTransition: true })}
      />
    </div>
  );
}

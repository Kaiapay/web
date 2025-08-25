import IconButton from "../IconButton";
import { useNavigate } from "react-router-dom";

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
    <div className="flex flex-row gap-[8px] pt-[12px] px-[16px] min-w-0">
      <IconButton
        iconSrc="/icons/user.svg"
        iconAlt="User"
        onClick={() => navigate("/account")}
      />

      {/* 검색 영역 */}
      <div className="flex-1 bg-white/20 backdrop-blur-[10px] rounded-full px-3 py-1.5 flex items-center gap-1.5 min-w-0 overflow-hidden">
        <img src="/icons/search.svg" alt="Search" className="w-[24px] h-[24px] flex-shrink-0" />
        <input
          type="text"
          placeholder="검색"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 bg-transparent text-white text-sm placeholder-white/70 outline-none border-none text-[14px] font-pretendard min-w-0"
        />
      </div>

      <IconButton
        iconSrc="/icons/gift.svg"
        iconAlt="Gift"
        hasRedDot={true}
        onClick={() => navigate("/luckybox")}
      />
      <IconButton
        iconSrc="/icons/card.svg"
        iconAlt="Card"
        onClick={() => navigate("/kaiapay-card")}
      />
    </div>
  );
}

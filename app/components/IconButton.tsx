interface IconButtonProps {
  // 아이콘 관련
  iconSrc: string;
  iconAlt?: string;
  
  // 크기 관련
  size?: 36 | 48 | 44 | 40;
  iconSize?: number;
  
  // 스타일 관련
  backgroundColor?: string;
  borderRadius?: string;
  
  // 기능 관련
  hasRedDot?: boolean;
  redDotColor?: string;
  
  // 이벤트
  onClick?: () => void;
  
  // 추가 스타일
  className?: string;
}

export default function IconButton({
  iconSrc,
  iconAlt = "icon",
  size = 36,
  iconSize,
  backgroundColor = "bg-white/20",
  borderRadius = "rounded-full",
  hasRedDot = false,
  redDotColor = "bg-red-500",
  onClick,
  className = "",
}: IconButtonProps) {
  // 기본 아이콘 크기 매핑
  const getDefaultIconSize = (buttonSize: number) => {
    switch (buttonSize) {
      case 36: return 24;
      case 48: return 18;
      case 44: return 18;
      case 40: return 20;
      default: return 24;
    }
  };

  const finalIconSize = iconSize || getDefaultIconSize(size);

  return (
    <div className="relative inline-block">
      <button
        onClick={onClick}
        className={`
          ${backgroundColor}
          ${borderRadius}
          backdrop-blur-[10px]
          flex items-center justify-center
          transition-all duration-200
          hover:opacity-80
          active:scale-95
          ${className}
        `}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <img
          src={iconSrc}
          alt={iconAlt}
          style={{
            width: `${finalIconSize}px`,
            height: `${finalIconSize}px`,
          }}
          className="object-contain"
        />
      </button>
      
      {/* Red Dot */}
      {hasRedDot && (
        <div
          className={`
            absolute -top-0.5 -right-0.5
            w-[6px] h-[6px]
            ${redDotColor}
            rounded-full
          `}
        />
      )}
    </div>
  );
}

import React from 'react';
import Button from './Button';

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  children?: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
  overlay?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({
  isOpen,
  onClose,
  icon,
  title,
  children,
  buttonText = "확인",
  onButtonClick,
  className = "",
  overlay
}) => {
  if (!isOpen) return null;

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      {
        overlay ?? <div
        className={`absolute inset-0 transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      />
      }
      

      
      {/* Alert 컨테이너 */}
      <div 
        className={`relative w-full mx-[20px] bg-white/10 border border-white/20 border-opacity-20 rounded-[44px] px-[20px] pt-[48px] pb-[20px] flex flex-col items-center gap-[24px] backdrop-blur-[14px] ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 아이콘 */}
        {icon && (
          <div className="w-7 h-7">
            {icon}
          </div>
        )}

        {/* 금액 */}
        {title && (
          <h2 className="text-white text-[32px] font-extrabold text-center leading-[0.6875] tracking-[-0.00625]">
            {title}
          </h2>
        )}

        {/* 메시지 */}
        {children && (
          <p className="text-white/80 text-sm text-center leading-[1.57] tracking-[-0.007] whitespace-pre-line">
            {children}
          </p>
        )}

        {/* 버튼 */}
        <Button
          backgroundColor="bg-white"
          textColor="text-black"
          onClick={handleButtonClick}
          className="font-semibold text-base leading-[1.375] tracking-[-0.02] w-full"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default Alert;

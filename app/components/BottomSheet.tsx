import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  children?: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  icon,
  title,
  children,
  buttonText = "확인",
  onButtonClick,
  className = "",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);

  const safeClose = () => {
    // reset drag state before closing to avoid lingering listeners/offsets
    setIsDragging(false);
    setDragOffset(0);
    startYRef.current = 0;
    currentYRef.current = 0;
    onClose();
  };

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    onClose();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startYRef.current = e.touches[0].clientY;
    currentYRef.current = e.touches[0].clientY;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startYRef.current = e.clientY;
    currentYRef.current = e.clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    currentYRef.current = e.touches[0].clientY;
    const deltaY = currentYRef.current - startYRef.current;
    
    if (deltaY > 0) {
      setDragOffset(deltaY);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    currentYRef.current = e.clientY;
    const deltaY = currentYRef.current - startYRef.current;
    
    if (deltaY > 0) {
      setDragOffset(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const deltaY = currentYRef.current - startYRef.current;
    const threshold = 100;
    
    if (deltaY > threshold) {
      safeClose();
    }
    
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const deltaY = currentYRef.current - startYRef.current;
    const threshold = 100;
    
    if (deltaY > threshold) {
      safeClose();
    }
    
    setIsDragging(false);
    setDragOffset(0);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    if (!isOpen) {
      setIsDragging(false);
      setDragOffset(0);
      startYRef.current = 0;
      currentYRef.current = 0;
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center transition-all duration-300 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* 배경 오버레이 */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      />

      {/* 시트 컨테이너 */}
      <div
        ref={sheetRef}
        className={`relative w-full flex flex-col gap-[24px] mx-[12px] bg-[#363636] rounded-[44px] px-[20px] pt-[8px] pb-[28px] transform ${className}`}
        style={{
          transform: isOpen 
            ? `translateY(${-20 + dragOffset}px)` 
            : "translateY(100%)",
          marginBottom: isOpen ? "0px" : "0px",
          transition: isDragging ? "none" : "all 400ms cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        {/* 드래그 핸들 */}
        <div 
          className="flex justify-center cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-12 h-1 bg-white opacity-20 rounded-full" />
        </div>

        {/* 아이콘 */}
        {icon && (
          <div className="flex justify-center">
            <div className="w-6 h-6 text-white">{icon}</div>
          </div>
        )}

        {/* 타이틀 */}
        {title && (
          <h2 className="text-white text-xl font-bold text-center leading-[28px] tracking-[-0.02em]">
            {title}
          </h2>
        )}

        {/* 콘텐츠 */}
        {children && (
          <div className="text-white/80 text-sm text-center leading-[1.57] tracking-[-0.007em]">
            {children}
          </div>
        )}

        {/* 버튼 */}
        <Button
          onClick={handleButtonClick}
          className="font-semibold text-base leading-[1.375] tracking-[-0.02em]"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default BottomSheet;

import React, { useEffect, useRef, useState } from "react";

interface AttachedSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
}

const AttachedSheet: React.FC<AttachedSheetProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);

  const safeClose = () => {
    setIsDragging(false);
    setDragOffset(0);
    startYRef.current = 0;
    currentYRef.current = 0;
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
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* 배경 오버레이 */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.50)",
          backdropFilter: "blur(4px)",
        }}
        onClick={onClose}
      />

      {/* 시트 컨테이너 */}
      <div
        ref={sheetRef}
        className={`absolute bottom-0 left-0 right-0 w-full bg-[#1C1C1E] rounded-t-[32px] px-[16px] pb-[19px] transform ${className}`}
        style={{
          transform: isOpen 
            ? `translateY(${dragOffset}px)` 
            : "translateY(100%)",
          transition: isDragging ? "none" : "all 400ms cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        {/* 드래그 핸들 */}
        <div 
          className="flex justify-center py-[12px] cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-[40px] h-[4px] bg-white/20 rounded-full" />
        </div>

        {/* 콘텐츠 */}
        {children && (
          <div className="text-white">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttachedSheet;

import React from "react";

interface LoadingOverlayProps {
  isVisible: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-white/20 border-t-[#BFF009] rounded-full animate-spin"></div>
    </div>
  );
};

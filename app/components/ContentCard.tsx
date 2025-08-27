import React from "react";

interface ContentCardProps {
  children: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  onClick?: () => void;
}

export default function ContentCard({
  children,
  className = "",
  backgroundColor = "bg-white/10",
  onClick,
}: ContentCardProps) {
  return (
    <div
      className={`${backgroundColor} backdrop-blur-[14px] rounded-[16px] p-[16px] ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

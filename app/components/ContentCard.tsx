import React from "react";

interface ContentCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function ContentCard({ children, className = "" }: ContentCardProps) {
  return (
    <div className={`bg-white/10 backdrop-blur-[14px] rounded-[16px] p-[16px] ${className}`}>
      {children}
    </div>
  );
}

import React from "react";

interface GoogleIconProps {
  size?: number;
  className?: string;
}

const GoogleIcon: React.FC<GoogleIconProps> = ({
  size = 18,
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={className}
    >
      <g clipPath="url(#clip0_65_3486)">
        <path
          d="M17.6777 9.2062C17.6777 14.2386 14.2315 17.8199 9.14227 17.8199C4.26281 17.8199 0.322266 13.8794 0.322266 8.99993C0.322266 4.12048 4.26281 0.179932 9.14227 0.179932C11.518 0.179932 13.5167 1.05126 15.0566 2.48807L12.656 4.79621C9.51569 1.76611 3.676 4.04224 3.676 8.99993C3.676 12.0763 6.13351 14.5693 9.14227 14.5693C12.6347 14.5693 13.9435 12.0656 14.1497 10.7675H9.14227V7.73383H17.539C17.6208 8.1855 17.6777 8.61939 17.6777 9.2062Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_65_3486">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default GoogleIcon;

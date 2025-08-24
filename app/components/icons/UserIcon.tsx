import React from "react";

interface UserIconProps {
  size?: number;
  className?: string;
}

const UserIcon: React.FC<UserIconProps> = ({ size = 24, className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M8 6C8 7.06087 8.42143 8.07828 9.17157 8.82843C9.92172 9.57857 10.9391 10 12 10C13.0609 10 14.0783 9.57857 14.8284 8.82843C15.5786 8.07828 16 7.06087 16 6C16 4.93913 15.5786 3.92172 14.8284 3.17157C14.0783 2.42143 13.0609 2 12 2C10.9391 2 9.92172 2.42143 9.17157 3.17157C8.42143 3.92172 8 4.93913 8 6Z"
        fill="currentColor"
      />
      <path
        d="M20 16.5C20 18.9853 20 21 12 21C4 21 4 18.9853 4 16.5C4 14.0147 7.58172 12 12 12C16.4183 12 20 14.0147 20 16.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default UserIcon;

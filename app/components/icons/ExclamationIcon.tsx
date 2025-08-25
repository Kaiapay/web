import React from "react";

interface ExclamationIconProps {
  className?: string;
}

const ExclamationIcon: React.FC<ExclamationIconProps> = ({ className }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.4 1.6002C11.4 0.82582 10.7744 0.200195 10 0.200195C9.22567 0.200195 8.60004 0.82582 8.60004 1.6002V12.8002C8.60004 13.5746 9.22567 14.2002 10 14.2002C10.7744 14.2002 11.4 13.5746 11.4 12.8002V1.6002ZM10 19.8002C11.3472 19.8002 12.1892 18.3419 11.5156 17.1752C11.203 16.6338 10.6253 16.3002 10 16.3002C8.65289 16.3002 7.81092 17.7585 8.48451 18.9252C8.79711 19.4666 9.37483 19.8002 10 19.8002Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ExclamationIcon;

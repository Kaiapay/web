import React from 'react';

interface DownloadIconProps {
  className?: string;
}

const DownloadIcon: React.FC<DownloadIconProps> = ({ className = '' }) => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="downloadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(223, 237, 172, 1)" />
          <stop offset="100%" stopColor="rgba(191, 240, 9, 1)" />
        </linearGradient>
      </defs>
      <path
        d="M14 2C14.5523 2 15 2.44772 15 3V17.5858L19.2929 13.2929C19.6834 12.9024 20.3166 12.9024 20.7071 13.2929C21.0976 13.6834 21.0976 14.3166 20.7071 14.7071L14.7071 20.7071C14.3166 21.0976 13.6834 21.0976 13.2929 20.7071L7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929C7.68342 12.9024 8.31658 12.9024 8.70711 13.2929L13 17.5858V3C13 2.44772 13.4477 2 14 2Z"
        fill="url(#downloadGradient)"
      />
      <path
        d="M4 22C4 21.4477 4.44772 21 5 21H23C23.5523 21 24 21.4477 24 22C24 22.5523 23.5523 23 23 23H5C4.44772 23 4 22.5523 4 22Z"
        fill="url(#downloadGradient)"
      />
    </svg>
  );
};

export default DownloadIcon;

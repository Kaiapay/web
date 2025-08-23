import React from "react";

interface ArrowDownIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ArrowDownIcon: React.FC<ArrowDownIconProps> = ({ width = 20, height = 20, color = '#FFFFFF' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 18 18" fill="none">
    <path d="M8.22132 17.4972C8.652 17.9278 9.35144 17.9278 9.78212 17.4972L14.1923 13.0869C14.623 12.6563 14.623 11.9568 14.1923 11.5261C13.7617 11.0955 13.0622 11.0955 12.6315 11.5261L10.1026 14.0551V1.28273C10.1026 0.672879 9.60985 0.180176 9 0.180176C8.39015 0.180176 7.89744 0.672879 7.89744 1.28273V14.0551L5.36846 11.5296C4.93778 11.0989 4.23834 11.0989 3.80766 11.5296C3.37698 11.9603 3.37697 12.6597 3.80766 13.0904L8.21788 17.5006L8.22132 17.4972Z" fill={color}/>
  </svg>
);

export default ArrowDownIcon;

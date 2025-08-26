interface ChevronDownIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({ width = 10, height = 6, color = 'white' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L5 5L9 1"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ChevronDownIcon;

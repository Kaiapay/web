interface ChevronRightIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ChevronRightIcon: React.FC<ChevronRightIconProps> = ({ width = 5, height = 10, color = 'white' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 5 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.24408 1.70711C-0.0813601 1.31658 -0.0813601 0.683568 0.24408 0.293044C0.56952 -0.0974807 1.09704 -0.0974807 1.42248 0.293044L4.75584 4.29304C5.08128 4.68357 5.08128 5.31658 4.75584 5.70711L1.42248 9.70711C1.09704 10.0976 0.56952 10.0976 0.24408 9.70711C-0.0813601 9.31658 -0.0813601 8.68357 0.24408 8.29304L2.98825 5.00008L0.24408 1.70711Z"
      fill={color}
      fillOpacity="0.2"
    />
  </svg>
);

export default ChevronRightIcon;

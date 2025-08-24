import { useNavigate } from "react-router";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";

interface HeaderWithBackButtonProps {
  onBack?: () => void;
  heading?: string;
  subheading?: string;
  rightButton?: {
    text: string;
    onClick: () => void;
    className?: string;
  };
}

export default function HeaderWithBackButton({
  onBack,
  heading,
  subheading,
  rightButton,
}: HeaderWithBackButtonProps) {
  const navigate = useNavigate();
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex items-center justify-between px-4 pt-3">
        <button
          type="button"
          className="hover:opacity-90 min-w-[32px] active:opacity-75 cursor-pointer"
          onClick={handleBack}
        >
          <ArrowLeftIcon />
        </button>
        {rightButton && (
          <button
            type="button"
            onClick={rightButton.onClick}
            className={`text-[14px] font-medium ${rightButton.className || 'text-white/50'}`}
          >
            {rightButton.text}
          </button>
        )}
      </div>
      {heading && (
        <div className="flex flex-col gap-[6px] px-4">
          <h3 className="font-semibold text-[32px] leading-none tracking-[0.5px]">
            {heading}
          </h3>
          {subheading && (
            <p className="font-normal text-[14px] leading-[22px] tracking-[-0.1px] text-white/50">
              {subheading}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

import { useNavigate } from "react-router";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";

interface HeaderWithBackButtonProps {
    onBack?: () => void;
    heading?: string;
    subheading?: string;
}

export default function HeaderWithBackButton({ onBack, heading, subheading }: HeaderWithBackButtonProps) {
    const navigate = useNavigate();
    const handleBack = () => {
        onBack?.();
        navigate(-1);
    }
    return (
    <div className="flex flex-col gap-2">
      <button className="hover:opacity-90 px-4 pt-3 min-w-[32px] active:opacity-75 cursor-pointer" onClick={handleBack}>
          <ArrowLeftIcon />   
      </button>
      {heading && (
        <div className="flex flex-col gap-[6px] px-4">
          <h3 className="font-semibold text-[32px] leading-none tracking-[0.5px]">{heading}</h3>
          {subheading && <p className="font-normal text-[14px] leading-[22px] tracking-[-0.1px] text-white/50">{subheading}</p>}
        </div>
      )}
    </div>
  );
}
import IconButton from "../IconButton";

interface ActionButton {
  icon: string;
  label: string;
  onClick: () => void;
}

interface ActionButtonsProps {
  actions: ActionButton[];
}

export default function ActionButtons({ actions }: ActionButtonsProps) {
  return (
    <div className="px-[16px] pb-[20px]">
      <div className="flex justify-between px-[12px]">
        {actions.map((action, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <IconButton
              iconSrc={action.icon}
              size={48}
              backgroundColor="bg-white/35"
              onClick={action.onClick}
            />
            <span className="text-white text-sm font-medium">{action.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

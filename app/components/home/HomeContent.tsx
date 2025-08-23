import ContentCard from "../ContentCard";
import IconButton from "../IconButton";
import LinkIcon from "../../routes/assets/icons/link.svg";

interface Transaction {
  id: number;
  icon: string;
  iconBg: string;
  amount: string;
  description: string;
  status?: string;
  hasBadge: boolean;
  actionButton?: string;
  onActionClick?: () => void;
}

interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  actionButton: string;
  iconSize: number;
  onActionClick?: () => void;
}

interface HomeContentProps {
  transactions: Transaction[];
  services: Service[];
  onViewAll: () => void;
}

// 거래 내역 Cell 컴포넌트
const TransactionCell = ({ transaction }: { transaction: Transaction }) => (
  <ContentCard>
    <div className="flex items-center gap-[12px]">
      <div className="relative">
        <IconButton
          iconSrc={transaction.icon}
          size={44}
          backgroundColor={transaction.iconBg}
          iconSize={18}
        />
        {transaction.hasBadge && (
          <div className="absolute -bottom-0.5 -right-1 w-5 h-5 bg-[#2BB3FF] border-2 border-[#1B1B1B] rounded-full flex items-center justify-center">
            <img src={LinkIcon} alt="Link" className="w-[12px] h-[12px]" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <span className="text-white text-[16px] font-medium">
          {transaction.amount}
        </span>
        <div className="flex items-center gap-[6px]">
          <span className="text-white/50 text-[14px]">
            {transaction.description}
          </span>
          {transaction.status && (
            <span className="text-[rgba(255,68,61,0.8)] text-[14px]">
              {transaction.status}
            </span>
          )}
        </div>
      </div>
      {transaction.actionButton && (
        <button 
          onClick={transaction.onActionClick}
          className="bg-white/20 backdrop-blur-[14px] rounded-[32px] px-4 py-2 text-white/90 text-[15px] font-medium hover:opacity-80 transition-opacity"
        >
          {transaction.actionButton}
        </button>
      )}
    </div>
  </ContentCard>
);

// 서비스 바로가기 Cell 컴포넌트
const ServiceCell = ({ service }: { service: Service }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-[16px]">
      <IconButton
        iconSrc={service.icon}
        size={40}
        backgroundColor="bg-white/20"
        borderRadius="rounded-xl"
        iconSize={service.iconSize}
      />
      <div>
        <h4 className="text-white text-[16px] font-medium">
          {service.title}
        </h4>
        <p className="text-white/50 text-[14px]">{service.description}</p>
      </div>
    </div>
    <button 
      onClick={service.onActionClick}
      className="h-[40px] bg-white/20 backdrop-blur-[14px] rounded-[32px] px-[16px] text-white/90 text-[15px] font-medium hover:opacity-80 transition-opacity"
    >
      {service.actionButton}
    </button>
  </div>
);

export default function HomeContent({ transactions, services, onViewAll }: HomeContentProps) {
  return (
    <div className="px-4 space-y-[8px]">
      {/* 거래 내역 */}
      <div className="space-y-[12px]">
        {transactions.map((transaction) => (
          <TransactionCell key={transaction.id} transaction={transaction} />
        ))}
      </div>

      {/* 전체 보기 */}
      <div className="flex items-center justify-center gap-[6px] text-[15px] font-medium pb-[8px]">
        <button onClick={onViewAll} className="text-white hover:opacity-80">
          전체 보기
        </button>
        <span className="text-white/50">오늘 5건</span>
      </div>

      {/* 서비스 바로가기 */}
      <ContentCard>
        <h3 className="text-white/50 text-[14px] font-medium mb-[16px]">
          서비스 바로가기
        </h3>
        <div className="space-y-[28px]">
          {services.map((service) => (
            <ServiceCell key={service.id} service={service} />
          ))}
        </div>
      </ContentCard>
    </div>
  );
}

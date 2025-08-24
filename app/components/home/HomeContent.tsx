import ContentCard from "../ContentCard";
import IconButton from "../IconButton";
import LinkIcon from "../../routes/assets/icons/link.svg";
import type { Transaction as TransactionModel } from "../../routes/transactions/types/transaction";
import TransactionCell from "../transactions/TransactionCell";

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
  transactions: TransactionModel[];
  services: Service[];
  onViewAll: () => void;
  onTransactionClick: (transaction: TransactionModel) => void;
}

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
        <h4 className="text-white text-[16px] font-medium">{service.title}</h4>
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

export default function HomeContent({
  transactions,
  services,
  onViewAll,
  onTransactionClick,
}: HomeContentProps) {
  return (
    <div className="px-4 space-y-[8px]">
      {/* 거래 내역 */}
      <div className="space-y-[12px]">
        {transactions.map((transaction) => (
          <TransactionCell
            key={transaction.id}
            transaction={transaction}
            onClick={onTransactionClick}
          />
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

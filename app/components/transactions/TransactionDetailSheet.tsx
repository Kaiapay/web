import { GetTransactionList200TransactionsItem } from "~/generated/api";
import AttachedSheet from "../AttachedSheet";
import { TransactionUtils } from "~/routes/transactions/types/transaction";
import { getIconComponent } from "~/routes/transactions/utils/iconUtils";
import { usePrivy } from "@privy-io/react-auth";

interface TransactionDetailSheetProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: GetTransactionList200TransactionsItem | null;
  onCancel?: () => void;
}

export default function TransactionDetailSheet({
  isOpen,
  onClose,
  transaction,
  onCancel,
}: TransactionDetailSheetProps) {
  if (!transaction) return null;
  const iconInfo = TransactionUtils.getIconAndColor(transaction);
  const icon = getIconComponent(iconInfo.icon);
  const secondaryIcon = iconInfo.secondaryIcon
    ? getIconComponent(iconInfo.secondaryIcon, 12)
    : undefined;

  const { user } = usePrivy();
  const smartWallet = user?.linkedAccounts.find(
    (account) => account.type === "smart_wallet"
  );

  const address = smartWallet?.address;

  return (
    <AttachedSheet isOpen={isOpen} onClose={onClose} height="90dvh">
      <div className="flex flex-col gap-[10px]">
        {/* 거래 정보 헤더 */}
        <div className="flex gap-[10px]">
          <div className="flex-1 flex flex-col gap-[4px]">
            <span className="text-white text-[32px] font-semibold leading-[1.193em] tracking-[1.5625%]">
              {TransactionUtils.getDetailAmountDisplay(transaction, address)}
            </span>
            <span className="text-white text-[15px] font-medium leading-[1.467em] tracking-[-0.667%]">
              {TransactionUtils.getMethodText(transaction, address)}
            </span>
            <span className="text-white/50 text-[14px] font-normal leading-[1.571em] tracking-[-0.714%]">
              {new Date(transaction.updatedAt).toLocaleDateString("ko-KR", {
                month: "long",
                day: "numeric",
              })}
              ,{" "}
              {new Date(transaction.updatedAt).toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>

          {/* 아이콘 - 리스트와 동일한 크기와 스타일 */}
          <div className="relative h-[44px] w-[44px]">
            <div
              className={`w-full h-full rounded-[36px] flex items-center justify-center ${iconInfo.iconBgColor}`}
            >
              {icon}
            </div>
            {secondaryIcon && (
              <div
                className={`absolute -bottom-[2px] -right-[2px] w-[20px] h-[20px] rounded-full border-2 border-[#1B1B1B] flex items-center justify-center ${iconInfo.secondaryIconBgColor}`}
              >
                {secondaryIcon}
              </div>
            )}
          </div>
        </div>

        {/* 거래 상세 정보 */}
        <div className="bg-white/5 backdrop-blur-[14px] rounded-[16px] p-[14px_16px] flex flex-col gap-[16px]">
          {/* 상태 */}
          <div className="flex justify-between items-center">
            <span className="text-white/50 text-[14px] font-normal leading-[1.571em] tracking-[-0.714%]">
              상태
            </span>
            <span className="text-white text-[14px] font-normal leading-[1.571em] tracking-[-0.714%]">
              {TransactionUtils.getStatusText(transaction)}
            </span>
          </div>

          {/* 받은 사람 */}
          <div className="flex justify-between items-center">
            <span className="text-white/50 text-[14px] font-normal leading-[1.571em] tracking-[-0.714%]">
              받은 사람
            </span>
            <span className="text-white text-[14px] font-normal leading-[1.571em] tracking-[-0.714%]">
              {transaction.recipientAlias || "-"}
            </span>
          </div>
        </div>

        {/* 액션 버튼들 */}
        {transaction.status === "pending" && (
          <>
            {/* 취소하기 버튼 */}
            {transaction.canCancel && onCancel && (
              <button
                onClick={onCancel}
                className="w-full bg-[rgba(255,68,61,0.05)] backdrop-blur-[14px] rounded-[16px] p-[14px_16px] text-[#FF443D] text-[16px] font-semibold leading-[1.375em] tracking-[-2%] hover:opacity-80 transition-opacity"
              >
                취소하기
              </button>
            )}

            {/* 다시 링크 공유 버튼 */}
            {/* {transaction.canReshare && onReshare && (
              <button
                onClick={onReshare}
                className="w-full bg-[rgba(191,240,9,0.05)] backdrop-blur-[14px] rounded-[16px] p-[14px_16px] text-[#BFF009] text-[16px] font-semibold leading-[1.375em] tracking-[-2%] hover:opacity-80 transition-opacity"
              >
                다시 링크 공유
              </button>
            )} */}
          </>
        )}

        {/* 거래 유형 */}
        <div className="bg-white/5 backdrop-blur-[14px] rounded-[16px] p-[14px_16px] flex flex-col gap-[16px]">
          <div className="flex justify-between items-center">
            <span className="text-white/50 text-[14px] font-normal leading-[1.571em] tracking-[-0.714%]">
              거래 유형
            </span>
            <span className="text-white text-[14px] font-normal leading-[1.571em] tracking-[-0.714%]">
              {TransactionUtils.getTransactionTypeText(transaction)}
            </span>
          </div>
        </div>

        {/* transaction explorer link */}
        <div className="bg-white/5 backdrop-blur-[14px] rounded-[16px] p-[14px_16px] flex flex-col gap-[16px]">
          <div className="flex justify-between items-center">
            <span className="text-white/50 text-[14px] font-normal leading-[1.571em] tracking-[-0.714%]">
              Explorer
            </span>
            <span className="text-white text-[14px] font-normal leading-[1.571em] tracking-[-0.714%]">
              <a
                href={`https://kaiascan.io/tx/${transaction.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {transaction.txHash!.slice(0, 6)}...
                {transaction.txHash!.slice(-4)}
              </a>
            </span>
          </div>
        </div>
      </div>
    </AttachedSheet>
  );
}

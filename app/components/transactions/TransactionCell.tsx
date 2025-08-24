import React from "react";
import type { Transaction } from "../../routes/transactions/types/transaction";
import { TransactionUtils } from "../../routes/transactions/types/transaction";
import { getIconComponent } from "../../routes/transactions/utils/iconUtils";

interface TransactionCellProps {
  transaction: Transaction;
  onClick?: (transaction: Transaction) => void;
  showActionButton?: boolean;
  className?: string;
}

export default function TransactionCell({ 
  transaction, 
  onClick, 
  showActionButton = true,
  className = ""
}: TransactionCellProps) {
  const iconInfo = TransactionUtils.getIconAndColor(transaction);
  const icon = getIconComponent(iconInfo.icon);
  const secondaryIcon = iconInfo.secondaryIcon ? getIconComponent(iconInfo.secondaryIcon, 12) : undefined;
  const actionButton = showActionButton ? TransactionUtils.getActionButton(transaction) : null;

  return (
    <div 
      className={`flex items-center gap-[12px] p-[14px_16px] bg-white/10 backdrop-blur-[14px] rounded-[16px] ${onClick ? 'cursor-pointer hover:bg-white/15 transition-colors' : ''} ${className}`}
      onClick={() => onClick?.(transaction)}
    >
      <div className="flex items-center gap-[12px] flex-1">
        <div className="relative">
          <div className={`w-[44px] h-[44px] rounded-[36px] flex items-center justify-center ${iconInfo.iconBgColor}`}>
            {icon}
          </div>
          {secondaryIcon && (
            <div className={`absolute -bottom-[1px] -right-[1px] w-[20px] h-[20px] rounded-full border-2 border-[#1B1B1B] flex items-center justify-center ${iconInfo.secondaryIconBgColor}`}>
              {secondaryIcon}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-[6px] flex-1 min-w-0">
          <div className="flex items-center gap-[6px]">
            <span className={`text-white text-[16px] font-medium leading-[1.375em] tracking-[-0.625%] ${transaction.status === "cancelled" ? "line-through" : ""}`}>
              {TransactionUtils.getListAmountDisplay(transaction)}
            </span>
          </div>
          <div className="flex items-center gap-[6px]">
            <span className="text-white/50 text-[14px] font-normal leading-[1.571em] tracking-[-0.714%] truncate">
              {transaction.description}
            </span>
            {transaction.status === "pending" && (
              <span className="text-[#FF443D]/80 text-[14px] font-normal leading-[1.571em] tracking-[-0.714%] flex-shrink-0">
                대기중
              </span>
            )}
          </div>
        </div>
      </div>
      {actionButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (actionButton.type === "cancel") {
              console.log("취소");
            } else if (actionButton.type === "receive") {
              console.log("받기");
            }
          }}
          className="px-[16px] h-[40px] bg-white/20 backdrop-blur-[14px] rounded-[32px] text-white/90 text-[15px] font-medium hover:opacity-80 transition-opacity whitespace-nowrap flex-shrink-0"
        >
          {actionButton.text}
        </button>
      )}
    </div>
  );
}

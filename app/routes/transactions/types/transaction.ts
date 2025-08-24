export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  currency: string;
  type: "send" | "receive" | "interest" | "payment";
  method: "link" | "id" | "phone" | "wallet" | "luckybox" | "interest" | "payment";
  description: string;
  recipient?: string;
  status?: "pending" | "completed" | "cancelled";
  account: string;
  canCancel?: boolean;
  canReshare?: boolean;
}

export interface TransactionGroup {
  date: string;
  totalAmount: string;
  transactions: Transaction[];
}

// 거래 표시 관련 유틸리티 함수들
export class TransactionUtils {
  // 금액 표시 형식 (목록용)
  static getListAmountDisplay(transaction: Transaction): string {
    const baseAmount = `${transaction.amount.toFixed(2)} ${transaction.currency}`;
    
    if (transaction.status === "cancelled") {
      return baseAmount;
    }

    const sign = transaction.type === "send" ? "-" : "+";
    
    switch (transaction.method) {
      case "link":
      case "id":
      case "phone":
      case "wallet":
        if (transaction.recipient) {
          const direction = transaction.type === "send" ? "→" : "←";
          return `${sign}${baseAmount} ${direction} ${transaction.recipient}`;
        }
        return `${sign}${baseAmount}`;
      case "luckybox":
      case "interest":
      case "payment":
        return `${sign}${baseAmount}`;
      default:
        return `${sign}${baseAmount}`;
    }
  }

  // 금액 표시 형식 (상세용)
  static getDetailAmountDisplay(transaction: Transaction): string {
    const sign = transaction.type === "send" ? "-" : "+";
    return `${sign}${transaction.amount.toFixed(2)} ${transaction.currency}`;
  }

  // 메서드 텍스트 생성
  static getMethodText(transaction: Transaction): string {
    switch (transaction.method) {
      case "link":
        return transaction.type === "send" ? "링크 공유로 보냄" : "링크 공유로 받음";
      case "id":
        return transaction.type === "send" ? "KaiaPay 아이디로 보냄" : "KaiaPay 아이디로 받음";
      case "phone":
        return transaction.type === "send" ? "핸드폰 번호로 보냄" : "핸드폰 번호로 받음";
      case "wallet":
        return transaction.type === "send" ? "지갑으로 보냄" : "지갑으로 받음";
      case "luckybox":
        return "럭키박스로 받음";
      case "interest":
        return "이자로 받음";
      case "payment":
        return transaction.type === "send" ? "결제로 보냄" : "결제로 받음";
      default:
        return transaction.type === "send" ? "보냄" : "받음";
    }
  }

  // 거래 유형 텍스트 생성
  static getTransactionTypeText(transaction: Transaction): string {
    switch (transaction.method) {
      case "link":
        return "링크 공유로 돈 보내기";
      case "id":
        return "KaiaPay 아이디로 돈 보내기";
      case "phone":
        return "핸드폰 번호로 돈 보내기";
      case "wallet":
        return "지갑으로 돈 보내기";
      case "luckybox":
        return "럭키박스 보상";
      case "interest":
        return "이자 받기";
      case "payment":
        return "결제";
      default:
        return "거래";
    }
  }

  // 액션 버튼 정보 생성
  static getActionButton(transaction: Transaction): { text: string; type: "cancel" | "receive" } | null {
    if (transaction.status !== "pending") return null;

    if (transaction.type === "send" && transaction.canCancel) {
      return { text: "취소", type: "cancel" as const };
    }

    if (transaction.type === "receive" && transaction.method === "link") {
      return { text: "받기", type: "receive" as const };
    }

    return null;
  }

  // 상태 표시 텍스트 생성
  static getStatusText(transaction: Transaction): string {
    switch (transaction.status) {
      case "pending":
        return "대기중";
      case "cancelled":
        return "취소됨";
      case "completed":
      default:
        return "완료";
    }
  }

  // 아이콘과 배경색 정보 생성
  static getIconAndColor(transaction: Transaction) {
    switch (transaction.method) {
      case "link":
      case "id":
      case "phone":
      case "wallet":
        return {
          icon: transaction.type === "send" ? "SendIcon" : "ArrowDownIcon",
          iconBgColor: "bg-white/20",
          secondaryIcon: transaction.method === "link" ? "LinkIcon" : 
                        transaction.method === "id" ? "UserIcon" :
                        transaction.method === "phone" ? "PhoneIcon" :
                        "WalletIcon",
          secondaryIconBgColor: transaction.method === "link" ? "bg-[#2BB3FF]" :
                               transaction.method === "id" ? "bg-[rgba(191,240,9,0.8)]" :
                               transaction.method === "phone" ? "bg-[#BE5AF2]" :
                               "bg-[#FF7941]"
        };
      case "luckybox":
        return {
          icon: "GiftIcon",
          iconBgColor: "bg-[rgba(255,198,64,0.2)]",
          secondaryIcon: undefined,
          secondaryIconBgColor: undefined
        };
      case "interest":
        return {
          icon: "CoinsIcon",
          iconBgColor: "bg-[rgba(191,240,9,0.2)]",
          secondaryIcon: undefined,
          secondaryIconBgColor: undefined
        };
      case "payment":
        return {
          icon: "ReceiptIcon",
          iconBgColor: "bg-[rgba(102,124,255,0.2)]",
          secondaryIcon: undefined,
          secondaryIconBgColor: undefined
        };
      default:
        return {
          icon: transaction.type === "send" ? "ArrowUpIcon" : "ArrowDownIcon",
          iconBgColor: "bg-white/20",
          secondaryIcon: undefined,
          secondaryIconBgColor: undefined
        };
    }
  }

}

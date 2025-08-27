import React from "react";
import ArrowDownIcon from "../../../components/icons/ArrowDownIcon";
import SendIcon from "~/components/icons/SendIcon";
import GiftIcon from "~/components/icons/GiftIcon";
import CoinsIcon from "~/components/icons/CoinsIcon";
import ReceiptIcon from "~/components/icons/ReceiptIcon";
import LinkIcon from "~/components/icons/LinkIcon";
import PhoneIcon from "~/components/icons/PhoneIcon";
import UserIcon from "~/components/icons/UserIcon";
import WalletIcon from "~/components/icons/WalletIcon";

// 아이콘 컴포넌트 매핑
export const getIconComponent = (iconName: string, size?: number): React.ReactElement => {
  switch (iconName) {
    case "ArrowDownIcon":
      return <ArrowDownIcon />;
    case "SendIcon":
      return <SendIcon />;
    case "GiftIcon":
      return <GiftIcon />;
    case "CoinsIcon":
      return <CoinsIcon />;
    case "ReceiptIcon":
      return <ReceiptIcon />;
    case "LinkIcon":
      return <LinkIcon size={size} />;
    case "PhoneIcon":
      return <PhoneIcon size={size} />;
    case "UserIcon":
      return <UserIcon size={size} />;
    case "WalletIcon":
      return <WalletIcon size={size} />;
    default:
      return <ArrowDownIcon />;
  }
};

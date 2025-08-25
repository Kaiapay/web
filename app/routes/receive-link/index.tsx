import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import bs58 from "bs58";
import Alert from "~/components/Alert";
import BottomSheet from "~/components/BottomSheet";
import CheckIcon from "~/components/icons/CheckIcon";
import DownloadIcon from "~/components/icons/DownloadIcon";
import useWindowSize from "~/hooks/use-window-size";
import { useCustomPrivy } from "~/hooks/use-custom-privy";
import {
  postTransferFromLink,
  useGetPublicTransactionGetByToAddress,
} from "~/generated/api";
import { useFeeDelegationTransaction } from "~/hooks/use-fee-delegation-transaction";
import {
  createWalletClient,
  http,
  kaia,
  privateKeyToAccount,
} from "@kaiachain/viem-ext";
import { formatUnits } from "viem/utils";
import {
  KAIA_RPC_URL,
  KAIAPAY_VAULT_ADDRESS,
  USDT_ADDRESS,
} from "~/lib/constants";
import { KAIAPAY_VAULT_ABI } from "~/hooks/useKaiaPayTransfer";

function getAccountFromCompressed(compressedKey: string) {
  try {
    // base58 디코딩
    const privateKeyBytes = bs58.decode(compressedKey);

    // hex 문자열로 변환하고 0x 접두사 추가
    // @ts-ignore
    const privateKeyHex = window.pBuffer.from(privateKeyBytes).toString("hex");
    const privateKey = `0x${privateKeyHex}` as const;
    const account = privateKeyToAccount(privateKey);
    const publicAddress = account.address;

    return {
      privateKey,
      publicAddress,
    };
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to decompress private key from: ${compressedKey}`);
  }
}

export default function ReceiveLink() {
  const { hash } = useParams<{ hash: string }>();
  const { login, authenticated, user } = useCustomPrivy();

  const { publicAddress, privateKey } = getAccountFromCompressed(hash!);
  console.log({ publicAddress });
  const { data, isLoading } = useGetPublicTransactionGetByToAddress({
    address: publicAddress,
  });

  const navigate = useNavigate();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { height: windowHeight } = useWindowSize();

  const logoMt = windowHeight / 2 - 144 - 62;

  const handleErrorSheetClose = () => {
    setIsBottomSheetOpen(false);
  };

  const onButtonClick = async () => {
    // 로그인이 안되어있으면 privy 로그인
    if (!authenticated) {
      await login();
      return;
    } else {
      await handleReceive();
      setIsBottomSheetOpen(true);
    }
  };

  const { writeContractFD, publicAddress: senderAddress } =
    useFeeDelegationTransaction({
      walletClient: createWalletClient({
        chain: kaia,
        transport: http(KAIA_RPC_URL),
        account: privateKeyToAccount(privateKey as `0x${string}`),
      }),
    });

  const handleErrorSheetButtonClick = async () => {
    setIsBottomSheetOpen(false);
    navigate("/home");
  };

  const handleReceive = async () => {
    if (!data) return;

    const smartWallet = user?.linkedAccounts.find(
      (account) => account.type === "smart_wallet"
    );

    const { hash } = await writeContractFD({
      address: KAIAPAY_VAULT_ADDRESS,
      value: 0n,
      abi: KAIAPAY_VAULT_ABI,
      functionName: "transferToken",
      args: [
        senderAddress,
        smartWallet?.address as `0x${string}`,
        USDT_ADDRESS as `0x${string}`,
        data.transaction.amount,
        0n,
        smartWallet?.address as `0x${string}`,
      ],
    });

    await postTransferFromLink({
      prevTransactionId: data.transaction.id,
      txHash: hash,
    });
  };

  if (isLoading || !data) {
    return <div></div>;
  }

  return (
    <div
      className="flex flex-col h-screen gap-2 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/grid-bg.png')",
      }}
    >
      <Alert
        isOpen={true}
        onClose={() => {}}
        icon={<DownloadIcon />}
        title={`${formatUnits(BigInt(data?.transaction.amount!), 6)} USDT`}
        buttonText="받기"
        onButtonClick={onButtonClick}
        overlay={<div className="" />}
      >
        {data?.transaction.senderAlias}님이 보냈어요 <br />
        아래 '받기' 버튼을 눌러야 송금이 완료돼요
      </Alert>

      <div
        className="h-16 flex justify-start items-center pr-4"
        style={{
          backgroundImage: "url('/logo.png')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "32px",
          marginTop: `${logoMt}px`,
        }}
      />

      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleErrorSheetClose}
        icon={<CheckIcon />}
        title="돈 받기 완료"
        buttonText="확인"
        onButtonClick={handleErrorSheetButtonClick}
      >
        거래 세부 내역과 트랜잭션 주소는
        <br />
        거래 내역 상세에서 확인하실 수 있어요
      </BottomSheet>
    </div>
  );
}

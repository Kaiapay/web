import {
  KaiaWalletClient,
  TxType,
  kaia,
  Account,
  createPublicClient,
  http,
  encodeFunctionData,
  Hex,
} from "@kaiachain/viem-ext";
import { KAIA_RPC_URL } from "~/lib/constants";
import { postRelayFeePay } from "~/generated/api";

type WriteParams = {
  abi: any;
  address: `0x${string}`;
  functionName: string;
  args?: any[];
  value?: bigint;
  gas?: bigint;
};

type Options = {
  walletClient: KaiaWalletClient<Account>;
};

export const useFeeDelegationTransaction = (opts: Options) => {
  if (!opts?.walletClient) throw new Error("walletClient is required");
  const { walletClient } = opts;

  const transport = http(KAIA_RPC_URL);
  const publicClient = createPublicClient({ chain: kaia, transport });

  async function postToRelay(userSignedTx: Hex) {
    const res = await postRelayFeePay({
      userSignedTx,
    });

    return res.hash as `0x${string}`;
  }

  async function writeContractFD(params: WriteParams) {
    const { abi, address, functionName, args = [] } = params;
    const data = encodeFunctionData({ abi, functionName, args });

    const tx2 = await walletClient.prepareTransactionRequest({
      type: TxType.FeeDelegatedSmartContractExecution,
      account: walletClient.account,
      to: address,
      value: 0n,
      data,
      gas: 1000000n, // 가스 estimate 계산을 막기 위해 필요
    });

    const signedTx2 = await walletClient.signTransaction(tx2);
    const hash = await postToRelay(signedTx2 as `0x${string}`);

    return { hash };
  }

  return {
    publicClient,
    walletClient,
    publicAddress: (walletClient.account as any).address as `0x${string}`,
    writeContractFD,
  };
};

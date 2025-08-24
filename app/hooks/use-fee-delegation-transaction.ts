// src/hooks/useFeeDelegationTransaction.ts
import { createPublicClient, http, encodeFunctionData, Hex } from "viem";
import {
  TxType,
  kaia,
  type PrepareTransactionRequestParameters,
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
  walletClient: {
    signTransaction: (tx: PrepareTransactionRequestParameters) => Promise<Hex>;
    prepareTransactionRequest: (
      tx: PrepareTransactionRequestParameters
    ) => Promise<PrepareTransactionRequestParameters>;
    request: <T = unknown>(args: {
      method: string;
      params?: any[];
    }) => Promise<T>;
  };
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

  async function signAndRelay(txReq: PrepareTransactionRequestParameters) {
    const userSignedTx = await walletClient.signTransaction(txReq);
    const hash = await postToRelay(userSignedTx);
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    return { hash, receipt };
  }

  async function writeContractFD(params: WriteParams) {
    const { abi, address, functionName, args = [], value = 0n, gas } = params;
    const data = encodeFunctionData({ abi, functionName, args });

    const base: PrepareTransactionRequestParameters = {
      type: TxType.FeeDelegatedSmartContractExecution as any,
      chain: kaia,
      to: address,
      data,
      value,
      ...(gas ? { gas } : {}),
    };

    const txReq = await walletClient.prepareTransactionRequest(base);
    return await signAndRelay(txReq);
  }

  return {
    publicClient,
    walletClient,
    writeContractFD,
  };
};

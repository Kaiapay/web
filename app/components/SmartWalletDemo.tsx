import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useSmartWallets } from "@privy-io/react-auth/smart-wallets";
import { encodeFunctionData } from "viem";

const KAIAPAY_VAULT_ADDRESS = "0x60f76BAdA29a44143Ee50460284028880d4aB736";
const USDT_ADDRESS = "0xd077A400968890Eacc75cdc901F0356c943e4fDb";

// KaiaPayVault ABI for transferToken function
const KAIAPAY_VAULT_ABI = [
  {
    inputs: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "deadline", type: "uint256" },
      { name: "owner", type: "address" },
    ],
    name: "transferToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export default function SmartWalletDemo() {
  const { user, ready, authenticated } = usePrivy();
  const { client } = useSmartWallets();
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Form state
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [deadline, setDeadline] = useState("0");
  const [ownerAddress, setOwnerAddress] = useState("");

  // Get smart wallet address
  const smartWallet = user?.linkedAccounts.find(
    (account) => account.type === "smart_wallet"
  );

  if (!ready) {
    return <div className="p-4 text-white">Loading...</div>;
  }

  if (!authenticated || !user) {
    return <div className="p-4 text-white">Please connect your wallet</div>;
  }

  if (!smartWallet) {
    return <div className="p-4 text-white">No smart wallet found</div>;
  }

  const handleTransferToken = async () => {
    if (!client) {
      setError("Smart wallet client not available");
      return;
    }

    if (!fromAddress || !toAddress || !amount || !ownerAddress) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError("");
    setTxHash("");

    try {
      // Convert amount to wei (assuming USDT with 6 decimals)
      const amountWei = BigInt(parseFloat(amount) * 1000000);
      const deadlineBigInt = BigInt(deadline);

      // Encode the function call
      const data = encodeFunctionData({
        abi: KAIAPAY_VAULT_ABI,
        functionName: "transferToken",
        args: [
          fromAddress as `0x${string}`,
          toAddress as `0x${string}`,
          USDT_ADDRESS as `0x${string}`,
          amountWei,
          deadlineBigInt,
          ownerAddress as `0x${string}`,
        ],
      });

      // Send the transaction using smart wallet
      const hash = await client.sendTransaction({
        to: KAIAPAY_VAULT_ADDRESS,
        data,
        value: BigInt(0), // No ETH being sent
      });

      setTxHash(hash);
      console.log("Transaction sent:", hash);
    } catch (err: any) {
      console.error("Transaction failed:", err);
      setError(err.message || "Transaction failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040404] p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">
          Smart Wallet Demo
        </h1>

        {/* Smart Wallet Info */}
        <div className="bg-white/10 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-white mb-2">
            Smart Wallet Info
          </h2>
          <p className="text-white/70 text-sm mb-1">Type: {smartWallet.type}</p>
          <p className="text-white/70 text-sm break-all">
            Address: {smartWallet.address}
          </p>
        </div>

        {/* Transfer Form */}
        <div className="bg-white/10 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Transfer USDT
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-white/70 text-sm mb-1">
                From Address
              </label>
              <input
                type="text"
                value={fromAddress}
                onChange={(e) => setFromAddress(e.target.value)}
                placeholder="0x..."
                className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-1">
                To Address
              </label>
              <input
                type="text"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                placeholder="0x..."
                className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-1">
                Amount (USDT)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.000001"
                className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-1">
                Owner Address
              </label>
              <input
                type="text"
                value={ownerAddress}
                onChange={(e) => setOwnerAddress(e.target.value)}
                placeholder="0x..."
                className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-1">
                Deadline (0 for no limit)
              </label>
              <input
                type="number"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="0"
                className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50"
              />
            </div>

            <button
              onClick={handleTransferToken}
              disabled={isLoading}
              className="w-full p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium rounded-lg transition-colors"
            >
              {isLoading ? "Sending..." : "Transfer Token"}
            </button>
          </div>
        </div>

        {/* Results */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-4">
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        {txHash && (
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
            <p className="text-green-200 text-sm mb-2">Transaction sent!</p>
            <p className="text-green-200 text-xs break-all">Hash: {txHash}</p>
            <a
              href={`https://kaiachain.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 text-xs underline mt-2 inline-block"
            >
              View on Kaia Explorer
            </a>
          </div>
        )}

        {/* Contract Info */}
        <div className="bg-white/5 rounded-lg p-4 mt-6">
          <h3 className="text-white/70 text-sm mb-2">Contract Info</h3>
          <p className="text-white/50 text-xs break-all mb-1">
            Vault: {KAIAPAY_VAULT_ADDRESS}
          </p>
          <p className="text-white/50 text-xs break-all">
            USDT: {USDT_ADDRESS}
          </p>
        </div>
      </div>
    </div>
  );
}

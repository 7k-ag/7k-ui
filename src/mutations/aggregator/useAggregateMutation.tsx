import { useTransactionExecution } from "@/hooks/transactions/useTransactionExecution";
import { SorSwapResponse } from "@/types/swapInfo";
import { TokenAmount } from "@/types/token";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Params {
  sorResponse: SorSwapResponse;
  tokenAmountIn: TokenAmount;
  tokenAmountOut: TokenAmount;
}

const useAggregateMutation = () => {
  const currentAccount = useCurrentAccount();
  const client = useSuiClient();
  const executeTransaction = useTransactionExecution();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      sorResponse,
      tokenAmountIn,
      tokenAmountOut,
    }: Params) => {
      if (!currentAccount?.address) {
        throw new Error("You need to connect your wallet!");
      }

      // create a new transaction block
      const txb = new TransactionBlock();
      console.log(
        txb,
        sorResponse,
        tokenAmountIn,
        tokenAmountOut,
        client,
        executeTransaction,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllBalances"] });
    },
  });
};

export default useAggregateMutation;

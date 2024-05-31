import { agSlippageAtom } from "@/atoms/aggregator.atom";
import { useTxExecution } from "@/hooks/transactions/useTxExecution";
import { SorSwapResponse } from "@/types/swapInfo";
import { TokenAmount } from "@/types/token";
import FlowXProtocolContract from "@/utils/protocols/flowx";
// import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

interface Params {
  sorResponse: SorSwapResponse;
  tokenAmountIn: TokenAmount;
  tokenAmountOut: TokenAmount;
}

const useAggregateMutation = () => {
  const currentAccount = useCurrentAccount();
  // const client = useSuiClient();
  const executeTransaction = useTxExecution();
  const queryClient = useQueryClient();
  const slippage = useAtomValue(agSlippageAtom);

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

      const flowXContract = new FlowXProtocolContract(
        tokenAmountIn.token,
        tokenAmountOut.token,
        sorResponse.swaps[0],
        slippage,
        currentAccount.address,
      );

      await flowXContract.buildTransaction(txb);

      return executeTransaction(txb);
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["getAllBalances"] });
      }, 1_000);
    },
  });
};

export default useAggregateMutation;

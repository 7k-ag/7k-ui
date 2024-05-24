import { SorSwapResponse } from "@/types/swapInfo";
import { normalizeTokenId } from "@/utils/token";
import { useQuery } from "@tanstack/react-query";

interface Params {
  tokenInId: string;
  tokenOutId: string;
  amountIn: string;
  enabled?: boolean;
  refetchInterval?: number;
}

const useAgSor = ({
  tokenInId,
  tokenOutId,
  amountIn,
  enabled,
  refetchInterval,
}: Params) => {
  return useQuery<SorSwapResponse>({
    queryKey: ["agSor", tokenInId, tokenOutId, amountIn],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_AG_API}/aggregate?amount=${amountIn}&from=${normalizeTokenId(tokenInId)}&to=${normalizeTokenId(tokenOutId)}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch aggregator sor");
      }
      return response.json();
    },
    refetchInterval,
    enabled,
  });
};

export default useAgSor;

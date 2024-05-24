import { EXPLORER } from "@/constants/explorer";
import { StaticToken } from "@/constants/tokens/staticTokens";
import { useQuery } from "@tanstack/react-query";
import { STATIC_TOKENS } from "@/constants/tokens/staticTokens";
import { useMemo } from "react";
import { denormalizeTokenId, normalizeTokenId } from "@/utils/token";

const useTokenMetadata = (
  coinType: string,
  { useStatic } = { useStatic: false },
) => {
  const tokenId = useMemo(() => {
    return denormalizeTokenId(coinType);
  }, [coinType]);

  if (useStatic) {
    const staticToken = STATIC_TOKENS.find((token) => token.type === tokenId);
    if (staticToken) {
      return {
        data: staticToken,
        isLoading: false,
        isError: false,
      };
    }
  }

  const { data } = useQuery<StaticToken>({
    queryKey: ["tokenMetadata", tokenId],
    queryFn: async () => {
      const response = await fetch(
        `${EXPLORER.ADDRESS}/api/sui-backend/${import.meta.env.VITE_NETWORK}/api/coins/${tokenId}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch token metadata");
      }
      return response.json();
    },
  });

  return {
    data: data
      ? ({ ...data, type: normalizeTokenId(data?.type || "") } as StaticToken)
      : undefined,
    isLoading: !data,
    isError: !data,
  };
};

export default useTokenMetadata;

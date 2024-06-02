import { EXPLORER } from "@/constants/explorer";
import { StaticToken } from "@/constants/tokens/staticTokens";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  denormalizeTokenId,
  getStaticTokenById,
  normalizeTokenId,
} from "@/utils/token";

const useTokensMetadata = (
  coinTypes: string[],
  { useStatic } = { useStatic: false },
) => {
  const tokenIds = useMemo(() => {
    return coinTypes.map((coinType) => denormalizeTokenId(coinType));
  }, [coinTypes]);

  const staticTokens = useMemo(() => {
    if (useStatic) {
      return tokenIds.map((tokenId) => getStaticTokenById(tokenId));
    }
    return null;
  }, [useStatic, tokenIds]);

  const queryResults = useQuery<StaticToken[]>({
    queryKey: ["tokensMetadata", tokenIds],
    queryFn: async () => {
      if (staticTokens) {
        return staticTokens;
      }

      const responses = await Promise.all(
        tokenIds.map((tokenId) =>
          fetch(
            `${EXPLORER.ADDRESS}/api/sui-backend/${import.meta.env.VITE_NETWORK}/api/coins/${tokenId}`,
          ).then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to fetch token metadata for ${tokenId}`);
            }
            return response.json();
          }),
        ),
      );
      return responses.map((data) => ({
        ...data,
        type: normalizeTokenId(data.type || ""),
      }));
    },
    enabled: useStatic ? !staticTokens : true,
  });

  if (staticTokens) {
    return {
      data: staticTokens,
      isLoading: false,
      isError: false,
    };
  }

  return {
    data: queryResults.data,
    isLoading: queryResults.isLoading,
    isError: queryResults.isError,
  };
};

export default useTokensMetadata;

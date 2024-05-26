import { EXPLORER } from "@/constants/explorer";
import { StaticToken } from "@/constants/tokens/staticTokens";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  denormalizeTokenId,
  getStaticTokenById,
  normalizeTokenId,
} from "@/utils/token";

const useTokenMetadata = (
  coinType: string,
  { useStatic } = { useStatic: false },
) => {
  const tokenId = useMemo(() => {
    return denormalizeTokenId(coinType);
  }, [coinType]);

  const staticToken = useMemo(() => {
    if (useStatic) {
      return getStaticTokenById(tokenId);
    }
    return null;
  }, [useStatic, tokenId]);

  const queryResult = useQuery<StaticToken>({
    queryKey: ["tokenMetadata", tokenId],
    queryFn: async () => {
      if (staticToken) {
        return staticToken;
      }

      const response = await fetch(
        `${EXPLORER.ADDRESS}/api/sui-backend/${import.meta.env.VITE_NETWORK}/api/coins/${tokenId}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch token metadata");
      }
      const data = await response.json();
      return { ...data, type: normalizeTokenId(data.type || "") };
    },
    enabled: useStatic ? !staticToken : true,
  });

  if (staticToken) {
    return {
      data: staticToken,
      isLoading: false,
      isError: false,
    };
  }

  return {
    data: queryResult.data,
    isLoading: queryResult.isLoading,
    isError: queryResult.isError,
  };
};

export default useTokenMetadata;

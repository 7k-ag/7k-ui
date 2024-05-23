import { EXPLORER } from "@/constants/explorer";
import { StaticToken } from "@/constants/tokens/staticTokens";
import { useQuery } from "@tanstack/react-query";
import { STATIC_TOKENS } from "@/constants/tokens/staticTokens";
import { SUI_AG_ID, SUI_ID, SUI_TOKEN } from "@/constants/tokens/token";

const useTokenMetadata = (coinType: string) => {
  if ([SUI_AG_ID, SUI_ID].includes(coinType)) {
    return {
      data: SUI_TOKEN,
      isLoading: false,
      isError: false,
    };
  }

  const staticToken = STATIC_TOKENS.find((token) => token.type === coinType);
  if (staticToken) {
    return {
      data: staticToken,
      isLoading: false,
      isError: false,
    };
  }
  return useQuery<StaticToken>({
    queryKey: ["tokenMetadata", coinType],
    queryFn: async () => {
      const response = await fetch(
        `${EXPLORER.ADDRESS}/api/sui-backend/${import.meta.env.VITE_NETWORK}/api/coins/${coinType}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch token metadata");
      }
      return response.json();
    },
  });
};

export default useTokenMetadata;

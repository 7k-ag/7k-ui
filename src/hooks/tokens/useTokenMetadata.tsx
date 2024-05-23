import { EXPLORER } from "@/constants/explorer";
import { StaticToken } from "@/constants/tokens/staticTokens";
import { useQuery } from "@tanstack/react-query";
import { STATIC_TOKENS } from "@/constants/tokens/staticTokens";

const useTokenMetadata = (coinType: string) => {
  // find the token metadata from the static tokens
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
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
};

export default useTokenMetadata;

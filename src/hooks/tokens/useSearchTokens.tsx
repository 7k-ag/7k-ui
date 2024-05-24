import { EXPLORER } from "@/constants/explorer";
import { StaticToken } from "@/constants/tokens/staticTokens";
import { normalizeTokenId } from "@/utils/token";
import { useQuery } from "@tanstack/react-query";

interface SearchTokensResponse {
  content: StaticToken[];
}

const useSearchTokens = (searchTerm: string) => {
  const { data } = useQuery<SearchTokensResponse>({
    queryKey: ["searchTokens", searchTerm],
    queryFn: async () => {
      const response = await fetch(
        `${EXPLORER.ADDRESS}/api/sui-backend/${import.meta.env.VITE_NETWORK}/api/coins?page=0&sortBy=HOLDERS&orderBy=DESC&searchStr=${searchTerm}&size=20`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search tokens");
      }
      return response.json();
    },
  });

  const formattedData: StaticToken[] =
    data?.content.map((token) => ({
      ...token,
      type: normalizeTokenId(token.type),
    })) || [];

  return {
    data: formattedData,
    isLoading: !data,
    isError: !data,
  };
};

export default useSearchTokens;

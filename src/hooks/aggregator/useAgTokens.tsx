import { useQuery } from "@tanstack/react-query";

export interface AgToken {
  id: string;
  decimal: number;
  coingeckoId: string;
  swapType: string;
  minAllowed: string;
}

const useAgTokens = () => {
  const { data } = useQuery<AgToken[]>({
    queryKey: ["agTokens"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_AG_API}/tokens`);
      if (!response.ok) {
        throw new Error("Failed to fetch aggregator tokens");
      }
      return response.json();
    },
  });

  const agTokenSet = new Set(data?.map((token) => token.id));

  return {
    list: data,
    set: agTokenSet,
  };
};

export default useAgTokens;

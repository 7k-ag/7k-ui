import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import BigNumber from "bignumber.js";
import { useMemo } from "react";

const useAccountBalances = () => {
  const account = useCurrentAccount();
  const { data } = useSuiClientQuery(
    "getAllBalances",
    {
      owner: account?.address as string,
    },
    {
      enabled: !!account,
    },
  );

  const balances = useMemo(() => {
    return data?.filter((token) =>
      new BigNumber(token.totalBalance).isGreaterThan(0),
    );
  }, [data]);

  const balancesObj = useMemo(() => {
    return balances?.reduce(
      (acc, token) => {
        acc[token.coinType] = token;
        return acc;
      },
      {} as Record<string, any>,
    );
  }, [balances]);

  return {
    list: balances,
    obj: balancesObj,
  };
};

export default useAccountBalances;

import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { VList } from "virtua";
import TokenItem from "./TokenItem";
import { useMemo } from "react";
import BigNumber from "bignumber.js";

function TokenBalances() {
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

  if (!account || !balances?.length) {
    return null;
  }

  return (
    <VList
      style={{ height: 160, marginRight: -16, paddingRight: 16 }}
      className="vlist"
    >
      {balances.map((token) => (
        <TokenItem key={token.coinType} item={token} />
      ))}
    </VList>
  );
  return null;
}

export default TokenBalances;

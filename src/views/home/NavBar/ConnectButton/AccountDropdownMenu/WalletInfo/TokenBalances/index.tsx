import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { VList } from "virtua";
import TokenItem from "./TokenItem";

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

  if (!account || !data) {
    return null;
  }

  return (
    <VList
      style={{ height: 160, marginRight: -16, paddingRight: 16 }}
      className="vlist"
    >
      {data.map((token) => (
        <TokenItem key={token.coinType} item={token} />
      ))}
    </VList>
  );
  return null;
}

export default TokenBalances;

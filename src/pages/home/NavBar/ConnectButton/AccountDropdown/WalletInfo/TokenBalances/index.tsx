import { VList } from "virtua";
import TokenItem from "./TokenItem";
import useAccountBalances from "@/hooks/accounts/useAccountBalances";

function TokenBalances() {
  const { list: balances } = useAccountBalances();

  if (!balances) {
    return null;
  }

  return (
    <VList style={{ height: 200 }} className="scroll-container">
      {balances.map((token) => (
        <TokenItem key={token.coinType} item={token} />
      ))}
    </VList>
  );
}

export default TokenBalances;

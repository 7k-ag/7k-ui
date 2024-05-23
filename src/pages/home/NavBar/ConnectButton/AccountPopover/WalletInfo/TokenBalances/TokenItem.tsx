import Avatar from "@/components/Avatar";
import TextAmt from "@/components/TextAmt";
import { STATIC_TOKENS_MAP } from "@/constants/tokens/staticTokensMap";
import useTokenMetadata from "@/hooks/tokens/useTokenMetadata";
import { formatBalance } from "@/utils/number";
import { CoinBalance } from "@mysten/sui.js/client";
import BigNumber from "bignumber.js";

type Props = {
  item: CoinBalance;
};

function TokenItem({ item }: Props) {
  const { data } = useTokenMetadata(item.coinType);

  if (!data || new BigNumber(item.totalBalance).isZero()) {
    return null;
  }

  return (
    <div className="h-8 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Avatar
          src={data?.iconUrl || STATIC_TOKENS_MAP[data?.symbol] || ""}
          alt={data?.name}
          className="w-5 h-5"
        />
        <span className="truncate">{data.symbol}</span>
      </div>
      <TextAmt number={formatBalance(item.totalBalance, data?.decimals ?? 9)} />
    </div>
  );
}

export default TokenItem;

import Avatar from "@/components/Avatar";
import TextAmt from "@/components/TextAmt";
import { STATIC_TOKENS_MAP } from "@/constants/tokens/staticTokensMap";
import { TokenBalance } from "@/types/token";
import { formatBalance } from "@/utils/number";

type Props = {
  item: TokenBalance;
  onClick: (item: TokenBalance) => void;
};

function TokenItem({ item, onClick }: Props) {
  return (
    <button
      className="h-10 w-full flex items-center justify-between gap-2 p-2 mb-1 bg-[#373947] rounded-lg"
      onClick={() => onClick(item)}
    >
      <div className="flex items-center gap-2">
        <Avatar
          src={
            item.token.iconUrl ||
            STATIC_TOKENS_MAP[item.token.type]?.iconUrl ||
            ""
          }
          alt={item.token.symbol}
          className="w-6 aspect-square"
        />
        <span className="truncate">{item.token.symbol}</span>
      </div>
      <TextAmt number={formatBalance(item.balance, item.token.decimals ?? 0)} />
    </button>
  );
}

export default TokenItem;

import { ICExport } from "@/assets/icons";
import Avatar from "@/components/Avatar";
import ExplorerTokenLink from "@/components/ExplorerLink/ExplorerTokenLink";
import TextAmt from "@/components/TextAmt";
import { TokenBalance } from "@/types/token";
import { formatBalance } from "@/utils/number";
import { getStaticTokenById } from "@/utils/token";
import { formatAddress } from "@mysten/sui.js/utils";

type Props = {
  item: TokenBalance;
  onClick: (item: TokenBalance) => void;
};

function TokenItem({ item, onClick }: Props) {
  return (
    <button
      className="h-13 w-full flex items-center justify-between gap-2 p-2 mb-1 bg-[#373947] rounded-lg"
      onClick={() => onClick(item)}
    >
      <div className="flex items-center gap-2">
        <Avatar
          src={
            item.token.iconUrl ||
            getStaticTokenById(item.token.type)?.iconUrl ||
            ""
          }
          alt={item.token.symbol}
          className="w-6 aspect-square"
        />
        <div className="flex flex-col items-start gap-1">
          <span className="truncate">{item.token.symbol}</span>
          <span className="truncate text-2xs/none font-normal text-gray-100">
            {item.token.name}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-end gap-1 items-end">
        <TextAmt
          number={formatBalance(item.balance, item.token.decimals ?? 0)}
        />
        <ExplorerTokenLink
          tokenId={item.token.type}
          className="flex items-center gap-1 truncate text-2xs/none font-normal text-gray-100 hover:text-[#85FF99]"
          onClick={(e) => e.stopPropagation()}
        >
          <span>{formatAddress(item.token.type)}</span>
          <ICExport className="w-2.5 aspect-square" />
        </ExplorerTokenLink>
      </div>
    </button>
  );
}

export default TokenItem;

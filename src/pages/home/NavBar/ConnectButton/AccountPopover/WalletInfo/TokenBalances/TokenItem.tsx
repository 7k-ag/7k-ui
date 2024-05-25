import { ICExport } from "@/assets/icons";
import Avatar from "@/components/Avatar";
import ExplorerTokenLink from "@/components/ExplorerLink/ExplorerTokenLink";
import TextAmt from "@/components/TextAmt";
import useTokenMetadata from "@/hooks/tokens/useTokenMetadata";
import { formatBalance } from "@/utils/number";
import { getStaticTokenById } from "@/utils/token";
import { CoinBalance } from "@mysten/sui.js/client";
import { formatAddress } from "@mysten/sui.js/utils";
import BigNumber from "bignumber.js";

type Props = {
  item: CoinBalance;
};

function TokenItem({ item }: Props) {
  const { data } = useTokenMetadata(item.coinType, { useStatic: true });

  if (!data || new BigNumber(item.totalBalance).isZero()) {
    return null;
  }

  return (
    <div className="h-12 flex items-center justify-between gap-2 mb-1">
      <div className="flex items-center gap-2">
        <Avatar
          src={
            data?.iconUrl || getStaticTokenById(data?.type || "")?.iconUrl || ""
          }
          alt={data?.name}
          className="w-5 aspect-square"
        />
        <div className="flex flex-col items-start gap-1">
          <span className="truncate">{data.symbol}</span>
          <span className="truncate text-2xs/none font-normal text-[#A8A8C7]">
            {data.name}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-end gap-1 items-end">
        <TextAmt
          number={formatBalance(item.totalBalance, data?.decimals ?? 0)}
        />
        <ExplorerTokenLink
          tokenId={data.type}
          className="flex items-center gap-1 truncate text-2xs/none font-normal text-[#A8A8C7] hover:text-[#85FF99]"
          onClick={(e) => e.stopPropagation()}
        >
          <span>{formatAddress(data.type)}</span>
          <ICExport className="w-2.5 aspect-square" />
        </ExplorerTokenLink>
      </div>
    </div>
  );
}

export default TokenItem;

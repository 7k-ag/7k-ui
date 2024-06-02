import Avatar from "@/components/Avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/Tooltip";
import useGetDexInfo from "@/hooks/aggregator/useGetDexInfo";
import { SorHop } from "@/types/swapInfo";
import TokenGroupAvatar from "@/components/Avatar/TokenGroupAvatar";
import useTokensMetadata from "@/hooks/tokens/useTokensMetadata";
import { useMemo } from "react";
import { StaticToken } from "@/constants/tokens/staticTokens";

interface Props {
  hop: SorHop;
}
function BatchSwapHop({ hop }: Props) {
  const dex = useGetDexInfo(hop.pool.type);
  const { data } =
    useTokensMetadata(hop.pool.allTokens.map((t) => t.address)) ?? [];
  const tokens = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.filter((t) => !!t) as StaticToken[];
  }, [data]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-20">
            <Avatar className="w-4 h-4" src={dex.logoUrl} alt={dex.name} />
            <div className="w-px h-3 bg-gray-100" />
            <TokenGroupAvatar tokens={tokens} />
          </button>
        </TooltipTrigger>
        <TooltipContent className="flex flex-col gap-4 p-2 rounded-[0.625rem] bg-gray-20 shadow-soft-2 shadow-skin-base/50 backdrop-blur-xl z-10">
          <div className="flex items-center gap-2">
            <Avatar className="w-4 h-4" src={dex.logoUrl} alt={dex.name} />
            <span className="font-bold text-sm">{dex.name}</span>
          </div>
          <div className="flex items-center gap-1 px-4 py-3 bg-skin-card rounded-lg">
            <TokenGroupAvatar
              tokens={tokens}
              tokenClassName="w-3.5 h-3.5 -ml-1 first:ml-0"
            />
            <span className="text-xs">
              {tokens.map((t) => t.symbol).join(" - ")}
            </span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default BatchSwapHop;

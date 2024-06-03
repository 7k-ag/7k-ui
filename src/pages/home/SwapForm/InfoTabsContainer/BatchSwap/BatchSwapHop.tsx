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
import BatchSwapDot from "./BatchSwapDot";

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
          <button className="relative flex items-center gap-2 p-3 rounded-lg bg-black-80 border border-iris-100 min-w-[5.4375rem] min-h-[2.625rem]">
            <div className="absolute -left-0.5 top-1/2 transform -translate-y-1/2">
              <BatchSwapDot className="w-1 h-1" />
            </div>
            <Avatar className="w-4 h-4" src={dex.logoUrl} alt={dex.name} />
            <div className="w-px h-3 bg-gray-100" />
            <TokenGroupAvatar tokens={tokens} />
            <div className="absolute -right-0.5 top-1/2 transform -translate-y-1/2">
              <BatchSwapDot className="w-1 h-1" />
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent className="flex flex-col gap-4 p-4 rounded-[1.25rem] bg-black-60/40 shadow-soft-2 shadow-skin-base/50 backdrop-blur-md z-10 border border-black-40 min-w-[12.125rem] max-w-full">
          <div className="flex items-center gap-1">
            <TokenGroupAvatar
              tokens={tokens}
              tokenClassName="w-3 h-3 -ml-1 first:ml-0"
            />
            <span className="text-sm/none text-[#A8A8C7]">
              {tokens.map((t) => t.symbol).join(" - ")}
            </span>
          </div>
          <div className="flex flex-col gap-2.5 p-2 rounded-xl bg-black-40">
            <div className="flex items-center gap-1">
              <Avatar
                className="w-3 h-3 rounded-full"
                src={dex.logoUrl}
                alt={dex.name}
              />
              <span className="font-normal text-2xs/none text-[#A8A8C7]">
                {dex.name}
              </span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default BatchSwapHop;

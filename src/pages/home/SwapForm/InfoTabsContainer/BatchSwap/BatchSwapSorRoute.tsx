import TokenAvatar from "@/components/Avatar/TokenAvatar";
import BatchSwapRoute from "./BatchSwapRoute";
import TextAmt from "@/components/TextAmt";
import { SorRoute, SorSwapResponse } from "@/types/swapInfo";
import useTokenMetadata from "@/hooks/tokens/useTokenMetadata";
import BatchSwapDot from "./BatchSwapDot";
import { Percent } from "@bicarus/utils";

function getMaxHops(routes?: SorRoute[]): number {
  if (!routes) return 0;
  let maxHops = 0;
  for (const route of routes) {
    if (route.hops.length > maxHops) {
      maxHops = route.hops.length;
    }
  }
  return maxHops;
}

interface Props {
  swapInfo: SorSwapResponse;
}
function BatchSwapSorRoute({ swapInfo }: Props) {
  const { data: tokenIn } = useTokenMetadata(swapInfo.tokenIn, {
    useStatic: true,
  });
  const { data: tokenOut } = useTokenMetadata(swapInfo.tokenOut, {
    useStatic: true,
  });

  return (
    <div className="grid grid-cols-10">
      <div className="col-span-2">
        <div className="flex items-center">
          <div className="relative flex flex-col gap-2.5 p-2 rounded-2xl bg-black-60 min-w-[60%]">
            <div className="flex items-center gap-1">
              <TokenAvatar identifier={swapInfo.tokenIn} className="w-3 h-3" />
              <span className="text-2xs/none text-[#A8A8C7]">
                {tokenIn?.symbol}
              </span>
            </div>
            <div className="flex items-center p-2 rounded-lg bg-black-40">
              <TextAmt
                number={swapInfo.swapAmount}
                className="text-sm truncate"
              />
            </div>
            <div className="absolute -right-0.5 top-1/2 transform -translate-y-1/2">
              <BatchSwapDot className="w-1 h-1" />
            </div>
          </div>
          <div className="flex-1 h-px border-t border-dashed border-black-40" />
        </div>
      </div>

      <div className="col-span-6">
        <div className="relative flex flex-col mt-[0.5px] overflow-hidden">
          <div
            className="absolute top-9 bottom-9 left-0 h-full w-5 border-r border-dashed border-black-40 rounded-tr-2xl"
            style={{ height: "calc(100% - 80px)" }}
          />
          <div
            className="absolute top-9 bottom-9 right-0 h-full w-5 border-l border-dashed border-black-40 rounded-tl-2xl"
            style={{ height: "calc(100% - 80px)" }}
          />
          <div className="mx-5">
            {swapInfo.routes?.map((r, i) => {
              const routePct = new Percent(
                r.tokenInAmount,
                swapInfo.swapAmount,
              );
              return (
                <BatchSwapRoute
                  key={i}
                  route={r}
                  routePct={routePct}
                  maxHops={getMaxHops(swapInfo.routes)}
                  isOnly={swapInfo?.routes?.length === 1}
                  isFirst={i === 0}
                  isLast={i === Number(swapInfo?.routes?.length) - 1}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="col-span-2">
        <div className="flex items-center">
          <div className="flex-1 h-px border-t border-dashed border-black-40" />
          <div className="relative flex flex-col gap-2.5 p-2 rounded-2xl bg-black-60 min-w-[60%]">
            <div className="flex items-center gap-1">
              <TokenAvatar identifier={swapInfo.tokenOut} className="w-3 h-3" />
              <span className="text-2xs/none text-[#A8A8C7]">
                {tokenOut?.symbol}
              </span>
            </div>
            <div className="flex items-center p-2 rounded-lg bg-black-40">
              <TextAmt
                number={swapInfo.returnAmount}
                className="text-sm truncate"
              />
            </div>
            <div className="absolute -left-0.5 top-1/2 transform -translate-y-1/2">
              <BatchSwapDot className="w-1 h-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BatchSwapSorRoute;

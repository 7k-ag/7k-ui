import BigNumber from "bignumber.js";
import BatchSwapHop from "./BatchSwapHop";
import { SorRoute } from "@/types/swapInfo";
import { Percent } from "@bicarus/utils";
import tw from "@/utils/twmerge";

interface Props {
  route: SorRoute;
  isOnly?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

function BatchSwapRoute({ route, isOnly, isFirst, isLast }: Props) {
  return (
    <div className="relative flex items-center">
      <div
        className={tw(
          "absolute h-5 -translate-y-1/2 border-dashed border-black-40 border-b px-6",
          !isOnly && !isFirst && "rounded-2xl",
          !isOnly && isLast && "mt-0.5",
          isFirst ? "-left-5 -right-5" : "inset-x-0",
        )}
      />
      <div className="relative w-full py-4 px-8 flex items-center justify-between gap-4">
        {route.hops.map((h) => {
          const splitPercent = new BigNumber(h.tokenInAmount).lte(0)
            ? new Percent(100, 100)
            : new Percent(h.tokenInAmount, route.tokenInAmount);
          return (
            <BatchSwapHop
              key={`${h.poolId}-${h.tokenIn}-${h.tokenOut}`}
              hop={h}
              splitPercent={splitPercent}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BatchSwapRoute;

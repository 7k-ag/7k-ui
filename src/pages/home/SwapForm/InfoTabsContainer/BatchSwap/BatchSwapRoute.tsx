import BatchSwapHop from "./BatchSwapHop";
import { SorRoute } from "@/types/swapInfo";
import { Percent } from "@bicarus/utils";
import tw from "@/utils/twmerge";
import TextAmt from "@/components/TextAmt";
import { Fragment } from "react/jsx-runtime";

function getMaxColumns(maxHops: number): number {
  const pctCount = 1;
  return (maxHops + pctCount) * 2 - 1;
}

interface Props {
  route: SorRoute;
  routePct: Percent;
  maxHops: number;
  isOnly?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

function BatchSwapRoute({
  route,
  routePct,
  maxHops,
  isOnly,
  isFirst,
  isLast,
}: Props) {
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
        <div
          className="flex-1 grid"
          style={{
            gridTemplateColumns: `repeat(${getMaxColumns(maxHops)}, minmax(0, 1fr))`,
          }}
        >
          <div className="flex items-center">
            <TextAmt
              number={routePct.toBigNumber().multipliedBy(100).toFixed(2)}
              className="inline-flex items-center p-2 rounded-lg bg-black-40 font-normal text-2xs/none text-[#A8A8C7]"
              suffix="%"
            />
          </div>
          <div />
          {route.hops.map((h, i) => {
            return (
              <Fragment key={`${h.poolId}-${h.tokenIn}-${h.tokenOut}`}>
                <div className="flex items-centers">
                  <BatchSwapHop
                    key={`${h.poolId}-${h.tokenIn}-${h.tokenOut}`}
                    hop={h}
                  />
                  {i !== route.hops.length - 1 && (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="h-px w-full border-t border-dashed border-[#FAB01C]" />
                    </div>
                  )}
                </div>
                {i !== route.hops.length - 1 && (
                  <div className="flex items-center justify-center">
                    <div className="h-px w-full border-t border-dashed border-[#FAB01C]" />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BatchSwapRoute;

import BigNumber from "bignumber.js";
import { Fragment, memo } from "react";
import BatchSwapHop from "./BatchSwapHop";
import Avatar from "@/components/Avatar";
import TextAmt from "@/components/TextAmt";
import { ICChevronRight } from "@/assets/icons";
import useTokenMetadata from "@/hooks/tokens/useTokenMetadata";
import { SorRoute } from "@/types/swapInfo";
import { Percent } from "@bicarus/utils";

const TokenSwapAmount = memo(function TokenSwapAmount({
  identifier,
  amount,
}: {
  identifier: string;
  amount: BigNumber.Value;
}) {
  const { data: token } = useTokenMetadata(identifier, { useStatic: true });
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-20">
      <Avatar
        className="w-4 h-4"
        src={token?.iconUrl || ""}
        alt={token?.name}
      />
      <TextAmt number={amount} className="font-bold text-xs" />
    </div>
  );
});

interface Props {
  route: SorRoute;
}

function BatchSwapRoute({ route }: Props) {
  return (
    <div className="relative flex items-center">
      <div className="absolute inset-x-0 h-4 -translate-y-1/2 border-dashed border-[rgba(117,115,145,0.30)] border-b-2 rounded-lg px-6" />
      <div className="relative w-full py-6 px-6 flex items-center justify-between gap-4">
        <TokenSwapAmount
          identifier={route.tokenIn}
          amount={route.tokenInAmount}
        />
        <div className="w-8 h-8 flex items-center justify-center">
          <ICChevronRight className="w-5 h-auto" />
        </div>
        {route.hops.map((h) => {
          const splitPercent = new BigNumber(h.tokenInAmount).lte(0)
            ? new Percent(100, 100)
            : new Percent(h.tokenInAmount, route.tokenInAmount);
          return (
            <Fragment key={`${h.poolId}-${h.tokenIn}-${h.tokenOut}`}>
              <BatchSwapHop hop={h} splitPercent={splitPercent} />
              <div className="w-8 h-8 flex items-center justify-center">
                <ICChevronRight className="w-5 h-auto" />
              </div>
            </Fragment>
          );
        })}
        <TokenSwapAmount
          identifier={route.tokenOut}
          amount={route.tokenOutAmount}
        />
      </div>
    </div>
  );
}

export default BatchSwapRoute;

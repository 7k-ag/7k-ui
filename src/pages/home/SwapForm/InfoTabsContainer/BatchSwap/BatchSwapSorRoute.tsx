import TokenAvatar from "@/components/Avatar/TokenAvatar";
import BatchSwapRoute from "./BatchSwapRoute";
import TextAmt from "@/components/TextAmt";
import { SorSwapResponse } from "@/types/swapInfo";
import * as ScrollArea from "@radix-ui/react-scroll-area";

interface Props {
  swapInfo: SorSwapResponse;
}
function BatchSwapSorRoute({ swapInfo }: Props) {
  return (
    <div>
      <div className="relative -mb-2 flex items-center justify-between">
        <div className="shrink-0 flex items-center gap-2">
          <TokenAvatar identifier={swapInfo.tokenIn} className="w-6 h-6" />
          <TextAmt number={swapInfo.swapAmount} className="font-bold text-sm" />
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <TextAmt
            number={swapInfo.returnAmount}
            className="font-bold text-sm"
          />
          <TokenAvatar identifier={swapInfo.tokenOut} className="w-6 h-6" />
        </div>
      </div>
      <div className="flex relative px-3">
        <div className="w-[5px] mb-11 -ml-[1px] border-l-2 border-dashed rounded-lg border-[rgba(117,115,145,0.30)]" />
        <ScrollArea.Root className="grow overflow-hidden" type="auto">
          <ScrollArea.Viewport className="-mx-0.5 grow block overflow-x-auto pt-24 sm:pt-2 scrollbar-hide">
            <div className="flex flex-col w-full">
              {swapInfo.routes?.map((r, i) => (
                <BatchSwapRoute key={i} route={r} />
              ))}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="p-0.5 flex select-none touch-none bg-transparent transition-colors duration-[160ms] ease-out w-2"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="flex-1 bg-transparent rounded-lg relative" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar
            className="mx-auto w-1/3 flex flex-col select-none touch-none bg-skin-alt transition-colors duration-[160ms] ease-out h-0.5"
            orientation="horizontal"
          >
            <ScrollArea.Thumb className="flex-1 bg-black-80 rounded-lg relative" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
        <div className="w-[5px] mb-11 -mr-[1px] border-r-2 border-dashed rounded-lg border-[rgba(117,115,145,0.30)]" />
      </div>
    </div>
  );
}

export default BatchSwapSorRoute;

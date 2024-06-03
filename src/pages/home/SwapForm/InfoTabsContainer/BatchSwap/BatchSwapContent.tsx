import { memo } from "react";
import BatchSwapSorRoute from "./BatchSwapSorRoute";
import { SorSwapResponse } from "@/types/swapInfo";
import { AnimatePresence, m } from "framer-motion";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/UI/ScrollArea";
import EmptyData from "@/components/EmptyData/EmptyData";

interface Props {
  swapInfo?: SorSwapResponse;
}

function BatchSwapContent({ swapInfo }: Props) {
  return (
    <div className="flex flex-col gap-12 p-8 rounded-3xl border-[1.5px] border-[#222436] bg-black-80">
      <ScrollArea className="sm:h-[24rem] -mr-4 pr-4">
        <AnimatePresence>
          {swapInfo && Number(swapInfo.routes?.length) > 0 ? (
            <m.div
              key="data"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 flex-col gap-6 overflow-auto"
            >
              <ScrollArea>
                <BatchSwapSorRoute swapInfo={swapInfo} />
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </m.div>
          ) : (
            <m.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 flex-col gap-6"
            >
              <EmptyData />
            </m.div>
          )}
        </AnimatePresence>
        <ScrollBar />
      </ScrollArea>
    </div>
  );
}

export default memo(BatchSwapContent);

import {
  Sheet,
  SheetCloseEsc,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/UI/Sheet";
import { AnimatePresence } from "framer-motion";
import { ReactNode, memo, useMemo, useState } from "react";
import BatchSwapContent from "./BatchSwapContent";
import { SorSwapResponse } from "@/types/swapInfo";

interface Props {
  swapInfo?: SorSwapResponse;
  trigger: ReactNode;
}

function BatchSwapSheet({ swapInfo, trigger }: Props) {
  const [open, setOpen] = useState(false);

  const routesNum = useMemo(() => {
    return swapInfo?.routes?.length || 0;
  }, [swapInfo?.routes]);

  const title = useMemo(() => {
    return routesNum === 1 ? "1 round found" : `${routesNum} rounds found`;
  }, [routesNum]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <AnimatePresence>
        {open && (
          <SheetContent
            forceMount
            side="bottom"
            onOpenChange={setOpen}
            className="bg-black-60 p-6 gap-6"
          >
            <div className="flex flex-col gap-6">
              <SheetHeader className="flex items-center justify-between gap-2">
                <SheetTitle className="font-semibold text-base/none">
                  {title}
                </SheetTitle>
                <SheetCloseEsc />
              </SheetHeader>
              <BatchSwapContent swapInfo={swapInfo} />
            </div>
          </SheetContent>
        )}
      </AnimatePresence>
    </Sheet>
  );
}

export default memo(BatchSwapSheet);

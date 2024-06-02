import {
  Sheet,
  SheetCloseEsc,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/UI/Sheet";
import { AnimatePresence } from "framer-motion";
import { memo } from "react";
import BatchSwapContent from "./BatchSwapContent";
import { SorSwapResponse } from "@/types/swapInfo";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  swapInfo?: SorSwapResponse;
}

function BatchSwapSheet({ open, setOpen, swapInfo }: Props) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <AnimatePresence>
        {open && (
          <SheetContent forceMount side="bottom" onOpenChange={setOpen}>
            <div className="flex flex-col gap-6">
              <SheetHeader>
                <SheetTitle>Aggregator Route</SheetTitle>
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

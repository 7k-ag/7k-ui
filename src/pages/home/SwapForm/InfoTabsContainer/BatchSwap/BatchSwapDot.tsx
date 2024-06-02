import tw from "@/utils/twmerge";
import { memo } from "react";

function BatchSwapDot({ className }: { className?: string }) {
  return <div className={tw("rounded-full bg-[#FAB01C]", className)} />;
}

export default memo(BatchSwapDot);

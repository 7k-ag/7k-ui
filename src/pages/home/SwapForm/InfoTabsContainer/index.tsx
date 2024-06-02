import { AnimatePresence, m } from "framer-motion";
import InfoTabs from "./InfoTabs";
import { useAtomValue } from "jotai";
import { agInfoTabAtom } from "@/atoms/aggregator.atom";
import { SorSwapResponse } from "@/types/swapInfo";
import BatchSwapContent from "./BatchSwap/BatchSwapContent";

interface Props {
  swapInfo?: SorSwapResponse;
}

function InfoTabsContainer({ swapInfo }: Props) {
  const activeTab = useAtomValue(agInfoTabAtom);

  return (
    <div className="flex flex-col gap-2">
      <InfoTabs />
      <div className="relative">
        <AnimatePresence initial={false}>
          <m.div
            key={activeTab}
            initial={{ opacity: 0, scale: 1, y: 50, position: "absolute" }}
            animate={{ opacity: 1, scale: 1, y: 0, position: "relative" }}
            exit={{ opacity: 0, scale: 1, y: 0, position: "absolute" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="inset-x-0"
          >
            {activeTab === "price-chart" && (
              <div className="h-96 bg-black-80 rounded-xl">Price Chart</div>
            )}
            {activeTab === "routes" && <BatchSwapContent swapInfo={swapInfo} />}
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default InfoTabsContainer;

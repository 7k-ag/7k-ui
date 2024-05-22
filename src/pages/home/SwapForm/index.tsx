import InputCurrency from "@/components/InputCurrency";
import RefreshButton from "./RefreshButton";
import SlippagePopover from "./SlippagePopover";
import SelectTokenModal from "./SelectTokenModal";

function SwapForm() {
  return (
    <div className="flex flex-col gap-2 p-2 rounded-3xl w-[24rem] max-w-full">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-2">
          <RefreshButton />
          <SlippagePopover />
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex flex-col gap-6 p-1 rounded-2xl bg-[#1C1E2C]">
          <div className="flex items-center gap-1">
            <InputCurrency className="flex-1 p-2 outline-none bg-transparent text-lg sm:text-2xl overflow-hidden grow" />
            <SelectTokenModal />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwapForm;

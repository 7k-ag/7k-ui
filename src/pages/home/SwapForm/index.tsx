import InputCurrency from "@/components/InputCurrency";
import RefreshButton from "./RefreshButton";
import SlippagePopover from "./SlippagePopover";
import SelectTokenModal from "./SelectTokenModal";
import { ICFrame } from "@/assets/icons";
import ImgSwap from "@/assets/images/swap.png";

function SwapForm() {
  return (
    <div className="flex flex-col gap-2 p-2 rounded-3xl w-[24rem] max-w-full">
      <div className="flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-4 px-2">
          <span className="text-sm/none font-semibold">Swap</span>
        </div>
        <div className="flex items-center gap-2">
          <RefreshButton />
          <SlippagePopover />
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <div className="flex flex-col gap-6 p-1 rounded-2xl bg-[#1C1E2C]">
          <div className="flex items-center gap-1">
            <InputCurrency
              className="flex-1 p-2 outline-none bg-transparent text-lg sm:text-2xl overflow-hidden grow"
              placeholder="0"
            />
            <SelectTokenModal />
          </div>
          <div className="flex items-center justify-between gap-2.5 p-2 rounded-xl">
            <span className="text-[#A8A8C7] text-2xs font-light">
              ~ $100.23
            </span>
            <span className="font-normal">
              <span className="text-[#A8A8C7]">Balance: </span>
              <span className="text-[#85FF99]">2,135,291</span>
            </span>
          </div>
        </div>
        <button className="flex items-center justify-center m-auto p-1 bg-[#252734] text-[#A8A8C7] rounded-lg -my-3 z-10">
          <ICFrame className="w-4 aspect-square" />
        </button>
        <div className="flex flex-col gap-6 p-1 rounded-2xl border border-[#1C1E2C]">
          <div className="flex items-center gap-1">
            <InputCurrency
              className="flex-1 p-2 outline-none bg-transparent text-lg sm:text-2xl overflow-hidden grow disabled:text-[#868098]"
              placeholder="0"
              disabled
              value={102}
            />
            <SelectTokenModal />
          </div>
          <div className="flex items-center justify-between gap-2.5 p-2 rounded-xl">
            <span className="text-[#A8A8C7] text-2xs font-light">
              ~ $100.23
            </span>
            <span className="font-normal invisible">
              <span className="text-[#A8A8C7]">Balance: </span>
              <span className="text-[#A8A8C7]">0</span>
            </span>
          </div>
        </div>
      </div>

      <button className="relative overflow-hidden flex items-center justify-center p-4 rounded-2xl bg-iris-100 text-white font-cyberwayRiders text-[2rem]/none shadow-soft-3 shadow-[rgba(102,103,238,0.50)]">
        <span className="z-10">Swap</span>
        <img
          src={ImgSwap}
          alt="Swap"
          className="absolute w-[13.25rem] aspect-square"
        />
      </button>
    </div>
  );
}

export default SwapForm;

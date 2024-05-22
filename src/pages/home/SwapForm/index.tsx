import RefreshButton from "./RefreshButton";
import SlippageMenu from "./SlippageMenu";

function SwapForm() {
  return (
    <div className="flex flex-col gap-2 p-2 rounded-3xl w-[24rem] max-w-full">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-2">
          <RefreshButton />
          <SlippageMenu />
        </div>
      </div>
    </div>
  );
}

export default SwapForm;

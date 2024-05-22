import { ICRefresh } from "@/assets/icons";

function RefreshButton() {
  return (
    <button className="flex items-center justify-center p-2 rounded-lg bg-[#252734] text-[#A8A8C7]">
      <ICRefresh className="w-4 aspect-square" />
    </button>
  );
}

export default RefreshButton;

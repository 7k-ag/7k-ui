import { ICRefresh } from "@/assets/icons";
import tw from "@/utils/twmerge";

function RefreshButton({
  className,
  ...rest
}: JSX.IntrinsicElements["button"]) {
  return (
    <button
      className={tw(
        "flex items-center justify-center p-2 rounded-lg bg-[#252734] text-gray-100 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...rest}
    >
      <ICRefresh className="w-4 aspect-square" />
    </button>
  );
}

export default RefreshButton;

import { ICRefresh } from "@/assets/icons";

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

function RefreshButton({ onClick, disabled }: Props) {
  return (
    <button
      className="flex items-center justify-center p-2 rounded-lg bg-[#252734] text-[#A8A8C7] disabled:cursor-not-allowed disabled:opacity-60"
      onClick={onClick}
      disabled={disabled}
    >
      <ICRefresh className="w-4 aspect-square" />
    </button>
  );
}

export default RefreshButton;

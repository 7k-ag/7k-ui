import tw from "@/utils/twmerge";

interface Props {
  children?: string;
  active?: boolean;
  onClick?: () => void;
}

function SlippageButton({ children, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={tw(
        "flex items-center justify-center px-4 py-2 rounded-lg text-2xs text-gray-100 bg-black-50 border",
        active ? "border-white" : "border-black-50",
      )}
    >
      {children}
    </button>
  );
}

export default SlippageButton;

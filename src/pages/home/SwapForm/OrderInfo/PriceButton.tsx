import tw from "@/utils/twmerge";
import { memo } from "react";

interface Props {
  onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  children: React.ReactNode;
  className?: string;
}

function PriceButton({ onClick, children, className }: Props) {
  return (
    <a
      className={tw("cursor-pointer hover:text-[#85FF99]", className)}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

export default memo(PriceButton);

import type { WalletAccount } from "@mysten/wallet-standard";
import { ICWallet, ICChevronDown } from "@/assets/icons";
import { formatAddress } from "@mysten/sui.js/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useMemo, useState } from "react";
import WalletInfo from "./WalletInfo";
import { AnimatePresence, m } from "framer-motion";
import { useAtomValue } from "jotai";
import { isMobileAtom } from "@/atoms/layout.atom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/UI/Sheet";

type Props = {
  currentAccount: WalletAccount;
};

function AccountDropdown({ currentAccount }: Props) {
  const [openPopover, setOpenPopover] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);

  const isMobile = useAtomValue(isMobileAtom);

  const trigger = useMemo(
    () => (
      <button className="inline-flex gap-4 items-center justify-center px-4 py-2 h-10 rounded-xl bg-[#252734] text-white">
        <span className="inline-flex gap-2">
          <ICWallet className="w-4 aspect-square" />
          <span>{formatAddress(currentAccount.address)}</span>
        </span>
        <ICChevronDown className="w-4 aspect-square text-gray-100" />
      </button>
    ),
    [currentAccount],
  );

  if (isMobile) {
    return (
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <AnimatePresence>
          {openSheet && (
            <SheetContent
              forceMount
              side="bottom"
              onOpenChange={setOpenSheet}
              animation={false}
              className="bg-[#252734] gap-6 p-6"
            >
              <SheetHeader className="flex items-center justify-between gap-2 pb-0 border-none">
                <SheetTitle className="font-medium text-sm/none">
                  <span>{formatAddress(currentAccount.address)}</span>
                </SheetTitle>
                <button
                  className="flex items-center justify-center px-2 py-1 rounded-lg bg-[#1C1E2C] font-bold text-sm/none text-black-inverted-100"
                  onClick={() => setOpenSheet(false)}
                >
                  ESC
                </button>
              </SheetHeader>

              <WalletInfo currentAccount={currentAccount} />
            </SheetContent>
          )}
        </AnimatePresence>
      </Sheet>
    );
  }

  return (
    <PopoverPrimitive.Root open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Content
        forceMount
        side="bottom"
        align="end"
        sideOffset={8}
        className="z-10"
      >
        <AnimatePresence initial={false}>
          {openPopover && (
            <m.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                closed: {
                  scale: 0.5,
                  opacity: 0,
                  y: "-20%",
                },
                open: { scale: 1, opacity: 1, y: 0 },
              }}
              className="flex flex-col gap-6 p-6 w-[23.75rem] max-w-full rounded-3xl backdrop-blur-2xl bg-[#252734]/60"
            >
              <WalletInfo currentAccount={currentAccount} />
            </m.div>
          )}
        </AnimatePresence>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  );
}

export default AccountDropdown;

import type { WalletAccount } from "@mysten/wallet-standard";
import { ICWallet, ICChevronDown } from "@/assets/icons";
import { formatAddress } from "@mysten/sui.js/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useState } from "react";
import WalletInfo from "./WalletInfo";
import { AnimatePresence, m } from "framer-motion";

type Props = {
  currentAccount: WalletAccount;
};

function AccountDropdownMenu({ currentAccount }: Props) {
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <PopoverPrimitive.Root open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverPrimitive.Trigger asChild>
        <button className="inline-flex gap-4 items-center justify-center px-4 py-2 h-10 rounded-xl bg-[#252734] text-white">
          <span className="inline-flex gap-2">
            <ICWallet className="w-4 aspect-square" />
            <span>{formatAddress(currentAccount.address)}</span>
          </span>
          <ICChevronDown className="w-4 aspect-square text-gray-100" />
        </button>
      </PopoverPrimitive.Trigger>
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
              className="flex flex-col gap-6 p-6 w-[19.5rem] max-w-full rounded-3xl backdrop-blur-2xl bg-[#252734]/60"
            >
              <WalletInfo currentAccount={currentAccount} />
            </m.div>
          )}
        </AnimatePresence>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  );
}

export default AccountDropdownMenu;

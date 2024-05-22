import { ConnectModal, useCurrentAccount } from "@mysten/dapp-kit";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import AccountPopover from "./AccountPopover";
import { ICWallet } from "@/assets/icons";

type Props = {
  connectText?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function ConnectButton({
  connectText = "Connect Wallet",
  ...buttonProps
}: Props) {
  const currentAccount = useCurrentAccount();
  return currentAccount ? (
    <AccountPopover currentAccount={currentAccount} />
  ) : (
    <ConnectModal
      trigger={
        <button
          className="inline-flex gap-2 items-center justify-center px-4 py-2 h-10 rounded-xl bg-iris-100 text-white"
          {...buttonProps}
        >
          <ICWallet className="w-4 aspect-square" />
          <span>{connectText}</span>
        </button>
      }
    />
  );
}

export default ConnectButton;

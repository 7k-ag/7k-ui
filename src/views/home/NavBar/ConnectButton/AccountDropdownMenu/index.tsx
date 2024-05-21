import type { WalletAccount } from "@mysten/wallet-standard";
import { ICWallet, ICChevronDown } from "@/assets/icons";
import { useResolveSuiNSName } from "@mysten/dapp-kit";
import { formatAddress } from "@mysten/sui.js/utils";

type AccountDropdownMenuProps = {
  currentAccount: WalletAccount;
};

function AccountDropdownMenu({ currentAccount }: AccountDropdownMenuProps) {
  const { data: domain } = useResolveSuiNSName(
    currentAccount.label ? null : currentAccount.address,
  );

  return (
    <button className="inline-flex gap-4 items-center justify-center px-4 py-2 h-10 rounded-xl bg-[#252734] text-white">
      <span className="inline-flex gap-2">
        <ICWallet className="w-4 aspect-square" />
        <span>
          {currentAccount.label ??
            domain ??
            formatAddress(currentAccount.address)}
        </span>
      </span>
      <ICChevronDown className="w-4 aspect-square text-gray-100" />
    </button>
  );
}

export default AccountDropdownMenu;

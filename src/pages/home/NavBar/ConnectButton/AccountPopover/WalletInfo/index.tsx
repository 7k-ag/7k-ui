import { ICCopy, ICExport, ICPowerOff } from "@/assets/icons";
import CopyBtn from "@/components/CopyBtn";
import ExplorerAccountLink from "@/components/ExplorerLink/ExplorerAccountLink";
import { useDisconnectWallet } from "@mysten/dapp-kit";
import { formatAddress } from "@mysten/sui.js/utils";
import type { WalletAccount } from "@mysten/wallet-standard";
import TokenBalances from "./TokenBalances";

type Props = {
  currentAccount: WalletAccount;
};

function WalletInfo({ currentAccount }: Props) {
  const { address } = currentAccount;
  const { mutate: disconnectWallet } = useDisconnectWallet();

  return (
    <>
      <div className="flex items-center justify-between gap-2 text-white">
        <span className="text-sm">{formatAddress(address)}</span>
        <div className="flex items-center gap-2">
          <CopyBtn text={address} className="p-0.5">
            <ICCopy className="w-5 h-auto" />
          </CopyBtn>
          <ExplorerAccountLink account={address} className="p-0.5">
            <ICExport className="w-5 h-auto" />
          </ExplorerAccountLink>
          <button onClick={() => disconnectWallet()} className="p-0.5">
            <ICPowerOff className="w-5 h-auto" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 rounded-[0.625rem] bg-[#252734] text-gray-100">
        <div className="text-sm h-6">Balances</div>
        <TokenBalances />
      </div>
    </>
  );
}

export default WalletInfo;

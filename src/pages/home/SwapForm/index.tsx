import InputCurrency from "@/components/InputCurrency";
import RefreshButton from "./RefreshButton";
import SlippagePopover from "./SlippagePopover";
import SelectTokenModal from "./SelectTokenModal";
import { ICFrame, ICWallet } from "@/assets/icons";
import ImgSwap from "@/assets/images/swap.png";
import { ConnectModal, useCurrentAccount } from "@mysten/dapp-kit";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import {
  agAmountInAtom,
  agTokenInAtom,
  agTokenOutAtom,
} from "@/atoms/aggregator.atom";
import TextAmt from "@/components/TextAmt";
import BigNumber from "bignumber.js";
import tw from "@/utils/twmerge";
import useAccountBalances from "@/hooks/accounts/useAccountBalances";
import { formatBalance, formatRawBalance } from "@/utils/number";
import { checkIsSui } from "@/utils/token";
import { MINIMUM_SUI_AMT } from "@/constants/amount";
// import { SUI_TOKEN } from "@/constants/tokens/token";
import useAgSor from "@/hooks/aggregator/useAgSor";
import useTokenMetadata from "@/hooks/tokens/useTokenMetadata";
import { Checkbox } from "@/components/UI/Checkbox";

function SwapForm() {
  const [tokenIn, setTokenIn] = useAtom(agTokenInAtom);
  const [tokenOut, setTokenOut] = useAtom(agTokenOutAtom);
  const [amountIn, setAmountIn] = useAtom(agAmountInAtom);

  const tokenInId = useMemo(() => tokenIn?.type, [tokenIn]);
  const tokenOutId = useMemo(() => tokenOut?.type, [tokenOut]);

  const enabledAgSor = useMemo(() => {
    return (
      !!tokenInId &&
      !!tokenOutId &&
      tokenInId !== tokenOutId &&
      !!amountIn &&
      new BigNumber(amountIn).gt(0)
    );
  }, [tokenInId, tokenOutId, amountIn]);

  const { data: agSorData, refetch: refetchAgSor } = useAgSor({
    tokenInId: tokenInId,
    tokenOutId: tokenOutId,
    amountIn: amountIn
      ? formatRawBalance(amountIn, tokenIn?.decimals).toString()
      : "",
    enabled: enabledAgSor,
    refetchInterval: 6000,
  });

  const { obj: accountBalancesObj } = useAccountBalances();

  // const suiBalance = useMemo(() => {
  //   if (accountBalancesObj?.[SUI_TOKEN.type]) {
  //     return new BigNumber(
  //       formatBalance(accountBalancesObj[SUI_TOKEN.type], SUI_TOKEN.decimals),
  //     );
  //   }
  //   return new BigNumber(0);
  // }, [accountBalancesObj, tokenInId]);

  const tokenInBalance = useMemo(() => {
    if (accountBalancesObj?.[tokenInId]) {
      return new BigNumber(
        formatBalance(accountBalancesObj[tokenInId], tokenIn.decimals),
      );
    }
    return new BigNumber(0);
  }, [accountBalancesObj, tokenInId]);

  const amountOut = useMemo(() => {
    return agSorData?.returnAmount || "0";
  }, [agSorData]);

  const { data: tokenInData, isLoading: isLoadingTokenInData } =
    useTokenMetadata(tokenInId);
  const { data: tokenOutData, isLoading: isLoadingTokenOutData } =
    useTokenMetadata(tokenOutId);

  const tokenInPrice = useMemo(() => {
    return tokenInData?.tokenPrice || 0;
  }, [tokenInData]);
  const tokenOutPrice = useMemo(() => {
    return tokenOutData?.tokenPrice || 0;
  }, [tokenOutData]);

  const amountInUsdValue = useMemo(() => {
    if (!amountIn) {
      return new BigNumber(0);
    }
    return new BigNumber(amountIn).multipliedBy(tokenInPrice);
  }, [tokenIn, tokenOut, amountIn]);
  const amountOutUsdValue = useMemo(() => {
    if (!agSorData?.returnAmount) {
      return new BigNumber(0);
    }
    return new BigNumber(agSorData.returnAmount).multipliedBy(tokenOutPrice);
  }, [tokenIn, tokenOut, agSorData]);

  const handleClickBalance = useCallback(() => {
    if (checkIsSui(tokenInId)) {
      setAmountIn(tokenInBalance.minus(MINIMUM_SUI_AMT).toString());
      return;
    }
    setAmountIn(tokenInBalance.toString());
  }, [tokenInBalance]);

  const handleRevertTokens = useCallback(() => {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
    setAmountIn("");
  }, [tokenIn, tokenOut]);

  const currentAccount = useCurrentAccount();
  // const isInsufficientSuiBalance = useMemo(() => {
  //   return suiBalance.isLessThanOrEqualTo(0);
  // }, [suiBalance]);
  const isInsufficientBalance = useMemo(() => {
    if (!amountIn) {
      return false;
    }
    return tokenInBalance.isLessThan(amountIn);
  }, [amountIn, tokenInBalance]);
  const isPriceImpactTooHigh = useMemo(() => {
    return (agSorData?.priceImpact || 0) * 100 > 30;
  }, [agSorData]);

  const [isConfirmSwapAnyway, setIsConfirmSwapAnyway] = useState(false);
  useEffect(() => {
    if (isPriceImpactTooHigh) setIsConfirmSwapAnyway(false);
  }, [isPriceImpactTooHigh]);
  const isInvalidAmountOut = useMemo(() => {
    return new BigNumber(amountOut).lte(0);
  }, [amountOut]);

  const handleSwap = useCallback(() => {
    console.log("Swap", tokenIn, tokenOut, amountIn);
  }, [tokenIn, tokenOut, amountIn]);

  const actionButton = useMemo(() => {
    if (!currentAccount) {
      return (
        <ConnectModal
          trigger={
            <button className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-[#343B51] h-[4.25rem] text-white hover:bg-[#404862] active:bg-[#31384F]">
              <ICWallet className="w-4 aspect-square" />
              <span className="text-lg/none">Connect Wallet</span>
            </button>
          }
        />
      );
    }

    // if (isInsufficientSuiBalance) {
    //   return (
    //     <button
    //       className="flex items-center justify-center p-4 rounded-2xl bg-[#343B51] h-[4.25rem] text-white disabled:cursor-not-allowed disabled:opacity-60"
    //       disabled
    //     >
    //       <span className="text-lg/none">Insufficient SUI balance</span>
    //     </button>
    //   );
    // }

    if (!amountIn || !tokenIn) {
      return (
        <button
          className="flex items-center justify-center p-4 rounded-2xl bg-[#343B51] h-[4.25rem] text-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled
        >
          <span className="text-lg/none">Enter an amount</span>
        </button>
      );
    }

    if (isInsufficientBalance) {
      return (
        <button
          className="flex items-center justify-center p-4 rounded-2xl bg-[#343B51] h-[4.25rem] text-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled
        >
          <span className="text-lg/none">
            Insufficient {tokenIn.symbol} balance
          </span>
        </button>
      );
    }

    if (isPriceImpactTooHigh) {
      const confirmElement = (
        <div className="flex items-center gap-2.5">
          <div onClick={(e) => e.stopPropagation()}>
            <Checkbox
              checked={isConfirmSwapAnyway}
              onCheckedChange={(checked) =>
                setIsConfirmSwapAnyway(checked as boolean)
              }
              className="border-white text-white"
              boxClassName="border-white group-hover:border-white group-data-[state=checked]:bg-transparent group-data-[state=checked]:border-white"
            />
          </div>
          <span className="text-lg/none">Yes, I still want to swap</span>
        </div>
      );

      if (!isConfirmSwapAnyway) {
        return (
          <div className="flex items-center justify-center p-4 rounded-2xl bg-[#343B51] h-[4.25rem] text-white">
            {confirmElement}
          </div>
        );
      }

      return (
        <a
          className="flex items-center justify-center p-4 rounded-2xl bg-[#F24DB0] h-[4.25rem] text-white cursor-pointer hover:bg-[#FD65C0] hover:shadow-soft-3 hover:shadow-[#F24DB0]"
          type="button"
          onClick={handleSwap}
        >
          {confirmElement}
        </a>
      );
    }

    return (
      <button
        className="relative overflow-hidden flex items-center justify-center p-4 rounded-2xl bg-iris-100 text-white font-cyberwayRiders text-[2rem]/none shadow-soft-3 shadow-[rgba(102,103,238,0.50)] hover:bg-[#6667EE] hover:shadow-[#6667EE] active:bg-[#3E40E3] active:shadow-none"
        onClick={handleSwap}
        disabled={isInvalidAmountOut}
      >
        <span className="z-10">Swap</span>
        <img
          src={ImgSwap}
          alt="Swap"
          className="absolute w-[13.25rem] aspect-square"
        />
      </button>
    );
  }, [
    currentAccount,
    // isInsufficientSuiBalance,
    amountIn,
    tokenIn,
    isInsufficientBalance,
    isPriceImpactTooHigh,
    isConfirmSwapAnyway,
    isInvalidAmountOut,
  ]);

  return (
    <div className="flex flex-col gap-2 p-2 rounded-3xl w-[24rem] max-w-full">
      <div className="flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-4 px-2">
          <span className="text-sm/none font-semibold">Swap</span>
        </div>
        <div className="flex items-center gap-2">
          <RefreshButton onClick={refetchAgSor} disabled={!enabledAgSor} />
          <SlippagePopover />
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <div className="flex flex-col gap-6 p-1 rounded-2xl bg-[#1C1E2C]">
          <div className="flex items-center gap-1">
            <InputCurrency
              className="flex-1 p-2 outline-none bg-transparent text-lg sm:text-2xl overflow-hidden grow"
              placeholder="0"
              value={amountIn}
              onChange={(e) => setAmountIn(e.target.value)}
            />
            <SelectTokenModal
              token={tokenIn}
              setToken={(token) => {
                setTokenIn(token);
                setAmountIn("");
              }}
              pivotTokenId={tokenOutId}
              accountBalancesObj={accountBalancesObj}
            />
          </div>
          <div className="flex items-center justify-between gap-2.5 p-2 rounded-xl">
            <TextAmt
              number={amountInUsdValue}
              className={tw(
                "text-[#A8A8C7] text-2xs font-light",
                (!amountIn || isLoadingTokenInData) && "invisible",
              )}
              prefix="~ $"
            />
            {tokenInBalance.isGreaterThan(0) ? (
              <button className="font-normal" onClick={handleClickBalance}>
                <span className="text-[#A8A8C7]">Balance: </span>
                <TextAmt number={tokenInBalance} className="text-[#85FF99]" />
              </button>
            ) : (
              <span className="font-normal">
                <span className="text-[#A8A8C7]">Balance: </span>
                <span className="text-[#A8A8C7]">0</span>
              </span>
            )}
          </div>
        </div>

        <button
          className="flex items-center justify-center m-auto p-1 bg-[#252734] text-[#A8A8C7] rounded-lg -my-3 z-[2]"
          onClick={handleRevertTokens}
        >
          <ICFrame className="w-4 aspect-square" />
        </button>

        <div className="flex flex-col gap-6 p-1 rounded-2xl border border-[#1C1E2C]">
          <div className="flex items-center gap-1">
            <InputCurrency
              className="flex-1 p-2 outline-none bg-transparent text-lg sm:text-2xl overflow-hidden grow disabled:text-[#868098]"
              placeholder="0"
              disabled
              value={amountOut}
            />
            <SelectTokenModal
              token={tokenOut}
              setToken={setTokenOut}
              pivotTokenId={tokenInId}
              accountBalancesObj={accountBalancesObj}
            />
          </div>
          <div className="flex items-center justify-between gap-2.5 p-2 rounded-xl">
            <TextAmt
              number={amountOutUsdValue}
              className={tw(
                "text-[#A8A8C7] text-2xs font-light",
                isLoadingTokenOutData && "invisible",
              )}
              prefix="~ $"
            />
            <span className="font-normal invisible">
              <span className="text-[#A8A8C7]">Balance: </span>
              <span className="text-[#A8A8C7]">0</span>
            </span>
          </div>
        </div>
      </div>

      {actionButton}
    </div>
  );
}

export default SwapForm;

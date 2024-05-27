import InputCurrency from "@/components/InputCurrency";
import RefreshButton from "./RefreshButton";
import SlippageDropdown from "./SlippageDropdown";
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
import OrderInfo from "./OrderInfo";
import { SorSwapResponse } from "@/types/swapInfo";
import { useDebounce } from "use-debounce";

const MOCK_AG_SOR_DATA: SorSwapResponse = {
  tokenAddresses: [
    "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI",
    "0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5::navx::NAVX",
    "0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS",
    "0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN",
    "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
  ],
  swaps: [
    {
      poolId:
        "0x0254747f5ca059a1972cd7f6016485d51392a3fde608107b93bbaebea550f703",
      assetInIndex: 0,
      assetOutIndex: 1,
      amount: "6670391650",
      returnAmount: "55874364188",
      assetIn:
        "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI",
      assetOut:
        "0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5::navx::NAVX",
      functionName: "delegate",
      arguments: [],
    },
    {
      poolId:
        "0x3ec8401520022aac67935188eb1f82c13cbbc949ab04692e5b62445d89b61c9f",
      assetInIndex: 1,
      assetOutIndex: 2,
      amount: "0",
      returnAmount: "64361660195",
      assetIn:
        "0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5::navx::NAVX",
      assetOut:
        "0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS",
      functionName: "delegate",
      arguments: [],
    },
    {
      poolId:
        "0x81f6bdb7f443b2a55de8554d2d694b7666069a481526a1ff0c91775265ac0fc1",
      assetInIndex: 2,
      assetOutIndex: 3,
      amount: "0",
      returnAmount: "178607",
      assetIn:
        "0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS",
      assetOut:
        "0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN",
      functionName: "delegate",
      arguments: [],
    },
    {
      poolId:
        "0x43ca1a6de20d7feabcaa460ac3798a6fdc754d3a83b49dff93221612c1370dcc",
      assetInIndex: 3,
      assetOutIndex: 4,
      amount: "0",
      returnAmount: "7003804",
      assetIn:
        "0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN",
      assetOut:
        "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
      functionName: "delegate",
      arguments: [],
    },
  ],
  swapAmount: "6.67039165",
  returnAmount: "7.003804",
  swapAmountWithDecimal: "6670391650",
  returnAmountWithDecimal: "7003804",
  tokenIn:
    "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI",
  tokenOut:
    "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
  marketSp: "0.961114817412351909",
  routes: [
    {
      hops: [
        {
          poolId:
            "0x0254747f5ca059a1972cd7f6016485d51392a3fde608107b93bbaebea550f703",
          pool: {
            allTokens: [
              {
                address:
                  "0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5::navx::NAVX",
                decimal: 9,
              },
              {
                address:
                  "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI",
                decimal: 9,
              },
            ],
            type: "cetusv2",
          },
          tokenIn:
            "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI",
          tokenInAmount: "6.67039165",
          tokenOut:
            "0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5::navx::NAVX",
          tokenOutAmount: "55.874364188",
        },
        {
          poolId:
            "0x3ec8401520022aac67935188eb1f82c13cbbc949ab04692e5b62445d89b61c9f",
          pool: {
            allTokens: [
              {
                address:
                  "0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5::navx::NAVX",
                decimal: 9,
              },
              {
                address:
                  "0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS",
                decimal: 9,
              },
            ],
            type: "cetusv2",
          },
          tokenIn:
            "0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5::navx::NAVX",
          tokenInAmount: "55.874364188",
          tokenOut:
            "0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS",
          tokenOutAmount: "64.361660195",
        },
        {
          poolId:
            "0x81f6bdb7f443b2a55de8554d2d694b7666069a481526a1ff0c91775265ac0fc1",
          pool: {
            allTokens: [
              {
                address:
                  "0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN",
                decimal: 8,
              },
              {
                address:
                  "0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS",
                decimal: 9,
              },
            ],
            type: "cetusv2",
          },
          tokenIn:
            "0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS",
          tokenInAmount: "64.361660195",
          tokenOut:
            "0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN",
          tokenOutAmount: "0.00178607",
        },
        {
          poolId:
            "0x43ca1a6de20d7feabcaa460ac3798a6fdc754d3a83b49dff93221612c1370dcc",
          pool: {
            allTokens: [
              {
                address:
                  "0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN",
                decimal: 8,
              },
              {
                address:
                  "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
                decimal: 6,
              },
            ],
            type: "kriya",
          },
          tokenIn:
            "0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN",
          tokenInAmount: "0.00178607",
          tokenOut:
            "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
          tokenOutAmount: "7.003804",
        },
      ],
      tokenIn:
        "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI",
      tokenInAmount: "6.67039165",
      tokenOut:
        "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
      tokenOutAmount: "7.003804",
    },
  ],
  effectivePrice: 0.9523955339127137,
  effectivePriceReserved: 1.0499839241073647,
  priceImpact: 0.0,
  warning: "TokenNotHasPrice",
};

function SwapForm() {
  const [tokenIn, setTokenIn] = useAtom(agTokenInAtom);
  const [tokenOut, setTokenOut] = useAtom(agTokenOutAtom);
  const [amountIn, setAmountIn] = useAtom(agAmountInAtom);
  const [amountInDebounce] = useDebounce(amountIn, 500);

  const tokenInId = useMemo(() => tokenIn?.type, [tokenIn]);
  const tokenOutId = useMemo(() => tokenOut?.type, [tokenOut]);

  const enabledAgSor = useMemo(() => {
    return (
      !!tokenInId &&
      !!tokenOutId &&
      tokenInId !== tokenOutId &&
      !!amountInDebounce &&
      new BigNumber(amountInDebounce).gt(0)
    );
  }, [tokenInId, tokenOutId, amountInDebounce]);

  const { data: agSorData, refetch: refetchAgSor } = useAgSor({
    tokenInId: tokenInId,
    tokenOutId: tokenOutId,
    amountIn: amountInDebounce
      ? formatRawBalance(amountInDebounce, tokenIn?.decimals).toString()
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
  }, [accountBalancesObj, tokenInId, tokenIn.decimals]);

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
  }, [amountIn, tokenInPrice]);
  const amountOutUsdValue = useMemo(() => {
    if (!agSorData?.returnAmount) {
      return new BigNumber(0);
    }
    return new BigNumber(agSorData.returnAmount).multipliedBy(tokenOutPrice);
  }, [agSorData, tokenOutPrice]);

  const handleClickBalance = useCallback(() => {
    if (checkIsSui(tokenInId)) {
      setAmountIn(tokenInBalance.minus(MINIMUM_SUI_AMT).toString());
      return;
    }
    setAmountIn(tokenInBalance.toString());
  }, [tokenInBalance, setAmountIn, tokenInId]);

  const handleRevertTokens = useCallback(() => {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
    setAmountIn("");
  }, [tokenIn, tokenOut, setAmountIn, setTokenIn, setTokenOut]);

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
        className="relative overflow-hidden flex items-center justify-center p-4 rounded-2xl bg-iris-100 text-white font-cyberwayRiders text-[2rem]/none shadow-soft-3 shadow-[rgba(102,103,238,0.50)] hover:bg-[#6667EE] hover:shadow-[#6667EE] active:bg-[#3E40E3] active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
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
    handleSwap,
  ]);

  return (
    <div className="flex flex-col gap-2 p-2 rounded-3xl max-w-[24rem] w-full">
      <div className="flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-4 px-2">
          <span className="text-sm/none font-semibold">Swap</span>
        </div>
        <div className="flex items-center gap-2">
          <RefreshButton onClick={refetchAgSor} disabled={!enabledAgSor} />
          <SlippageDropdown />
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
                "text-gray-100 text-2xs font-light",
                (!amountIn || isLoadingTokenInData) && "invisible",
              )}
              prefix="~ $"
            />
            {tokenInBalance.isGreaterThan(0) ? (
              <button className="font-normal" onClick={handleClickBalance}>
                <span className="text-gray-100">Balance: </span>
                <TextAmt number={tokenInBalance} className="text-[#85FF99]" />
              </button>
            ) : (
              <span className="font-normal">
                <span className="text-gray-100">Balance: </span>
                <span className="text-gray-100">0</span>
              </span>
            )}
          </div>
        </div>

        <button
          className="flex items-center justify-center m-auto p-1 bg-[#252734] text-gray-100 rounded-lg -my-3 z-[2]"
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
                "text-gray-100 text-2xs font-light",
                isLoadingTokenOutData && "invisible",
              )}
              prefix="~ $"
            />
            <span className="font-normal invisible">
              <span className="text-gray-100">Balance: </span>
              <span className="text-gray-100">0</span>
            </span>
          </div>
        </div>
      </div>

      {actionButton}

      <OrderInfo
        tokenIn={tokenIn}
        tokenOut={tokenOut}
        // agSorData={agSorData}
        agSorData={agSorData || MOCK_AG_SOR_DATA}
      />
    </div>
  );
}

export default SwapForm;

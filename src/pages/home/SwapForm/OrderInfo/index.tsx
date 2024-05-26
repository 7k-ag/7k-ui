import { StaticToken } from "@/constants/tokens/staticTokens";
import { SorSwapResponse } from "@/types/swapInfo";
import { useCallback, useMemo, useState } from "react";
import Accordion, {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/Accordion";
import { ICInfoCircle } from "@/assets/icons";
import TextAmt from "@/components/TextAmt";
import tw from "@/utils/twmerge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/Tooltip";
import { Percent } from "@bicarus/utils";
import { useAtomValue } from "jotai";
import { agSlippageAtom } from "@/atoms/aggregator.atom";
import OrderItem from "./OrderItem";
import PriceButton from "./PriceButton";

type PriceMode = "in-out" | "out-in";

interface Props {
  tokenIn: StaticToken;
  tokenOut: StaticToken;
  agSorData: SorSwapResponse | undefined;
}

function OrderInfo({ tokenIn, tokenOut, agSorData }: Props) {
  const [openAccordion, setOpenAccordion] = useState("");
  const [priceMode, setPriceMode] = useState<PriceMode>("in-out");

  const amountOut = useMemo(() => {
    return agSorData?.returnAmount || 0;
  }, [agSorData?.returnAmount]);

  const priceImpactPct = useMemo(() => {
    return (agSorData?.priceImpact || 0) * 100;
  }, [agSorData?.priceImpact]);

  const slippage = useAtomValue(agSlippageAtom);
  const minimumReceived = useMemo(() => {
    return new Percent(100, 100).subtract(slippage).multiply(amountOut)
      .quotient;
  }, [amountOut, slippage]);

  const networkFee = useMemo(() => {
    return 0;
  }, []);

  const isPriceImpactTooHigh = useMemo(() => {
    return (agSorData?.priceImpact || 0) * 100 > 30;
  }, [agSorData]);

  const handleChangePriceMode = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.stopPropagation();
      setPriceMode((prev) => (prev === "in-out" ? "out-in" : "in-out"));
    },
    [],
  );

  const priceElement = useMemo(() => {
    return priceMode === "in-out" ? (
      <span>
        1 {tokenIn.symbol} = <TextAmt number={agSorData?.effectivePrice} />{" "}
        {tokenOut.symbol}
      </span>
    ) : (
      <span>
        1 {tokenOut.symbol} ={" "}
        <TextAmt number={agSorData?.effectivePriceReserved} /> {tokenIn.symbol}
      </span>
    );
  }, [
    priceMode,
    tokenIn.symbol,
    tokenOut.symbol,
    agSorData?.effectivePrice,
    agSorData?.effectivePriceReserved,
  ]);

  const trigger = useMemo(() => {
    if (openAccordion) {
      return (
        <div className="font-semibold text-white text-lg/none">
          Swap details
        </div>
      );
    }

    if (isPriceImpactTooHigh) {
      return (
        <div className="flex items-center gap-2">
          <ICInfoCircle className="w-3 aspect-square" />
          <span>
            <span className="text-white text-xs/none font-normal">
              Price impact warning -{" "}
            </span>
            <TextAmt
              number={priceImpactPct}
              suffix="%"
              className="text-xs/none text-[#F24DB0] font-bold"
              notation="standard"
              displayThreshold={0}
            />
          </span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <ICInfoCircle className="w-3 aspect-square" />
        <PriceButton
          className="text-white text-xs/none font-normal"
          onClick={handleChangePriceMode}
        >
          {priceElement}
        </PriceButton>
      </div>
    );
  }, [openAccordion, priceElement, handleChangePriceMode]);

  if (!agSorData) {
    return null;
  }

  return (
    <Accordion
      type="single"
      collapsible
      value={openAccordion}
      onValueChange={(val) => setOpenAccordion(val)}
    >
      <AccordionItem
        value="default"
        className={tw(
          "border",
          isPriceImpactTooHigh
            ? "border-[#F24DB0] bg-[#F24DB0]/20"
            : "border-[#343B51] bg-[#343B51]",
        )}
      >
        <AccordionTrigger
          className={tw(openAccordion ? "px-6 py-4" : "p-4")}
          iconClassName="w-3 aspect-square"
        >
          {trigger}
        </AccordionTrigger>
        <div className="transition-all duration-300 ease-in-out">
          {openAccordion && (
            <AccordionContent forceMount collapsedAnimate={false}>
              <div className="flex flex-col gap-4 px-6 pb-6 pt-0">
                <div className="h-px bg-[#707585]" />
                <OrderItem
                  label={
                    <span
                      className={tw(isPriceImpactTooHigh && "text-[#F24DB0]")}
                    >
                      Price
                    </span>
                  }
                  value={
                    <PriceButton
                      onClick={handleChangePriceMode}
                      className={tw(isPriceImpactTooHigh && "text-[#F24DB0]")}
                    >
                      {priceElement}
                    </PriceButton>
                  }
                />
                <OrderItem
                  label="Expected Output"
                  value={
                    <span>
                      <TextAmt number={amountOut} /> {tokenOut.symbol}
                    </span>
                  }
                />
                <OrderItem
                  label={
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="underline">
                          Price Impact
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[14rem]">
                          Making a trade shifts the ratio of tokens in the
                          pools, causing this change in price per token.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  }
                  value={
                    <TextAmt
                      number={priceImpactPct}
                      suffix="%"
                      className="text-[#FB431A]"
                      notation="standard"
                      displayThreshold={0}
                    />
                  }
                />
                <div className="h-px bg-[#707585]" />
                <OrderItem
                  label={
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="underline">
                          Minimum Received
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[15.75rem]">
                          The minimum amount you would get after subtracting
                          fees and maximum slippage being reached.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  }
                  value={
                    <span className="text-[#30EE00]">
                      <TextAmt number={minimumReceived} /> {tokenOut.symbol}
                    </span>
                  }
                />
                <OrderItem
                  label="Network Fee"
                  value={
                    <span>
                      <TextAmt number={networkFee} prefix="$" />
                    </span>
                  }
                />
              </div>
            </AccordionContent>
          )}
        </div>
      </AccordionItem>
    </Accordion>
  );
}

export default OrderInfo;

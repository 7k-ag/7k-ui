import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useAtom } from "jotai";
import { agSlippageAtom } from "@/atoms/aggregator.atom";
import useInputNumberString from "@/hooks/useInputNumberString";
import { Percent } from "@bicarus/utils";
import SlippageButton from "./SlippageButton";
import InputCurrency from "@/components/InputCurrency";
import BigNumber from "bignumber.js";
import TextAmt from "@/components/TextAmt";

function SlippageMenu() {
  const [openPopover, setOpenPopover] = useState(false);
  const [slippage, setSlippage] = useAtom(agSlippageAtom);
  const [displaySlip, setDisplaySlip] = useInputNumberString(
    slippage.toFixed(2),
    2,
  );
  const [tempSlippage, setTempSlippage] = useState<Percent>(slippage);
  const [tempDisplaySlip, setTempDisplaySlip] = useInputNumberString(
    slippage.toFixed(2),
    2,
  );

  const handleConfirm = () => {
    setSlippage(tempSlippage);
    setDisplaySlip(tempSlippage.toFixed(2));
    setOpenPopover(false);
  };

  return (
    <PopoverPrimitive.Root open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverPrimitive.Trigger asChild>
        <button className="flex items-center gap-2 p-2 pl-4 border border-[#373947] rounded-xl">
          <span>Slippage</span>
          <TextAmt
            number={displaySlip}
            className="flex items-center justify-center w-9 p-1 rounded-lg bg-[#373947]"
            suffix="%"
          />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Content
        forceMount
        side="bottom"
        align="start"
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
              className="flex flex-col gap-4 p-4 max-w-full rounded-3xl backdrop-blur-2xl bg-[#252734]/60"
            >
              <div className="text-sm">Slippage</div>
              <div className="flex items-center gap-1">
                <SlippageButton
                  active={tempSlippage.equalTo(new Percent(100, 100_000))}
                  onClick={() => {
                    setTempSlippage(new Percent(100, 100_000));
                    setTempDisplaySlip("0.1");
                  }}
                >
                  0.1%
                </SlippageButton>
                <SlippageButton
                  active={tempSlippage.equalTo(new Percent(500, 100_000))}
                  onClick={() => {
                    setTempSlippage(new Percent(500, 100_000));
                    setTempDisplaySlip("0.5");
                  }}
                >
                  0.5%
                </SlippageButton>
                <SlippageButton
                  active={tempSlippage.equalTo(new Percent(1_000, 100_000))}
                  onClick={() => {
                    setTempSlippage(new Percent(1_000, 100_000));
                    setTempDisplaySlip("1");
                  }}
                >
                  1%
                </SlippageButton>
                <div className="flex items-center h-8 p-2 gap-1 bg-[#0B0D14] border border-[#373947] rounded-lg">
                  <InputCurrency
                    className="bg-transparent outline-none w-[2.8125rem]"
                    placeholder="..."
                    value={tempDisplaySlip}
                    decimals={2}
                    onChange={(e) => {
                      const raw = e.target.value;
                      setTempDisplaySlip(raw);
                      if (raw) {
                        if (raw === ".") setTempSlippage(new Percent(0));
                        else {
                          const val = new BigNumber(raw).div(100).toNumber();
                          const valid = Math.min(Math.max(val, 0), 1);
                          if (val !== valid) {
                            setTempDisplaySlip(
                              new BigNumber(valid)
                                .multipliedBy(100)
                                .toString(10),
                            );
                          }
                          const [numerator, denominator] =
                            valid === 0
                              ? [0, 100_000]
                              : new BigNumber(valid).toFraction();
                          setTempSlippage(new Percent(numerator, denominator));
                        }
                      } else {
                        setTempSlippage(new Percent(1_000, 100_000));
                      }
                    }}
                  />
                  <div>%</div>
                </div>
              </div>
              <button
                className="flex items-center justify-center px-4 py-2 rounded-xl bg-iris-100 font-cyberwayRiders font-normal text-lg disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!tempSlippage.greaterThan(0)}
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </m.div>
          )}
        </AnimatePresence>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  );
}

export default SlippageMenu;

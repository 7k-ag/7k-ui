import { isMobileAtom } from "@/atoms/layout.atom";
import { useAtomValue } from "jotai";
import { AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContentDefault,
  DialogTrigger,
} from "@/components/UI/Dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/UI/Sheet";
import { useMemo, useState } from "react";
import Avatar from "@/components/Avatar";
import { ICChevronDown } from "@/assets/icons";

function SelectTokenModal() {
  const isMobile = useAtomValue(isMobileAtom);
  const [open, setOpen] = useState(false);

  const trigger = useMemo(
    () => (
      <button
        className="flex items-center gap-2 p-3 rounded-xl"
        onClick={() => setOpen(true)}
      >
        <Avatar
          src="https://strapi-dev.scand.app/uploads/sui_c07df05f00.png"
          alt="SUI"
          className="w-5 aspect-square"
        />
        <span className="text-sm/none">SUI</span>
        <ICChevronDown className="w-4 aspect-square text-gray-100" />
      </button>
    ),
    [],
  );

  const content = useMemo(
    () => (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          Select a token
        </div>
        <div className="flex items-center gap-2 text-sm text-[#A8A8C7]">
          Search for a token by name, symbol, or address
        </div>
        <div className="flex items-center gap-2 text-sm text-[#A8A8C7]">
          Or select a token from the list below
        </div>
      </div>
    ),
    [],
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <AnimatePresence>
          {open && (
            <SheetContent
              forceMount
              side="bottom"
              onOpenChange={setOpen}
              animation={false}
            >
              {content}
            </SheetContent>
          )}
        </AnimatePresence>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <AnimatePresence>
        {open && (
          <DialogContentDefault
            forceMount
            className="shadow-none flex items-start gap-4 p-0 max-w-full md:w-[27.5rem]"
          >
            <div className="flex flex-col p-8 gap-8 rounded-[2rem] bg-skin-card flex-1 shadow-soft-3  shadow-skin-alt dark:shadow-skin-alt/10">
              {content}
            </div>
          </DialogContentDefault>
        )}
      </AnimatePresence>
    </Dialog>
  );
}

export default SelectTokenModal;

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
import { ICChevronDown, ICSearch } from "@/assets/icons";
import { useDebounce } from "use-debounce";
import useAgTokens from "@/hooks/aggregator/useAgTokens";
import { StaticToken } from "@/constants/tokens/staticTokens";
import Input from "@/components/UI/Input";
import { TokenBalance } from "@/types/token";
import { DEFAULT_AG_TOKENS } from "@/constants/tokens/defaultAgTokens";
import uniqBy from "lodash/uniqBy";
import { VList } from "virtua";
import TokenItem from "./TokenItem";
import useSearchTokens from "@/hooks/tokens/useSearchTokens";
import { Skeleton } from "@/components/UI/Skeleton";
import Repeat from "@/components/UI/Repeat";
import EmptyData from "@/components/EmptyData/EmptyData";
import { getStaticTokenById } from "@/utils/token";

type Props = {
  token: StaticToken | undefined;
  setToken: (token: StaticToken) => void;
  pivotTokenId: string;
  accountBalancesObj: Record<string, string> | undefined;
};

function SelectTokenModal({
  token,
  setToken,
  pivotTokenId,
  accountBalancesObj,
}: Props) {
  const isMobile = useAtomValue(isMobileAtom);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearchTerm] = useDebounce(searchTerm, 200);
  const { set: supportedTokenSet } = useAgTokens();

  const { data: searchedTokens, isLoading } =
    useSearchTokens(debounceSearchTerm);

  const tokenBalances: TokenBalance[] = useMemo(() => {
    if (!debounceSearchTerm) {
      // default tokens
      let tokens = [...DEFAULT_AG_TOKENS];

      // tokens from account balances
      if (accountBalancesObj) {
        Object.keys(accountBalancesObj).forEach((coinType) => {
          const token = getStaticTokenById(coinType);
          if (supportedTokenSet.has(coinType) && token) {
            tokens.push(token);
          }
        });
      }
      // remove pivot token
      tokens = tokens.filter((token) => token.type !== pivotTokenId);

      // format token balances
      const tokenBalances: TokenBalance[] = tokens
        .map((token) => ({
          token,
          balance: accountBalancesObj?.[token.type] || "0",
        }))
        .sort((a, b) => {
          return Number(b.balance) - Number(a.balance);
        });
      return uniqBy(uniqBy(tokenBalances, "token.type"), "token.symbol");
    }

    return searchedTokens
      .filter(
        (token) =>
          supportedTokenSet.has(token.type) && token.type !== pivotTokenId,
      )
      .map((token) => ({
        token,
        balance: accountBalancesObj?.[token.type] || "0",
      }))
      .sort((a, b) => {
        return Number(b.balance) - Number(a.balance);
      });
  }, [debounceSearchTerm, accountBalancesObj, supportedTokenSet]);

  const trigger = useMemo(
    () => (
      <button
        className="flex items-center gap-2 p-3 rounded-xl"
        onClick={() => setOpen(true)}
      >
        <Avatar
          src={token?.iconUrl || ""}
          alt={token?.symbol}
          className="w-5 aspect-square"
        />
        <span className="text-sm/none">{token?.symbol}</span>
        <ICChevronDown className="w-4 aspect-square text-gray-100" />
      </button>
    ),
    [token],
  );

  const tokenList = useMemo(() => {
    if (searchTerm && isLoading) {
      return (
        <VList style={{ height: 320 }} className="vlist">
          <Repeat count={10}>
            <Skeleton className="h-13 p-4 bg-[#1C1E2C] rounded-xl text-sm/normal mb-1" />
          </Repeat>
        </VList>
      );
    }

    if (!tokenBalances.length) {
      return <EmptyData title="No coins found" />;
    }

    return (
      <VList style={{ height: 320 }} className="vlist">
        {tokenBalances.map((tokenBalance) => (
          <TokenItem
            key={tokenBalance.token.type}
            item={tokenBalance}
            onClick={(tokenBalance) => {
              setToken(tokenBalance.token);
              setOpen(false);
            }}
          />
        ))}
      </VList>
    );
  }, [searchTerm, isLoading, tokenBalances]);

  const content = useMemo(
    () => (
      <div className="flex-1 flex flex-col gap-4 p-1 rounded-2xl bg-[#252734] border border-[#373947] backdrop-blur-md shadow-soft-3 shadow-skin-alt dark:shadow-skin-alt/10">
        <Input
          placeholder="Search coin name, type or package id"
          prefixSlot={
            <ICSearch className="shrink-0 w-4 h-auto text-gray-100" />
          }
          postfixSlot={
            <button
              className="shrink-0 flex items-center justify-center px-2 py-1 rounded-lg bg-[#373947] font-bold text-sm text-[#FCFBFE]"
              onClick={() => setOpen(false)}
            >
              ESC
            </button>
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-4 bg-[#1C1E2C] rounded-xl text-sm/normal"
        />

        <div className="flex flex-col gap-1">
          <div className="p-2 text-2xl/none">Token List</div>
          {tokenList}
        </div>
      </div>
    ),
    [searchTerm, tokenBalances],
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
              className="p-0"
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
            className="shadow-none flex items-start gap-4 p-0 max-w-full md:w-[24rem]"
          >
            {content}
          </DialogContentDefault>
        )}
      </AnimatePresence>
    </Dialog>
  );
}

export default SelectTokenModal;

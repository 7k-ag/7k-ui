import { DEFAULT_SWAP_TOKENS } from "@/constants/tokens/token";
import { Percent } from "@bicarus/utils";
import { atom } from "jotai";

export const agTokenInAtom = atom(DEFAULT_SWAP_TOKENS.IN);

export const agTokenOutAtom = atom(DEFAULT_SWAP_TOKENS.OUT);

export const agAmountInAtom = atom("");

export const agSlippageAtom = atom(new Percent(1_000, 100_000)); // 1%

export const agInfoTabAtom = atom<"price-chart" | "routes">("routes");

import { DEFAULT_SWAP_TOKENS } from "@/constants/tokens/token";
import { Percent } from "@bicarus/utils";
import { atom } from "jotai";

export const agTokenInAtom = atom(DEFAULT_SWAP_TOKENS.IN);

export const agTokenOutAtom = atom(DEFAULT_SWAP_TOKENS.OUT);

export const agAmountInAtom = atom("");

export const agSlippageAtom = atom(new Percent(500, 100_000)); // 0.5%

import { Percent } from "@bicarus/utils";
import { atom } from "jotai";

export const agSlippageAtom = atom(new Percent(500, 100_000)); // 0.5%

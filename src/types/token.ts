import { StaticToken } from "@/constants/tokens/staticTokens";
import BigNumber from "bignumber.js";

export interface TokenBalance {
  token: StaticToken;
  balance: BigNumber.Value;
}

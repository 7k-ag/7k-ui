import { StaticToken } from "@/constants/tokens/staticTokens";
import BigNumber from "bignumber.js";

export interface TokenAmount {
  token: StaticToken;
  amount: BigNumber.Value;
}

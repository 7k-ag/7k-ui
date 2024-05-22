import BigNumber from "bignumber.js";

export function formatBalance(balance: BigNumber.Value, decimals: number) {
  return new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals));
}

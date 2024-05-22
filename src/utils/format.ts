import BigNumber from "bignumber.js";
import numeral from "numeral";

// Returns first 2 digits after first non-zero decimal
// i.e. 0.001286 -> 0.0012, 0.9845 -> 0.98, 0.0102 -> 0.010, etc
// Intended to be used for tokens whose value is less than $1
// https://stackoverflow.com/a/23887837
export const getFirstThreeNonZeroDecimals = (value: number) => {
  return value.toFixed(9).match(/^-?\d*\.?0*\d{0,2}/)?.[0];
};

export type formatAmountNotation = "compact" | "standard";

/**
 * This function is used to format token prices, liquidity, amount of tokens in TX, and in general any numbers on info section
 * @param amount - amount to be formatted
 * @param notation - default = standard; whether to show 1M or 1,000,000
 * @param notationThreshold - default = 10_000; above the threshold value to display with compact notation
 * @param displayThreshold - default = 0.01; threshold below which it will return simply <displayThreshold instead of actual value, e.g. if 0.001 -> returns <0.001 for 0.0005
 * @param tokenPrecision - set to true when you want precision to be 3 decimals for values < 1 and 2 decimals for values > 1
 * @param precision - default = 2; maximun number of precision
 * @param isInteger - if true the values will contain decimal part only if the amount is > 1000
 * @param isIntegerAuto - default = true; auto detect integer number
 * @returns formatted string ready to be displayed
 */
export const formatAmount = (
  _amount: BigNumber.Value | undefined,
  options?: {
    notation?: formatAmountNotation;
    notationThreshold?: number;
    displayThreshold?: number;
    tokenPrecision?: boolean;
    precision?: number;
    isInteger?: boolean;
    isIntegerAuto?: boolean;
  },
) => {
  const isNegative = new BigNumber(_amount || 0).isNegative();
  const amount = new BigNumber(_amount || 0).abs().toNumber();
  const {
    notation = "standard",
    notationThreshold = 10_000,
    displayThreshold = 0.01,
    tokenPrecision,
    precision = 2,
    isInteger: _isInteger,
    isIntegerAuto = true,
  } = options || { notation: "standard", displayThreshold: 0.01 };
  const isInteger = isIntegerAuto
    ? new BigNumber(_amount || 0).isInteger()
    : _isInteger;
  if (amount === 0) {
    if (isInteger) {
      return "0";
    }
    return "0.00";
  }
  if (!amount) return "0.00";
  if (
    displayThreshold &&
    displayThreshold > 0 &&
    amount < displayThreshold &&
    !isNegative
  ) {
    return `< ${displayThreshold}`;
  }
  if (amount < 1 && !tokenPrecision) {
    return (
      getFirstThreeNonZeroDecimals(amount * (isNegative ? -1 : 1)) || "0.00"
    );
  }

  const pre = precision > 0 ? `[${"0".repeat(precision)}]` : "";
  let format = `0.${pre}a`;

  if (notation === "standard" || amount < notationThreshold) {
    format = isInteger ? "0,0" : `0,0.${pre}`;
  }

  const amountWithPrecision = parseFloat(amount.toFixed(precision));

  // toUpperCase is needed cause numeral doesn't have support for capital K M B out of the box
  return (
    (isNegative ? "-" : "") +
    numeral(amountWithPrecision).format(format).toUpperCase()
  );
};

export const formatToSignificant = (
  value: BigNumber.Value,
  significant: number = 6,
) => {
  const _value = new BigNumber(value);
  const int = _value.integerValue(BigNumber.ROUND_DOWN);
  if (int.toString(10).length >= significant) {
    return _value.toFixed(0);
  }
  return _value
    .toPrecision(significant)
    .replace(/0+$/, "")
    .replace(/\.$/, ".0");
};

// Convert [CurrencyAmount] to number with necessary precision for price formatting.
export const currencyAmountToPreciseFloat = (
  currencyAmount: BigNumber.Value,
) => {
  if (!currencyAmount) return undefined;
  const amt = new BigNumber(currencyAmount);
  const floatForLargerNumbers = parseFloat(
    amt.toFormat({ groupSeparator: "" }),
  );
  if (floatForLargerNumbers < 0.1) {
    return parseFloat(formatToSignificant(amt));
  }
  return floatForLargerNumbers;
};

import { TransactionBlock } from "@mysten/sui.js/transactions";
import {
  Amount,
  CoinMetadata,
  PairSetting,
  SwapArgs,
  estimateDealine,
} from "@flowx-pkg/ts-sdk";
import { BigNumb } from "./BigNumber";
import {
  CLOCK_ID,
  CONTAINER_OBJECT_ID,
  FUNCTION,
  PACKAGE_OBJECT_ID,
} from "./constants";
import { handleGetCoinAmount } from "./libs/handleGetCoinAmount";
import isObject from "lodash/isObject";

const getSwapFunction = (trades: PairSetting[], isExactIn = false) => {
  switch (trades?.length) {
    case 1:
      return isExactIn ? FUNCTION.SWAP_EXACT_INPUT : FUNCTION.SWAP_EXACT_OUTPUT;
    case 2:
      return isExactIn
        ? FUNCTION.SWAP_EXACT_INPUT_DOUBLEHOP
        : FUNCTION.SWAP_EXACT_OUTPUT_DOUBLEHOP;
    case 3:
      return isExactIn
        ? FUNCTION.SWAP_EXACT_INPUT_TRIPLEHOP
        : FUNCTION.SWAP_EXACT_OUTPUT_TRIPLEHOP;
    default:
      return isExactIn ? FUNCTION.SWAP_EXACT_INPUT : FUNCTION.SWAP_EXACT_OUTPUT;
  }
};
const getArgsSwapExactInput = async (
  amountIn: string | number,
  amountOutMin: string | number,
  trades: PairSetting[],
  coinIn: CoinMetadata,
  account: string,
  recipient: string,
  tx: TransactionBlock,
): Promise<SwapArgs> => {
  const { coin: coinObjectId } = await handleGetCoinAmount(
    amountIn,
    account,
    coinIn.type,
    tx,
  );
  const typeArguments: any[] = [coinIn.type];
  trades?.forEach((item) => {
    const lastArgs = typeArguments[typeArguments.length - 1] ?? "";
    if (lastArgs == item.coinXType) {
      typeArguments.push(item.coinYType);
    } else {
      typeArguments.push(item.coinXType);
    }
  });
  return {
    // @ts-expect-error mismatched typing
    tx,
    typeArguments,
    args: [
      tx.object(CLOCK_ID),
      tx.object(CONTAINER_OBJECT_ID),
      isObject(coinObjectId) ? coinObjectId : tx.object(coinObjectId),
      tx.pure(+amountOutMin),
      tx.pure(recipient || account),
      tx.pure(estimateDealine()),
    ],
    callFunction: getSwapFunction(trades, true),
  };
};

const getArgsSwapExactOutput = async (
  amountInMax: string | number,
  amountOut: string | number,
  trades: PairSetting[],
  coinIn: CoinMetadata,
  account: string,
  recipient: string,
  tx: TransactionBlock,
): Promise<SwapArgs> => {
  const { coin: coinObjectId } = await handleGetCoinAmount(
    amountInMax,
    account,
    coinIn.type,
    tx,
  );

  const typeArguments: any[] = [coinIn.type];
  trades?.forEach((item) => {
    const lastArgs = typeArguments[typeArguments.length - 1] ?? "";
    if (lastArgs == item.coinXType) {
      typeArguments.push(item.coinYType);
    } else {
      typeArguments.push(item.coinXType);
    }
  });

  return {
    // @ts-expect-error mismatched typing
    tx,
    typeArguments,
    args: [
      tx.object(CLOCK_ID),
      tx.object(CONTAINER_OBJECT_ID),
      isObject(coinObjectId) ? coinObjectId : tx.object(coinObjectId),
      tx.pure(+amountInMax),
      tx.pure(+amountOut),
      tx.pure(recipient || account),
      tx.pure(estimateDealine()),
    ],
    callFunction: getSwapFunction(trades, false),
  };
};
const swap = async (
  tx: TransactionBlock,
  typeArguments: string[],
  args: any[],
  callFunction: string,
): Promise<TransactionBlock> => {
  tx.moveCall({
    target: `${PACKAGE_OBJECT_ID}::router::${callFunction}`,
    arguments: args,
    typeArguments,
  });
  return tx;
};
export const swapExactInput = async (
  isExactIn: boolean,
  amountIn: Amount,
  amountOut: Amount,
  trades: PairSetting[],
  coinIn: CoinMetadata,
  // @ts-expect-error mismatched typing
  coinOut: CoinMetadata,
  account: string,
  valueSlippage: number,
  tx: TransactionBlock,
) => {
  try {
    const slipageVal =
      valueSlippage > 100 ? 100 : valueSlippage < 0 ? 0 : valueSlippage;
    const slippage = BigNumb(slipageVal).div(100).toFixed();
    const { typeArguments, args, callFunction } = isExactIn
      ? await getArgsSwapExactInput(
          amountIn.decimalAmount,
          BigNumb(amountOut.decimalAmount)
            .multipliedBy(1 - +slippage)
            .toFixed(0),
          trades,
          coinIn,
          account,
          "",
          tx,
        )
      : await getArgsSwapExactOutput(
          amountIn.decimalAmount,
          amountOut.decimalAmount,
          trades,
          coinIn,
          account,
          "",
          tx,
        );

    // console.log('=======> Swap Args ==========>');
    // console.log('Args: ', args);
    // console.log('Amount in: ', amountIn.decimalAmount);
    // console.log('Amount out: ', amountOut.decimalAmount);
    // console.log('Type Args: ', typeArguments);
    // console.log('=======> End Args ==========>');
    // console.log("KKK", tx);
    const txb = await swap(tx, typeArguments, args, callFunction);
    return txb;
  } catch (e) {
    console.log("error", e);
    throw `ERROR SWAP: ${e}`;
  }
};

import { orderByKey } from "@flowx-pkg/ts-sdk";
import { BigNumb } from "../BigNumber";
import { CoinStruct, PaginatedCoins } from "@mysten/sui.js/client";
import { provider } from "../constants";

export const getCoinOjectIdsByAmount = async (
  address: string,
  amount: string,
  coinType: string,
): Promise<{
  objectIds: string[];
  objectCoins: CoinStruct[];
  balance: string;
}> => {
  let coinBalances: CoinStruct[] = [];
  let hasNextPage = true;
  let nextCursor = undefined;
  while (hasNextPage) {
    try {
      const coins: PaginatedCoins = await provider.getCoins({
        owner: address,
        coinType,
        cursor: nextCursor,
      });
      coinBalances = [...coinBalances, ...coins.data];
      hasNextPage = coins.hasNextPage;
      nextCursor = coins.nextCursor;
    } catch (error) {
      console.error("Error fetching data:", error);
      hasNextPage = false;
    }
  }
  // sort coin balance before get object id
  const coinObj = orderByKey(
    coinBalances.map((item) => {
      return {
        ...item,
        balance: item.balance,
      };
    }),
    "balance",
    "desc",
  );
  let balance = "0";
  const objectIds = [] as any;
  const objectCoins = [];
  for (const coin of coinObj ?? []) {
    balance = BigNumb(coin.balance).plus(balance).toFixed();
    objectIds.push(coin.coinObjectId);
    objectCoins.push(coin);
    if (BigNumb(balance).isGreaterThanOrEqualTo(amount)) {
      break;
    }
  }
  return { objectIds, balance, objectCoins };
};

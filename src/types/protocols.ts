import { SorSwap } from "./swapInfo";
import { Percent } from "@bicarus/utils";
import { StaticToken } from "@/constants/tokens/staticTokens";
import { TransactionBlock } from "@mysten/sui.js/transactions";

export abstract class ProtocolContract {
  constructor(
    readonly tokenIn: StaticToken,
    readonly tokenOut: StaticToken,
    readonly swapInfo: SorSwap,
    readonly slippage: Percent,
    readonly currentAccount: string,
  ) {}
  abstract buildTransaction(tx: TransactionBlock): Promise<TransactionBlock>;
}

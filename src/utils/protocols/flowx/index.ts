import { ProtocolContract } from "@/types/protocols";
import { formatBalance } from "../../number";
import { denormalizeTokenId } from "../../token";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { CoinMetadata, calculateAmountIn } from "@flowx-pkg/ts-sdk";
import { swapExactInput } from "./swapExactInput";

class FlowXProtocolContract extends ProtocolContract {
  async buildTransaction(tx: TransactionBlock): Promise<TransactionBlock> {
    const coinIn: CoinMetadata = {
      type: denormalizeTokenId(this.tokenIn.type),
      symbol: this.tokenIn.symbol,
      decimals: this.tokenIn.decimals,
    };
    const coinOut: CoinMetadata = {
      type: denormalizeTokenId(this.tokenOut.type),
      symbol: this.tokenOut.symbol,
      decimals: this.tokenOut.decimals,
    };
    const amountIn = formatBalance(
      this.swapInfo.amount,
      this.tokenIn.decimals,
    ).toNumber();
    const slippage = this.slippage.toBigNumber().toNumber();
    const account = this.currentAccount;

    const data = await calculateAmountIn(amountIn, coinIn, coinOut);

    await swapExactInput(
      false,
      data.amountIn,
      data.amountOut,
      data.trades,
      coinIn,
      coinOut,
      account,
      slippage,
      tx,
    );

    return tx;
  }
}

export default FlowXProtocolContract;

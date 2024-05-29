import { ProtocolContract } from "@/types/protocols";
import { denormalizeTokenId } from "@/utils/token";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { Network, TurbosSdk } from "turbos-clmm-sdk";

const sdk = new TurbosSdk(Network[import.meta.env.VITE_NETWORK as Network]);

class TurbosProtocolContract extends ProtocolContract {
  async buildTransaction(tx: TransactionBlock): Promise<TransactionBlock> {
    const pools = [
      {
        pool: this.swapInfo.poolId,
        a2b: true,
      },
    ];
    const address = this.currentAccount;
    const amountSpecified = this.swapInfo.amount;
    const amountSpecifiedIsInput = true;

    const swapResults = await sdk.trade.computeSwapResult({
      pools,
      address,
      amountSpecified,
      amountSpecifiedIsInput,
    });

    if (swapResults.length > 0) {
      const swapResult = swapResults[0];
      await sdk.trade.swap({
        routes: [
          {
            pool: swapResult.pool,
            a2b: swapResult.a_to_b,
            nextTickIndex: sdk.math.bitsToNumber(
              swapResult.tick_current_index.bits,
            ),
          },
        ],
        coinTypeA: denormalizeTokenId(this.swapInfo.assetIn),
        coinTypeB: denormalizeTokenId(this.swapInfo.assetOut),
        address,
        amountA: swapResult.amount_a,
        amountB: swapResult.amount_b,
        amountSpecifiedIsInput,
        slippage: this.slippage.toBigNumber().toString(),
        txb: tx,
      });
    }

    return tx;
  }
}

export default TurbosProtocolContract;

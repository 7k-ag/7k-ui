import { ProtocolContract } from "@/types/protocols";
import { denormalizeTokenId } from "@/utils/token";
import { Percent } from "@bicarus/utils";
import { getFullnodeUrl } from "@mysten/sui.js/client";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { Dex } from "kriya-dex-sdk";

class KriyaProtocolContract extends ProtocolContract {
  async buildTransaction(tx: TransactionBlock): Promise<TransactionBlock> {
    const dex = new Dex(getFullnodeUrl(import.meta.env.VITE_NETWORK));
    const inputCoinType = denormalizeTokenId(this.swapInfo.assetIn);
    const outputCoinType = denormalizeTokenId(this.swapInfo.assetOut);
    const inputCoinAmount = BigInt(this.swapInfo.amount);
    const minReceived = new Percent(100, 100)
      .subtract(this.slippage)
      .multiply(this.swapInfo.returnAmount)
      .quotient.toNumber();
    const pool = {
      objectId: this.swapInfo.poolId,
      tokenXType: inputCoinType,
      tokenYType: outputCoinType,
      isStable: true,
    };

    dex.swap(
      pool,
      inputCoinType,
      inputCoinAmount,
      inputCoinType,
      BigInt(minReceived),
      tx as any,
      this.currentAccount,
    );

    return tx;
  }
}

export default KriyaProtocolContract;

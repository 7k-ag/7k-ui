import { SorRoute } from "@/types/swapInfo";

export function mapPoolIdToProtocol(routes: SorRoute[]) {
  const poolTypes: Record<string, string> = {};
  routes.forEach((route) => {
    route.hops.forEach((hop) => {
      poolTypes[hop.poolId] = hop.pool?.type || "unknown";
    });
  });
}

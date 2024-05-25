import { normalizeTokenId } from "@/utils/token";
import { STATIC_TOKENS, StaticToken } from "./staticTokens";

export const DEFAULT_AG_TOKENS: StaticToken[] = STATIC_TOKENS.slice(0, 20).map(
  (token) => ({
    ...token,
    type: normalizeTokenId(token.type),
  }),
);

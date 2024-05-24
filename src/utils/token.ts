import { SUI_LONG_ID, SUI_SHORT_ID } from "@/constants/tokens/token";

export function normalizeTokenId(tokenId: string) {
  return tokenId === SUI_SHORT_ID ? SUI_LONG_ID : tokenId;
}

export function denormalizeTokenId(tokenId: string) {
  return tokenId === SUI_LONG_ID ? SUI_SHORT_ID : tokenId;
}

export function checkIsSui(tokenId: string) {
  return tokenId === SUI_LONG_ID || tokenId === SUI_SHORT_ID;
}

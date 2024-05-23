import { StaticToken } from "./staticTokens";

export const SUI_TOKEN: StaticToken = {
  type: "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI",
  objectId:
    "0x9258181f5ceac8dbffb7030890243caed69a9599d2886d957a9cb7656af3bdb3",
  name: "Sui",
  supply: 10000000000,
  supplyInUsd: 11100000000,
  tokenPrice: 1.11,
  dominance: 0.0954482375,
  circulatingSupply: 2339196965.73389,
  marketCap: 2596508631.964618,
  totalVolume: 187787351,
  maxSupply: 10000000000,
  fdv: 11100000000.000002,
  holders: 8031535,
  denom: "SUI",
  packageId:
    "0x0000000000000000000000000000000000000000000000000000000000000002",
  createTimestamp: 1681318800000,
  creator: "0x0000000000000000000000000000000000000000000000000000000000000000",
  creatorName: null,
  creatorImg: null,
  creatorScamMessage: null,
  scamMessage: null,
  decimals: 9,
  symbol: "SUI",
  iconUrl: "https://strapi-dev.scand.app/uploads/sui_c07df05f00.png",
  description: "",
  bridge: false,
  verified: true,
};

export const USDC_TOKEN: StaticToken = {
  type: "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
  objectId:
    "0x4fbf84f3029bd0c0b77164b587963be957f853eccf834a67bb9ecba6ec80f189",
  name: "USD Coin",
  supply: 33019490541.6259,
  supplyInUsd: 33018896190.79615,
  tokenPrice: 0.999982,
  dominance: null,
  circulatingSupply: null,
  marketCap: null,
  totalVolume: null,
  maxSupply: null,
  fdv: 33018896190.796154,
  holders: 1178149,
  denom: "USDC",
  packageId:
    "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf",
  createTimestamp: 1683058319862,
  creator: "0x355511750caf954d34e5aa6324f886bd30dc9b829c880a2efb2c44986348fcaf",
  creatorName: null,
  creatorImg: null,
  creatorScamMessage: null,
  scamMessage: null,
  decimals: 6,
  symbol: "USDC",
  iconUrl: "https://strapi-dev.scand.app/uploads/usdc_8cc5687a10.png",
  description: "",
  bridge: true,
  verified: true,
};

export const DEFAULT_AG_TOKENS = {
  IN: SUI_TOKEN,
  OUT: USDC_TOKEN,
};

export const SUI_ID = "0x2::sui::SUI";

export const SUI_AG_ID = SUI_TOKEN.type;

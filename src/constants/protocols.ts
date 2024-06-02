import ImgCetus from "@/assets/images/protocols/cetus.png";
import ImgTurbos from "@/assets/images/protocols/turbos.jpeg";
import ImgKriya from "@/assets/images/protocols/kriya.jpeg";
import ImgSuiSwap from "@/assets/images/protocols/suiswap.jpeg";
import ImgDeepBook from "@/assets/images/protocols/deepbook.jpeg";
import ImgFlowX from "@/assets/images/protocols/flowx.jpeg";
import ImgBlueMove from "@/assets/images/protocols/bluemove.jpeg";
import ImgAfterMath from "@/assets/images/protocols/aftermath.jpeg";

export const DEX_PROTOCOLS_MAP: Record<
  string,
  { name: string; url?: string; logoUrl?: string }
> = {
  cetus: {
    name: "Cetus",
    logoUrl: ImgCetus,
  },
  cetusv2: {
    name: "Cetus",
    logoUrl: ImgCetus,
  },
  turbos: {
    name: "Turbos Finance",
    logoUrl: ImgTurbos,
  },
  bluemove: {
    name: "BlueMove DEX",
    logoUrl: ImgBlueMove,
  },
  kriya: {
    name: "Kriya",
    logoUrl: ImgKriya,
  },
  suiswap: {
    name: "SuiSwap",
    logoUrl: ImgSuiSwap,
  },
  aftermath: {
    name: "Aftermath Finance",
    logoUrl: ImgAfterMath,
  },
  deepbook: {
    name: "DeepBook",
    logoUrl: ImgDeepBook,
  },
  flowx: {
    name: "FlowX Finance",
    logoUrl: ImgFlowX,
  },
};

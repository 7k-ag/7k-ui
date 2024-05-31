import { EXPLORER } from "@/constants/explorer";
import React, { memo, useMemo } from "react";

type Props = Omit<JSX.IntrinsicElements["a"], "href"> & {
  tokenId: string;
};

const ExplorerTokenLink = React.forwardRef<HTMLAnchorElement, Props>(
  function ExplorerAccount({ tokenId, ...props }, ref) {
    const link = useMemo(() => {
      return `${EXPLORER.ADDRESS}/${import.meta.env.VITE_NETWORK}/coin/${tokenId}`;
    }, [tokenId]);
    return (
      <a target="_blank" rel="noreferrer" {...props} ref={ref} href={link} />
    );
  },
);

export default memo(ExplorerTokenLink);

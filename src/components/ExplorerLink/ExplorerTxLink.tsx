import React, { memo, useMemo } from "react";
import { network } from "./constants";

type Props = Omit<JSX.IntrinsicElements["a"], "href"> & {
  txHash: string;
};

const ExplorerTxLink = React.forwardRef<HTMLAnchorElement, Props>(
  function ExplorerAccount({ txHash, ...props }, ref) {
    const link = useMemo(() => {
      return `${network.explorerAddress}/txblock/${txHash}`;
    }, [txHash, network.explorerAddress]);
    return (
      <a target="_blank" rel="noreferrer" {...props} ref={ref} href={link} />
    );
  },
);

export default memo(ExplorerTxLink);

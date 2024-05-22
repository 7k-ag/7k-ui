import React, { memo, useMemo } from "react";
import { network } from "./constants";

type Props = Omit<JSX.IntrinsicElements["a"], "href"> & {
  account: string;
};

const ExplorerAccountLink = React.forwardRef<HTMLAnchorElement, Props>(
  function ExplorerAccount({ account, ...props }, ref) {
    const link = useMemo(() => {
      return `${network.explorerAddress}/account/${account}`;
    }, [account, network.explorerAddress]);
    return (
      <a target="_blank" rel="noreferrer" {...props} ref={ref} href={link} />
    );
  },
);

export default memo(ExplorerAccountLink);

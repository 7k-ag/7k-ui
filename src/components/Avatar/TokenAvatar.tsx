import { memo } from "react";
import Avatar from ".";
import useTokenMetadata from "@/hooks/tokens/useTokenMetadata";

type Props = Omit<Parameters<typeof Avatar>[0], "src" | "alt"> & {
  identifier: string;
};
function TokenAvatar({ identifier, ...props }: Props) {
  const { data: token } = useTokenMetadata(identifier, { useStatic: true });
  return <Avatar src={token?.iconUrl || ""} alt={token?.name} {...props} />;
}

export default memo(TokenAvatar);

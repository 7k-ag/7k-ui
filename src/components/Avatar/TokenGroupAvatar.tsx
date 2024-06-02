import { StaticToken } from "@/constants/tokens/staticTokens";
import { memo } from "react";
import Avatar from "@/components/Avatar";
import tw from "@/utils/twmerge";

export const MAX_TOKENS_DISPLAY = 5;

interface Props {
  tokens: StaticToken[];
  maxTokensDisplay?: number;
  tokenClassName?: string;
}

function TokenGroupAvatar({
  tokens,
  maxTokensDisplay = MAX_TOKENS_DISPLAY,
  tokenClassName,
}: Props) {
  return (
    <div className="flex items-center">
      {tokens.slice(0, maxTokensDisplay).map((token, index) => (
        <Avatar
          key={token.type || index}
          src={token.iconUrl || ""}
          alt={token.symbol}
          className={tw("w-4 h-4 -ml-1 first:ml-0", tokenClassName)}
        />
      ))}
      {tokens.length > maxTokensDisplay && (
        <span className="flex items-center justify-center w-[1.375rem] h-auto -ml-1 rounded-full border border-black-80">
          <span className="font-bold text-xs">
            +{tokens.length - maxTokensDisplay}
          </span>
        </span>
      )}
    </div>
  );
}

export default memo(TokenGroupAvatar);

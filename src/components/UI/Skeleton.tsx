import tw from "@/utils/twmerge";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={tw("animate-pulse rounded-md bg-gray-100/10", className)}
      {...props}
    />
  );
}

export { Skeleton };

import { memo } from "react";

interface Props {
  label: React.ReactNode;
  value: React.ReactNode;
}

function OrderItem({ label, value }: Props) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs/none">{label}</span>
      <span className="text-xs/none text-gray-100 font-samsung">{value}</span>
    </div>
  );
}

export default memo(OrderItem);

import { agInfoTabAtom } from "@/atoms/aggregator.atom";
import tw from "@/utils/twmerge";
import { useAtom } from "jotai";
import { useMemo } from "react";

const tabs = [
  // {
  //   key: 'price-chart',
  //   label: 'Price Chart',
  // },
  {
    key: "routes",
    label: "Routes",
  },
] as const;

function InfoTabs() {
  const [selectedTab, setSelectedTab] = useAtom(agInfoTabAtom);

  const selectedItem = useMemo(() => {
    return tabs.find((t) => t.key === selectedTab);
  }, [selectedTab]);

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-1 p-1 rounded-xl bg-black-80">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            className={tw(
              "flex items-center justify-center px-3 py-2 gap-2.5 transition-all rounded-lg",
              key === selectedTab ? "bg-black-40" : "bg-transparent",
              "text-2xs/none",
            )}
            onClick={() => setSelectedTab(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="font-semibold text-2xl/none">{selectedItem?.label}</div>
    </div>
  );
}

export default InfoTabs;

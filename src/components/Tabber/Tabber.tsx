import { memo, useState, FC, useEffect } from "react";

import classes from "./Tabber.module.scss";

type Tab = {
  id: string;
  label: string;
  component: JSX.Element;
};

type TabberProps = {
  tabs: Tab[];
  onTabChange?: (tab: Tab) => void;
};

const Tabber: FC<TabberProps> = ({ tabs = [], onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState<Tab | null>(null);

  useEffect(() => {
    if (selectedTab === null && tabs.length) {
      const [firstTab] = tabs ?? [];
      if (typeof firstTab !== "undefined") {
        setSelectedTab(firstTab);
      }
      typeof onTabChange === "function" && onTabChange(firstTab);
    }
  }, [onTabChange, selectedTab, tabs]);

  return (
    <div className={classes.Wrapper}>
      {tabs?.map((tab: Tab, i: number) => {
        const { label, id } = tab;
        const isSelected = id === selectedTab?.id;
        return (
          <button
            className={[classes.Tab, isSelected && classes.ActiveTab].join(" ")}
            key={id}
            onClick={() => {
              setSelectedTab(tab);
              typeof onTabChange === "function" && onTabChange(tab);
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default memo(Tabber);

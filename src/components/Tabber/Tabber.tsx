import { memo, useState, FC, useEffect } from "react";

import classes from "./Tabber.module.scss";

type Tab = {
  id: string;
  label: string;
  component: JSX.Element;
};

type Tabber = {
  tabs: Tab[];
  onTabChange?: (tab: Tab) => void;
};

const Tabber: FC<Tabber> = ({ tabs, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState<Tab | null>(null);

  useEffect(() => {
    if (selectedTab === null && tabs.length) {
      setSelectedTab(tabs[0]);
      typeof onTabChange === "function" && onTabChange(tabs[0]);
    }
  }, [tabs]);
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

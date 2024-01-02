import { ReactNode, createContext, useContext, useState } from "react";

type TActivePageContext = {
  activePage: string;
  setActivePage: (activePage: string) => void;
};

const ActivePageContext = createContext({} as TActivePageContext);

export const ActiveProvider = ({ children }: { children: ReactNode }) => {
  const [activePage, setActivePage] = useState("all");

  return (
    <ActivePageContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </ActivePageContext.Provider>
  );
};

export const useActivePage = () => useContext(ActivePageContext);

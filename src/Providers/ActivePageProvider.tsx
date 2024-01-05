import { ReactNode, createContext, useContext, useState } from "react";
import { ActivePage } from "../types";
import { useDogs } from "./DogsProvider";
import { Dog } from "../types";

type TActivePageContext = {
  activePage: ActivePage;
  setActivePage: (activePage: ActivePage) => void;
  renderedDogs: () => Dog[];
};

const ActivePageContext = createContext({} as TActivePageContext);

export const ActiveProvider = ({ children }: { children: ReactNode }) => {
  const [activePage, setActivePage] = useState<ActivePage>("all");
  const { dogs, favoritedDogs, unfavoritedDogs } = useDogs();

  const renderedDogs = (): Dog[] => {
    switch (activePage) {
      case "favorites":
        return favoritedDogs;
      case "unfavorites":
        return unfavoritedDogs;
      default:
        return dogs;
    }
  };

  return (
    <ActivePageContext.Provider
      value={{ activePage, setActivePage, renderedDogs }}
    >
      {children}
    </ActivePageContext.Provider>
  );
};

export const useActivePage = () => useContext(ActivePageContext);

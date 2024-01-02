import { ReactNode, useState, createContext, useContext } from "react";
import { Dog } from "../types";

type TDogsContext = {
  dogs: Dog[];
  setDogs: (dogs: Dog[]) => void;
  favoritedDogs: Dog[];
  unfavoritedDogs: Dog[];
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  //   maxDogId: number;
};

const DogsContext = createContext<TDogsContext>({} as TDogsContext);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const favoritedDogs = dogs.filter((dog) => dog.isFavorite);
  const unfavoritedDogs = dogs.filter((dog) => !dog.isFavorite);
  //   const maxDogId = Math.max(...dogs.map((dog) => dog.id));

  return (
    <DogsContext.Provider
      value={{
        dogs,
        setDogs,
        favoritedDogs,
        unfavoritedDogs,
        isLoading,
        setIsLoading,
        // maxDogId,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

export const useDogs = () => useContext(DogsContext);

import { ReactNode, useState, createContext, useContext } from "react";
import { Dog, CreateDog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

type TDogsContext = {
  dogs: Dog[];
  setDogs: (dogs: Dog[]) => void;
  favoritedDogs: Dog[];
  unfavoritedDogs: Dog[];
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  createDog: (newDog: CreateDog) => void;
  deleteDog: (id: number) => void;
  updateDog: (id: number, isFavorite: boolean) => void;
  refetchDogs: () => void;
  deleteDogFetch: (id: number) => void;
  updateDogFetch: (id: number, isFavorite: boolean) => void;
  createDogFetch: (newDog: CreateDog) => void;
};

const DogsContext = createContext<TDogsContext>({} as TDogsContext);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const favoritedDogs = dogs.filter((dog) => dog.isFavorite);
  const unfavoritedDogs = dogs.filter((dog) => !dog.isFavorite);
  const maxDogId = Math.max(...dogs.map((dog) => dog.id));

  const createDog = (newDog: CreateDog) => {
    const newDogs: Dog[] = [
      ...dogs,
      { ...newDog, id: maxDogId + 1, isFavorite: false },
    ];
    setDogs(newDogs);
  };

  const deleteDog = (id: number) => {
    setDogs(dogs.filter((dog) => dog.id !== id));
  };

  const updateDog = (id: number, isFavorite: boolean) => {
    setDogs(
      dogs.map((dogg) => {
        if (dogg.id === id) {
          return {
            ...dogg,
            isFavorite,
          };
        } else {
          return dogg;
        }
      })
    );
  };

  const deleteDogFetch = (id: number) => {
    // setIsLoading(true);
    Requests.deleteDogRequest(id).then((res) => {
      if (typeof res === "string") {
        toast.error(res);
        setDogs(dogs);
      } else {
        return;
      }
    });
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  const updateDogFetch = (id: number, isFavorite: boolean) => {
    // setIsLoading(true);
    Requests.patchFavoriteForDog(id, isFavorite).then((res) => {
      if (typeof res === "string") {
        toast.error(res);
        setDogs(dogs);
      } else {
        return;
      }
    });
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  const refetchDogs = () => {
    setIsLoading(true);
    Requests.getAllDogs()
      .then((res) => {
        if (typeof res === "string") {
          toast.error(res);
        } else {
          setDogs(res);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const createDogFetch = (newDog: CreateDog) => {
    setIsLoading(true);
    Requests.postDog(newDog)
      .then((res) => {
        if (typeof res === "string") {
          toast.error(res);
          setDogs(dogs);
        } else {
          toast.success("Dog Created!");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <DogsContext.Provider
      value={{
        dogs,
        setDogs,
        favoritedDogs,
        unfavoritedDogs,
        isLoading,
        setIsLoading,
        createDog,
        deleteDog,
        updateDog,
        deleteDogFetch,
        refetchDogs,
        updateDogFetch,
        createDogFetch,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

export const useDogs = () => useContext(DogsContext);

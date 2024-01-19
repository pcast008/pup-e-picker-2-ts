import { ReactNode, useState, createContext, useContext } from "react";
import { Dog, CreateDogDTO } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

type TDogsContext = {
  dogs: Dog[];
  setDogs: (dogs: Dog[]) => void;
  favoritedDogs: Dog[];
  unfavoritedDogs: Dog[];
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  createDog: (dog: CreateDogDTO) => void;
  deleteDog: (id: number) => void;
  updateDog: (id: number, isFavorite: boolean) => void;
  refetchDogs: () => Promise<unknown>;
  deleteDogFetch: (id: number) => Promise<unknown>;
  updateDogFetch: (id: number, isFavorite: boolean) => Promise<unknown>;
  createDogFetch: (dog: CreateDogDTO) => Promise<unknown>;
};

const DogsContext = createContext<TDogsContext>({} as TDogsContext);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const favoritedDogs = dogs.filter((dog) => dog.isFavorite);
  const unfavoritedDogs = dogs.filter((dog) => !dog.isFavorite);
  const maxDogId = Math.max(...dogs.map((dog) => dog.id));

  const createDog = (dog: CreateDogDTO) => {
    const newDogs: Dog[] = [
      ...dogs,
      { ...dog, id: maxDogId + 1, isFavorite: false },
    ];
    setDogs(newDogs);
  };

  const deleteDog = (id: number) => {
    setDogs(dogs.filter((dog) => dog.id !== id));
  };

  const updateDog = (id: number, isFavorite: boolean) => {
    setDogs(
      dogs.map((dog) =>
        dog.id === id
          ? {
              ...dog,
              isFavorite,
            }
          : dog
      )
    );
  };

  const deleteDogFetch = (id: number) => {
    return Requests.deleteDogRequest(id).catch(() => {
      toast.error("Error deleting dog.");
      setDogs(dogs);
    });
  };

  const updateDogFetch = (id: number, isFavorite: boolean) => {
    return Requests.patchFavoriteForDog(id, isFavorite).catch(() => {
      toast.error("Error updating dog.");
      setDogs(dogs);
    });
  };

  const refetchDogs = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((res) => {
        setDogs(res);
      })
      .catch(() => {
        toast.error("Error getting dogs.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const createDogFetch = (dog: CreateDogDTO) => {
    setIsLoading(true);
    return Requests.postDog(dog)
      .then((res) => {
        // console.log("dog created");
        toast.success("Dog created!");
        return res;
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

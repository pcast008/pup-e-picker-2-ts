import { ReactNode, useState, createContext, useContext } from "react";
import { Dog, CreateDogDTO, ActivePage } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

type TDogsContext = {
  dogs: Dog[];
  setDogs: (dogs: Dog[]) => void;
  favoritedDogs: Dog[];
  unfavoritedDogs: Dog[];
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  createDog: (dog: CreateDogDTO) => Promise<unknown>;
  deleteDog: (id: number) => Promise<unknown>;
  updateDog: (id: number, isFavorite: boolean) => Promise<unknown>;
  refetchDogs: () => Promise<unknown>;
  activePage: ActivePage;
  setActivePage: (activePage: ActivePage) => void;
  renderedDogs: () => Dog[];
};

const DogsContext = createContext<TDogsContext>({} as TDogsContext);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState<ActivePage>("all");

  const favoritedDogs = dogs.filter((dog) => dog.isFavorite);
  const unfavoritedDogs = dogs.filter((dog) => !dog.isFavorite);

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

  const createDog = (dog: CreateDogDTO) => {
    setIsLoading(true);
    return Requests.postDog(dog).then((res) => {
      //   console.log("dog created");
      toast.success("Dog created!");
      refetchDogs();
      return res;
    });
    //   .catch(() => {
    //     throw new Error("Error creating dog.");
    //     console.log("dog failed to create1");
    //   })

    // Jon - .finally was moved to the CreateDogForm for better logic flow
    // (remember what we went over in the class?)

    // .finally(() => {
    //   console.log("finally");
    //   setIsLoading(false);
    // })
  };

  const deleteDog = (id: number) => {
    setDogs(dogs.filter((dog) => dog.id !== id));
    return Requests.deleteDogRequest(id).catch(() => {
      toast.error("Error deleting dog.");
      setDogs(dogs);
    });
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
        refetchDogs,
        activePage,
        setActivePage,
        renderedDogs,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

export const useDogs = () => useContext(DogsContext);

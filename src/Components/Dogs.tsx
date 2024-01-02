// Right now these dogs are constant, but in reality we should be getting these from our server
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
import { useDogs } from "../Providers/DogsProvider";
import { useActivePage } from "../Providers/ActivePageProvider";
import { DogCard } from "./DogCard";
import { Requests } from "../api";
import toast from "react-hot-toast";

export const Dogs = () =>
  // no props allowed

  {
    const {
      dogs,
      unfavoritedDogs,
      favoritedDogs,
      isLoading,
      setDogs,
      //   setIsLoading,
    } = useDogs();
    const { activePage } = useActivePage();

    const renderedDogs = () => {
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
      //  the "<> </>"" are called react fragments, it's like adding all the html inside
      // without adding an actual html element
      <>
        {/* Make all the dog cards show up here */}
        {renderedDogs().map((dog) => {
          return (
            <DogCard
              key={dog.id}
              dog={dog}
              onTrashIconClick={() => {
                // setIsLoading(true);
                setDogs(dogs.filter((dogg) => dogg.id !== dog.id));

                Requests.deleteDogRequest(dog.id).then((res) => {
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
              }}
              onEmptyHeartClick={() => {
                // setIsLoading(true);

                setDogs(
                  dogs.map((dogg) => {
                    if (dogg.id === dog.id) {
                      return {
                        ...dogg,
                        isFavorite: true,
                      };
                    } else {
                      return dogg;
                    }
                  })
                );

                Requests.patchFavoriteForDog(dog.id, true).then((res) => {
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
              }}
              onHeartClick={() => {
                // setIsLoading(true);

                setDogs(
                  dogs.map((dogg) => {
                    if (dogg.id === dog.id) {
                      return {
                        ...dogg,
                        isFavorite: false,
                      };
                    } else {
                      return dogg;
                    }
                  })
                );

                Requests.patchFavoriteForDog(dog.id, false).then((res) => {
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
              }}
              isLoading={isLoading}
            />
          );
        })}
      </>
    );
  };

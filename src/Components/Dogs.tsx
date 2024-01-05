// Right now these dogs are constant, but in reality we should be getting these from our server
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
import { useDogs } from "../Providers/DogsProvider";
import { useActivePage } from "../Providers/ActivePageProvider";
import { DogCard } from "./DogCard";

export const Dogs = () =>
  // no props allowed

  {
    const { isLoading, deleteDog, deleteDogFetch, updateDog, updateDogFetch } =
      useDogs();
    const { renderedDogs } = useActivePage();

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
                deleteDog(dog.id);
                deleteDogFetch(dog.id);
              }}
              onEmptyHeartClick={() => {
                updateDog(dog.id, true);
                updateDogFetch(dog.id, true);
              }}
              onHeartClick={() => {
                updateDog(dog.id, false);
                updateDogFetch(dog.id, false);
              }}
              isLoading={isLoading}
            />
          );
        })}
      </>
    );
  };

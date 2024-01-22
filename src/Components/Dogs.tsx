// Right now these dogs are constant, but in reality we should be getting these from our server
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
import { useDogs } from "../Providers/DogsProvider";
import { DogCard } from "./DogCard";

export const Dogs = () =>
  // no props allowed

  {
    const { isLoading, deleteDog, updateDog, renderedDogs } = useDogs();

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
              }}
              onEmptyHeartClick={() => {
                updateDog(dog.id, true);
              }}
              onHeartClick={() => {
                updateDog(dog.id, false);
              }}
              isLoading={isLoading}
            />
          );
        })}
      </>
    );
  };

import { CreateDogDTO } from "./types";

const URL = "http://localhost:3000";

const throwIfNotOkOrParse = (message: string) => (res: Response) => {
  if (!res.ok) {
    throw new Error(message);
  }
  return res;
};

const getAllDogs = () => {
  return fetch(`${URL}/dogs`)
    .then(throwIfNotOkOrParse("Error getting dogs."))
    .then((res) => res.json());
};

const postDog = (dog: CreateDogDTO) => {
  return fetch(`${URL}/dogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: dog.name,
      description: dog.description,
      image: dog.image,
      isFavorite: false,
    }),
  }).then(throwIfNotOkOrParse("Error creating dog."));
};

const deleteDogRequest = (id: number) => {
  return fetch(`${URL}/dogs/${id}`, {
    method: "DELETE",
  }).then(throwIfNotOkOrParse("Error deleting dog."));
};

const patchFavoriteForDog = (id: number, isFavorite: boolean) => {
  return fetch(`${URL}/dogs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isFavorite: isFavorite,
    }),
  }).then(throwIfNotOkOrParse("Error updating dog."));
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};

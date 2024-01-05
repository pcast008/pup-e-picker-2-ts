import { CreateDog } from "./types";

const URL = "http://localhost:3000";

const getAllDogs = () => {
  // fill out method
  return fetch(`${URL}/dogs`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Error getting dogs.");
    })
    .catch((error) => {
      return error.message;
    });
};

const postDog = (dog: CreateDog) => {
  // fill out method
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
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Error posting dog.");
    })
    .catch((error) => {
      return error.message;
    });
};
const deleteDogRequest = (id: number) => {
  // fill out method
  return fetch(`${URL}/dogs/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Error deleting dog.");
    })
    .catch((error) => {
      return error.message;
    });
};

const patchFavoriteForDog = (id: number, isFavorite: boolean) => {
  // fill out method
  return fetch(`${URL}/dogs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isFavorite: isFavorite,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error updating dog.");
      }
    })
    .catch((error) => {
      return error.message;
    });
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};

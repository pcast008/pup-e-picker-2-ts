import { CreateDog } from "./types";

const URL = "http://localhost:3000";

const getAllDogs = () => {
  // fill out method
  return fetch(`${URL}/dogs`).then((res) => {
    if (!res.ok) {
      throw new Error("Error getting dogs.");
    }
    return res.json();
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
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Error creating dog.");
    }
    return res;
  });
};
const deleteDogRequest = (id: number) => {
  // fill out method
  return fetch(`${URL}/dogs/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Error deleting dog.");
    }
    return res;
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
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Error updating dog.");
    }
    return res;
  });
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};

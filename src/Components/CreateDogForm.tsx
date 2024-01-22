import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDogs } from "../Providers/DogsProvider";
import { toast } from "react-hot-toast";

export const CreateDogForm = () => {
  // no props allowed
  const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { isLoading, createDog, setIsLoading } = useDogs();

  const resetForm = () => {
    setName("");
    setDescription("");
    setSelectedImage(dogPictures.BlueHeeler);
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        createDog({ name, description, image: selectedImage })
          .then(() => {
            // console.log("resetting form");
            resetForm();
          })
          .catch(() => {
            // console.log("dog failed to create2");
            toast.error("Error creating dog.");
          })
          .finally(() => {
            // console.log("finally");
            setIsLoading(false);
          });
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        disabled={isLoading}
        style={{
          opacity: isLoading ? 0.5 : 1,
          cursor: isLoading ? "not-allowed" : "",
        }}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        disabled={isLoading}
        style={{
          opacity: isLoading ? 0.5 : 1,
          cursor: isLoading ? "not-allowed" : "",
        }}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        value={selectedImage}
        onChange={(e) => {
          setSelectedImage(e.target.value);
        }}
        disabled={isLoading}
        style={{
          opacity: isLoading ? 0.5 : 1,
          cursor: isLoading ? "not-allowed" : "",
        }}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input
        type="submit"
        value="submit"
        disabled={isLoading}
        style={{
          opacity: isLoading ? 0.5 : 1,
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      />
    </form>
  );
};

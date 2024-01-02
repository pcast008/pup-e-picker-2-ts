import { Section } from "./Components/Section";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { useEffect } from "react";
import { Requests } from "./api";
import { useDogs } from "./Providers/DogsProvider";
import { useActivePage } from "./Providers/ActivePageProvider";
import toast from "react-hot-toast";

export function App() {
  const { setDogs, setIsLoading } = useDogs();
  const { activePage } = useActivePage();

  useEffect(() => {
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
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        {activePage === "form" ? <CreateDogForm /> : <Dogs />}
      </Section>
    </div>
  );
}

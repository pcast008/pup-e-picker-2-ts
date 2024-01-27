import { Section } from "./Components/Section";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { useDogs } from "./Providers/DogsProvider";

export function App() {
  const { activePage } = useDogs();

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

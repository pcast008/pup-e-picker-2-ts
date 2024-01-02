import { ReactNode } from "react";
import { useActivePage } from "../Providers/ActivePageProvider";
import { useDogs } from "../Providers/DogsProvider";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { activePage, setActivePage } = useActivePage();
  const { favoritedDogs, unfavoritedDogs } = useDogs();

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${activePage === "favorites" ? "active" : ""}`}
            onClick={() => {
              //   alert("click favorited");
              activePage === "favorites"
                ? setActivePage("all")
                : setActivePage("favorites");
            }}
          >
            favorited ( {favoritedDogs.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              activePage === "unfavorites" ? "active" : ""
            }`}
            onClick={() => {
              //   alert("click favorited");
              activePage === "unfavorites"
                ? setActivePage("all")
                : setActivePage("unfavorites");
            }}
          >
            unfavorited ( {unfavoritedDogs.length} )
          </div>
          <div
            className={`selector ${activePage === "form" ? "active" : ""}`}
            onClick={() => {
              //   alert("click favorited");
              activePage === "form"
                ? setActivePage("all")
                : setActivePage("form");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};

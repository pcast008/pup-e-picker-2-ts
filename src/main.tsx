import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { App } from "./App";
import { DogsProvider } from "./Providers/DogsProvider";
import { ActiveProvider } from "./Providers/ActivePageProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <DogsProvider>
      <ActiveProvider>
        <App />
      </ActiveProvider>
    </DogsProvider>
  </React.StrictMode>
);

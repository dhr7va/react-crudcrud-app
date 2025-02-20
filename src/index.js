import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ItemProvider } from "./Context/ItemContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ItemProvider>
      <App />
    </ItemProvider>
  </React.StrictMode>
);

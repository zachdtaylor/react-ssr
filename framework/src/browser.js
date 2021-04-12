import React from "react";
import ReactDOM from "react-dom";

export const hydrate = (Component) => {
  if (typeof document !== "undefined") {
    const target = document.getElementById("root");

    ReactDOM.hydrate(<Component />, target);
  }
};

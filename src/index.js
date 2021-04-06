import ReactDOM from "react-dom";
import Home from "./pages/index";

if (typeof document !== "undefined") {
  const target = document.getElementById("root");

  ReactDOM.hydrate(<Home />, target);
}

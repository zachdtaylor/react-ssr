import React from "react";
import ReactDOM from "react-dom";
import { Layout } from "../components/lib";

export default function About() {
  return (
    <Layout>
      <h1>About Us</h1>
    </Layout>
  );
}

if (typeof document !== "undefined") {
  const target = document.getElementById("root");

  ReactDOM.hydrate(<About />, target);
}

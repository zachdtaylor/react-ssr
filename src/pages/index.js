import React from "react";
import ReactDOM from "react-dom";
import { Counter, Layout, Message } from "../components/lib";

export default function Index() {
  return (
    <Layout>
      <Message text="Hey this is pretty cool" />
      <Counter />
    </Layout>
  );
}

if (typeof document !== "undefined") {
  const target = document.getElementById("root");

  ReactDOM.hydrate(<Index />, target);
}

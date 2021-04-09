import React from "react";
import ReactDOM from "react-dom";
import { Layout } from "../../components/lib";

export default function Blog() {
  return (
    <Layout>
      <h1>These are my posts!</h1>
      <a href="/blog/first-post">First Post</a>
    </Layout>
  );
}

if (typeof document !== "undefined") {
  const target = document.getElementById("root");

  ReactDOM.hydrate(<Blog />, target);
}

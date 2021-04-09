import React from "react";
import ReactDOM from "react-dom";
import { Layout } from "../../components/lib";

export default function FirstPost() {
  return (
    <Layout>
      <h1>First Post</h1>
      <p>Here's my first post y'all.</p>
    </Layout>
  );
}

if (typeof document !== "undefined") {
  const target = document.getElementById("root");

  ReactDOM.hydrate(<FirstPost />, target);
}

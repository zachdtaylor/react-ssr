import React from "react";
import { Layout } from "../../components/lib";

export default function Blog() {
  return (
    <Layout>
      <h1>These are my posts!</h1>
      <a href="/blog/first-post">First Post</a>
    </Layout>
  );
}

export const meta = {
  title: "Blog",
};

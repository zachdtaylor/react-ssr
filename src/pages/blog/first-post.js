import React from "react";
import { Layout } from "../../components/lib";

export default function FirstPost() {
  return (
    <Layout>
      <h1>First Post</h1>
      <p>Here's my first post y'all.</p>
    </Layout>
  );
}

export const meta = {
  title: "First Post",
  description: "This is my very first post.",
};

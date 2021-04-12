import React from "react";
import { hydrate } from "../../framework/src";
import { Counter, Layout, Message } from "../components/lib";

export default function Index() {
  return (
    <Layout>
      <Message text="Hey this is pretty cool" />
      <Counter />
    </Layout>
  );
}

export const meta = {
  title: "Home",
};

hydrate(Index);

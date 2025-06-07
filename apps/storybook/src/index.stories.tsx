import React from "react";
import { Foo } from "./components/foo";

export default {
  title: "Index",
};

export const Local = () => <Foo />;

export const Monorepo = () => <></>;

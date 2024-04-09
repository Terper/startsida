"use client";

import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {};

const Providers = (props: PropsWithChildren<Props>) => {
  const [client] = useState(new QueryClient());
  return (
    <QueryClientProvider client={client}>{props.children}</QueryClientProvider>
  );
};

export default Providers;

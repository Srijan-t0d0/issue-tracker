"use client";
import {
  QueryClient,
  QueryClientProvider as RQClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();
const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return <RQClientProvider client={queryClient}>{children}</RQClientProvider>;
};

export default QueryClientProvider;

"use client";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import ReactQueryProvider from "./react-query-provider";
import "@mantine/core/styles.css";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider>
      <ModalsProvider>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default Providers;

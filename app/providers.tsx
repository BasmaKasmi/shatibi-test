"use client";

import "dayjs/locale/fr";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import ReactQueryProvider from "./react-query-provider";
import { DatesProvider } from "@mantine/dates";
import "@mantine/core/styles.css";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider>
      <ModalsProvider>
        <DatesProvider
          settings={{
            locale: "fr",
          }}
        >
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </DatesProvider>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default Providers;

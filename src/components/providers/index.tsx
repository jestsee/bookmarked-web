import React from "react";

import { ThemeProvider } from "./theme-provider";
import { TrpcProvider } from "./trpc-provider";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <TrpcProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </TrpcProvider>
  );
};

export default Providers;

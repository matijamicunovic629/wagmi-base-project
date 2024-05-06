import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { chakraCustomTheme } from "./chakra-ui.custom-theme";

export const ChakraUIProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return <ChakraProvider theme={chakraCustomTheme}>{children}</ChakraProvider>;
};

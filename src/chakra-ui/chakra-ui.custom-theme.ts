import { extendTheme, ThemeConfig } from "@chakra-ui/react";

//
//
// NOTE :
// if you don't provide nothing
// this is the default:
//
// const defaultChakraConfig = {
//   initialColorMode: 'light'
//   useSystemColorMode: false,
// }
//
//
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

export const chakraCustomTheme = extendTheme({
  config,
});

//
//
//
export function deleteColorModeInLocalStorage() {
  window.localStorage.removeItem("chakra-ui-color-mode");
  console.log('deleted "chakra-ui-color-mode" from local storage');
  console.log("You can now refresh to see how a first visit looks like.");
}

// After 3s reset the localStorage
setTimeout(deleteColorModeInLocalStorage, 3000);

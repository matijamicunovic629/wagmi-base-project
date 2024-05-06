import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";

// React Hook
const usePrefersColorScheme = () => {
  // 1. define state and ref
  const [preferredColorSchema, setPreferredColorSchema] = useState<
    "dark" | "light" | "no-preference"
  >("no-preference");

  // On first render:
  //   - Ensure window.matchMedia is supported
  //   - Initialize MediaQueryList objects
  //   - Chekc initial state
  //   - Subscribe on changes
  React.useEffect(() => {
    if (typeof window.matchMedia !== "function") return;

    // 1. define MediaQueryList observables
    const isDark = window.matchMedia("(prefers-color-scheme: dark)");
    const isLight = window.matchMedia("(prefers-color-scheme: light)");

    // 2. get initial state
    setPreferredColorSchema(
      isDark.matches ? "dark" : isLight.matches ? "light" : "no-preference"
    );

    // 3. subscribe on changes
    //
    // Is modern "metchMedia" implementation ???
    if (typeof isLight.addEventListener === "function") {
      // In modern browsers MediaQueryList should subclass EventTarget
      // https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList
      const darkListener = ({ matches }: MediaQueryListEvent) => {
        matches && setPreferredColorSchema("dark");
      };
      const lightListener = ({ matches }: MediaQueryListEvent) => {
        matches && setPreferredColorSchema("light");
      };
      isDark.addEventListener("change", darkListener);
      isLight.addEventListener("change", lightListener);
      return () => {
        isDark.removeEventListener("change", darkListener);
        isLight.removeEventListener("change", lightListener);
      };
    }

    // Is the old "metchMedia" implementation ???
    if (typeof isLight.addListener === "function") {
      // In some early implementations MediaQueryList existed, but did not
      // subclass EventTarget
      const listener = () =>
        setPreferredColorSchema(
          isDark.matches ? "dark" : isLight.matches ? "light" : "no-preference"
        );
      // This is two state updates if a user changes from dark to light, but
      // both state updates will be consistent and should be batched by React,
      // resulting in only one re-render
      isDark.addListener(listener);
      isLight.addListener(listener);
      return () => {
        isDark.removeListener(listener);
        isLight.removeListener(listener);
      };
    }
  }, []);

  return preferredColorSchema;
};

// Main Component
export const PrefersColorSchemeBanner = () => {
  const preferredColorScheme = usePrefersColorScheme();
  return (
    <Box w="100%" bg="white" color="black">
      <Text textAlign="center" fontSize="xs" fontWeight="bold">
        Prefers Color Scheme: {preferredColorScheme}
      </Text>
    </Box>
  );
};

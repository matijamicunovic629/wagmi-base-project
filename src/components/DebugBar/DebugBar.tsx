import { PrefersColorSchemeBanner } from "./PrefersColorSchemeBanner";
import { CurrentColorModeBanner } from "./CurrentColorModeBanner";
import { Box } from "@chakra-ui/react";

export const DebugBar = () => (
  <>
    <Box position="fixed" bottom="0" left="0" right="0">
      <PrefersColorSchemeBanner />
      <CurrentColorModeBanner />
    </Box>
  </>
);

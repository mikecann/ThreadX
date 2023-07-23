import { Lists } from "./lists/Lists";
import { Box, Button, HStack, Spinner } from "@chakra-ui/react";
import useStoreUserEffect from "./auth/useStoreUserEffect";
import { AppSidebar } from "./app/AppSidebar";

export default function App() {
  useStoreUserEffect();
  return (
    <Box
      backgroundColor={`#FF3CAC`}
      background={`linear-gradient(225deg, #16494a 0%, #1c0941 50%, #000508 100%)`}
    >
      <AppSidebar />
      <Lists />
    </Box>
  );
}
